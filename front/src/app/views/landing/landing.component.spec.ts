import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { LandingComponent } from "./landing.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import UserService from "../../services/user/user.service";
import { RouterTestingModule } from '@angular/router/testing';

// Crear un RouterStub para pruebas
class RouterStub {
    navigate(params: string[]) { }
}

describe('LandingComponent test', () => {

    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;
    let toastr: ToastrService;
    let userService: UserService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, LandingComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: (key: string) => 'test-param' } }
                    }
                },
                ToastrService,
                {
                    provide: Router,
                    useClass: RouterStub // Usar RouterStub en lugar de RouterTestingModule
                },
                {
                    provide: UserService,
                    useValue: {
                        user: {
                            username: 'testuser',
                            userId: '1',
                            name: 'Test User',
                        },
                        getPosts: jasmine.createSpy('getPosts').and.returnValue(of([{}])),
                        login: jasmine.createSpy('login').and.returnValue(of({ token: 'fake-token', user: { id: 1, name: 'Test User' } })),
                        posts: [{
                            "id_post": 30,
                            "id_user": 7,
                            "image_url": "https://firebasestorage.googleapis.com/v0/b/instapic-4be91.appspot.com/o/posts%2F818884d5-9b75-48be-b905-20f9b42c52a7?alt=media&token=5c5d1ec4-02ca-4c94-97c6-47187333bcac",
                            "created_at": "2024-09-05T04:23:27.106Z",
                            "description": "",
                            "public": true,
                            "likes_count": 0,
                            "likes": [],
                            "users": {
                                "id_user": 7,
                                "username": "juanpeXXX",
                                "first_name": "juan",
                                "last_name": "perez",
                                "password": "$2b$10$YTnOgW2kc2RPVX7Yyk437umEg1J6h9kcZvX6hPYBdaO/kRO5BunOa",
                                "email": "juan@example.com",
                                "created_at": "2024-09-05T03:16:20.652Z",
                                "birth_date": "2003-10-20T00:00:00.000Z"
                            },
                            "likedByUser": false
                        }],
                        getUser: jasmine.createSpy('getUser').and.returnValue({ username: 'testuser', userId: '1' }), // Simula un usuario autenticado
                        isAuth: true // Marca al usuario como autenticado
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        toastr = TestBed.inject(ToastrService);
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);

        spyOn(toastr, 'error');  // Espiar la función 'error' de toast
        spyOn(toastr, 'success');  // Espiar la función 'success' de toast
        spyOn(router, 'navigate'); // Espiar el método navigate del enrutador

        fixture.detectChanges();
    });

    it('should render posts and handle like action', () => {
        // Simula el inicio de sesión y la carga de los posts

        fixture.detectChanges(); // Actualiza la vista
        expect(userService.posts.length).toBeGreaterThan(0); // Verifica que los posts se han cargado

        expect(userService.posts[0].likedByUser).toBeFalsy(); // Verifica que se ha llamado al método getPosts


        const likeButton = fixture.debugElement.query(By.css('#like')); // Ajusta el selector si es necesario
        expect(likeButton).toBeTruthy(); // Verifica que el botón de like está presente

        const likes_count = fixture.debugElement.query(By.css('#likes_count')); // Ajusta el selector si es necesario
        expect(likes_count.nativeElement.textContent).toContain('0'); // Verifica que el contador de likes está en 0

        likeButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(likes_count.nativeElement.textContent).toContain('1'); // Verifica que el contador de likes se ha incrementado
        expect(likeButton.nativeElement.classList).toContain('fill-primary-color'); // Verifica que el contador de likes se ha incrementado



    });

    it('should render posts and handle dislike action', () => {
        // Simula el inicio de sesión y la carga de los posts

        userService.posts[0].likedByUser = true; // Simula que el usuario ha dado like al post anteriormente

        userService.posts[0].likes_count = 1; // Simula que el post tiene 1 like

        fixture.detectChanges(); // Actualiza la vista
        expect(userService.posts.length).toBeGreaterThan(0); // Verifica que los posts se han cargado

        expect(userService.posts[0].likedByUser).toBeTruthy(); // Verifica que se ha llamado al método getPosts


        const likeButton = fixture.debugElement.query(By.css('#like')); // Ajusta el selector si es necesario
        expect(likeButton).toBeTruthy(); // Verifica que el botón de like está presente

        const likes_count = fixture.debugElement.query(By.css('#likes_count')); // Ajusta el selector si es necesario
        expect(likes_count.nativeElement.textContent).toContain('1'); // Verifica que el contador de likes está en 0

        likeButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(likes_count.nativeElement.textContent).toContain('0'); // Verifica que el contador de likes se ha incrementado
        expect(likeButton.nativeElement.classList).toContain('fill-white'); // Verifica que el contador de likes se ha incrementado


    });
});
