import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Simula peticiones HTTP
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('RegisterComponent test', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let toast: ToastrService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegisterComponent, HttpClientTestingModule, ToastrModule.forRoot()],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: (key: string) => key } }
                    }
                },
                ToastrService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        toast = TestBed.inject(ToastrService); // Inyectamos el servicio de toast

        spyOn(toast, 'error');  // Espiamos la función 'error' de toast
        spyOn(toast, 'success');  // Espiamos la función 'success' de toast

        fixture.detectChanges();
    });

    it('should show an error toast if fields are empty', async () => {
        // Simulamos un formulario vacío
        const form = document.createElement('form');
        form.innerHTML = `
                <input name="first_name" value="">
                <input name="last_name" value="">
                <input name="email" value="">
                <input name="password" value="">
                <input name="password2" value="">
                <input name="birth_date" value="">
                <input name="username" value="">
                `;

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;



        await component.handleSubmit(event);

        expect(toast.error).toHaveBeenCalledWith('Por favor llene todos los campos');
    });

    it('should show an error toast if first_name or last_name have special characters', async () => {

        const form = document.createElement('form');
        form.innerHTML = `
                <input name="first_name" value="John$">
                <input name="last_name" value="Doe">
                <input name="email" value="1@gmail.com">
                <input name="password" value="1">
                <input name="password2" value="1">
                <input name="birth_date" value="1">
                <input name="username" value="1">
        `;
        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.error).toHaveBeenCalledWith('Nombre y apellido no pueden tener caracteres especiales');
    })


    it('should show an error toast if password is less than 8 characters', async () => {

        const form = document.createElement('form');
        form.innerHTML = `
        <input name="first_name" value="John">
        <input name="last_name" value="Doe">
        <input name="email" value="1@gmail.com">
        <input name="password" value="1234567">
        <input name="password2" value="1234567">
        <input name="birth_date" value="1">
        <input name="username" value="1">
        `;
        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.error).toHaveBeenCalledWith('Contraseña debe tener al menos 8 caracteres');
    })

    it("shouldn't register with wrong email", async () => {

        const form = document.createElement('form');
        form.innerHTML = `
        <input name="first_name" value="juan pablo">
        <input name="last_name" value="sanchez villegas">
        <input name="email" value="1">
        <input name="password" value="12345678">
        <input name="password2" value="12345678">
        <input name="birth_date" value="1">
        <input name="username" value="1">
        `;
        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;
        await component.handleSubmit(event);
        expect(toast.error).toHaveBeenCalledWith('Email no es válido');

    })
});
