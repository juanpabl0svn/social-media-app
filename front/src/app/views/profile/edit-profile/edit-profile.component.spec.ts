import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import UserService from '../../../services/user/user.service';
import { EditProfileComponent } from './edit-profile.component';


describe('EditProfileComponent test', () => {
    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;
    let toast: ToastrService;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(async () => {
        userService = jasmine.createSpyObj('UserService', ['user']);

        await TestBed.configureTestingModule({
            imports: [EditProfileComponent, HttpClientTestingModule, ToastrModule.forRoot()],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: (key: string) => key } }
                    }
                },
                { provide: UserService, useValue: userService },
                ToastrService
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        toast = TestBed.inject(ToastrService);

        spyOn(toast, 'error');
        spyOn(toast, 'success');

        userService.user = {
            id_user: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            first_name: 'Test',
            last_name: 'User',
            birth_date: '2000-01-01',
        };

        component.profileToEdit = { ...userService.user };
        fixture.detectChanges();
    });

    it('should show an error toast if fields are empty', async () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <input name="first_name" value="">
            <input name="last_name" value="">
            <input name="email" value="">
            <input name="password" value="">
            <input name="username" value="">
            <input name="birth_date" value="">
        `;

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;

        await component.handleSubmitEdit(event);
        expect(toast.error).toHaveBeenCalledWith('No deje campos vacíos a proposito (excepto la contraseña si no desea cambiarla)');
    });

    it('should show an error toast if first_name or last_name have special characters', async () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <input name="first_name" value="John$">
            <input name="last_name" value="Doe">
            <input name="email" value="valid@example.com">
            <input name="password" value="password123">
            <input name="username" value="johndoe">
            <input name="birth_date" value="2000-01-01">
        `;

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;

        await component.handleSubmitEdit(event);
        expect(toast.error).toHaveBeenCalledWith('Nombre y apellido no pueden tener caracteres especiales');
    });

    it('should show an error toast if password is less than 8 characters', async () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <input name="first_name" value="John">
            <input name="last_name" value="Doe">
            <input name="email" value="valid@example.com">
            <input name="password" value="short">
            <input name="username" value="johndoe">
            <input name="birth_date" value="2000-01-01">
        `;

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;

        await component.handleSubmitEdit(event);
        expect(toast.error).toHaveBeenCalledWith('Password must be at least 8 characters');
    });

    it("should show an error toast if email is invalid", async () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <input name="first_name" value="Juan">
            <input name="last_name" value="Sanchez">
            <input name="email" value="invalidEmail">
            <input name="password" value="password123">
            <input name="username" value="juansanchez">
            <input name="birth_date" value="2000-01-01">
        `;

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;

        await component.handleSubmitEdit(event);
        expect(toast.error).toHaveBeenCalledWith('Email no es válido');
    });

    it('should show an error toast if birth_date is invalid', async () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <input name="first_name" value="Juan">
            <input name="last_name" value="Sanchez">
            <input name="email" value="jan@gmail.com">
            <input name="password" value="password123">
            <input name="username" value="juansanchez">
            <input name="birth_date" value="2022-01-01">
        `;  

        const event = {
            preventDefault: jasmine.createSpy('preventDefault'),
            target: form
        } as unknown as Event;

        await component.handleSubmitEdit(event);

        expect(toast.error).toHaveBeenCalledWith('Debes ser mayor de edad');
    })


});
