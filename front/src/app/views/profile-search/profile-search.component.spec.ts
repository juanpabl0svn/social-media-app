import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ProfileSearchComponent } from "./profile-search.component";
import UserService from "../../services/user/user.service";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";



describe('ProfileSearchComponent test', () => {

    let component: ProfileSearchComponent;
    let fixture: ComponentFixture<ProfileSearchComponent>;
    let toast: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSearchComponent, HttpClientTestingModule, ToastrModule.forRoot()],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id_user: 1 })
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
        toast = TestBed.inject(ToastrService); // Inyectamos el servicio de toast

        spyOn(toast, 'error');
        spyOn(toast, 'success');

        fixture.detectChanges();
    })

    it('should follow new person', async () => {

        component.followers = 0;
        component.following = 0;
        component.state = '';

        component.followTest();

        fixture.detectChanges()

        const follow_state = fixture.debugElement.query(By.css('button#follow_state'));

        expect(follow_state.nativeElement.textContent.trim()).toBe('Pendiente');

        expect(component.followers).toBe(1);

    })


    it('should unfollow a person', async () => {
            
            component.followers = 1;
            component.following = 0;
            component.state = 'FOLLOWING';
            
            component.unfollowTest();

            fixture.detectChanges()

    
            const follow_state = fixture.debugElement.query(By.css('button#follow_state'));

            expect(follow_state.nativeElement.textContent.trim()).toBe('Seguir');

            expect(component.followers).toBe(0);
    })


})