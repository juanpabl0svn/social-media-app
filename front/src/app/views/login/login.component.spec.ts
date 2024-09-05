import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Simula peticiones HTTP
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent test', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let toast: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, HttpClientTestingModule, ToastrModule.forRoot()],
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

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        toast = TestBed.inject(ToastrService); // Inyectamos el servicio de toast

        spyOn(toast, 'error');  
        spyOn(toast, 'success');  

        fixture.detectChanges();
    });

    it('should show an error toast if fields are empty', async () => {

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
        } as unknown as Event;

        await component.handleSubmit(event);

        expect(toast.error).toHaveBeenCalledWith('Rellena todos los campos');
    });

    it('login with right cretentials', async () => {
        component.loginForm.setValue({
            email: 'juanpablo@yconsultores.com',
            password: '1234567890'
        })

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.success).toHaveBeenCalledWith('Bienvenido Juan Pablo Sanchez');

    })

    it('login with wrong cretentials', async () => {
        component.loginForm.setValue({
            email: 'adsfafd@gmail.com',
            password: '123aa8Dfa'
        })

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.error).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
    })

    it('case no sensitive', async () => {

        component.loginForm.setValue({
            email: 'JuaNpablo@yConSultores.com',
            password: '1234567890'
        })

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.success).toHaveBeenCalledWith('Bienvenido Juan Pablo Sanchez');
    })




});
