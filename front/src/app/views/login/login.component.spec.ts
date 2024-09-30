import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Simula peticiones HTTP
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login.component';
import axios from 'axios';

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
            preventDefault: () => { },
        } as unknown as Event;

        await component.handleSubmit(event);

        expect(toast.error).toHaveBeenCalledWith('Rellena todos los campos');
    });

    it('login with right cretentials', async () => {
        component.loginForm.setValue({
            email: 'juanpablo@yconsultores.com',
            password: '1234567890'
        })

        spyOn(axios, 'post')

        const event = {
            preventDefault: () => { },
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(axios.post).toHaveBeenCalled()

    })

    it('login with wrong cretentials', async () => {
        component.loginForm.setValue({
            email: 'adsfafd@gmail.com',
            password: '123aa8Dfa'
        })

        const event = {
            preventDefault: () => { },
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.error).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
    })

    it('case no sensitive', async () => {

        component.loginForm.setValue({
            email: 'JuaNpablo@yConSultores.com',
            password: '1234567890'
        })

        spyOn(axios, 'post');

        const event = {
            preventDefault: () => { },
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(axios.post).toHaveBeenCalled()
    })

    it('should take out spaces', async () => {
        const input = document.createElement('input');
        input.value = 'test';
        const event = {
            target: input
        } as unknown as Event;

        component.handleSpaces(event);

        expect(input.value).toBe('test');
    })
});
