import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditProfileComponent } from "./edit-profile.component";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";



describe('Edit profile TEST', () => {

    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;
    let toast: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditProfileComponent, HttpClientTestingModule, ToastrModule.forRoot()],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: (key: string) => 'test-param' } }
                    }
                },
                ToastrService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        toast = TestBed.inject(ToastrService);

        spyOn(toast, 'error');
        spyOn(toast, 'success');

        fixture.detectChanges();
    })


    it('should be defined', () => {
        expect(component).toBeDefined();
    })
})