import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ProfileSearchComponent } from "./profile-search.component";
import UserService from "../../services/user/user.service";



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
                        snapshot: { paramMap: { get: (key: string) => 'test-param' } }
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


    })


})