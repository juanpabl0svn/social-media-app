import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ProfileSearchComponent } from "./profile-search.component";
import UserService from "../../services/user/user.service";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import axios from "axios";

describe('ProfileSearchComponent test', () => {

    let component: ProfileSearchComponent;
    let fixture: ComponentFixture<ProfileSearchComponent>;
    let toast: ToastrService;
    let userService: UserService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterLink],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id_user: 1 }) // Simulación de los parámetros de la ruta
                    }
                },
                {
                    provide: UserService,
                    useValue: {
                        user: {
                            id_user: 1,
                            username: 'testuser',
                            name: 'Test User',
                        },
                        follow: jasmine.createSpy('follow').and.returnValue(true),
                        searchUser: jasmine.createSpy('searchUser').and.returnValue({
                            id_user: 2,
                            username: 'testuser2',
                            name: 'Test User 2',
                            followers: []
                        })
                    }
                },
                ToastrService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSearchComponent);
        component = fixture.componentInstance;
        toast = TestBed.inject(ToastrService);
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);

        spyOn(toast, 'error');
        spyOn(toast, 'success');

        fixture.detectChanges();
    });

    it('should follow new person', fakeAsync(async () => {
        component.followers = 0;
        component.following = 0;
        component.state = '';

        spyOn(axios, 'post').and.resolveTo({ data: true });

        await component.follow();
        tick()

        fixture.detectChanges();

        const follow_state = fixture.debugElement.query(By.css('button#follow_state'));

        expect(follow_state.nativeElement.textContent.trim()).toBe('Pendiente');
        expect(component.followers).toBe(1);
    }));

    it('should unfollow a person', fakeAsync(async () => {
        component.followers = 1;
        component.following = 0;
        component.state = 'FOLLOWING';

        spyOn(axios, 'post').and.resolveTo({ data: true });

        await component.unfollow();
        tick()
        fixture.detectChanges();

        const follow_state = fixture.debugElement.query(By.css('button#follow_state'));

        expect(follow_state.nativeElement.textContent.trim()).toBe('Seguir');
        expect(component.followers).toBe(0);
    }));

    it('should redirect', () => {
        spyOn(router, 'navigate');

        component.ngOnInit();

        expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    });

    it('should bring user data', fakeAsync(async () => {
        userService.user = {
            id_user: 5,
            username: 'testuser',
            name: 'Test User',
        };

        const response = {
            data: {
                posts: [1, 2, 3, 4],
                followers: 12,
                following: 90,
                isFollowing: {
                    state: true
                },
                username: 'mario'
            }
        };

        spyOn(axios, 'post').and.resolveTo(response);

        await component.ngOnInit();
        tick(); // Asegúrate de esperar las operaciones asincrónicas
        fixture.detectChanges();

        const followers = fixture.debugElement.query(By.css('#followers'));
        const following = fixture.debugElement.query(By.css('#following'));
        const posts_count = fixture.debugElement.query(By.css('#posts-count'));

        expect(followers.nativeElement.textContent).toBe(response.data.followers.toString());
        expect(following.nativeElement.textContent).toBe(response.data.following.toString());
        expect(posts_count.nativeElement.textContent).toBe(response.data.posts.length.toString());
    }));
});
