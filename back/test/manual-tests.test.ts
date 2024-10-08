import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { CommentsService } from '@src/modules/rest/comments/comments.service';
import { NotificationsService } from '@src/modules/rest/notifications/notifications.service';
import { UserService } from '@src/modules/rest/user/user.service';
import * as dotenv from 'dotenv';

// Cargar variables de entorno para JWT_SECRET y otras configuraciones
dotenv.config();

async function userTests(app) {
  // Obtener la instancia de UserService del contexto de la aplicación
  const userService = app.get(UserService);

  try {
    console.log('=== Ejecutando pruebas de UserService ===');
    const users = await userService.findByUsername('ju');
    console.log('Usuarios encontrados ✅:', users.length);

    const loggedInUser = await userService.login('juan@gmail.com', '1234567890');
    console.log('Usuario autenticado ✅ :', loggedInUser.username);

    const me = await userService.me(loggedInUser.id_user);
    console.log('Información del usuario logueado ✅ :', me.username);

  } catch (error) {
    console.error('Error en pruebas manuales de UserService ❌ :', error);
  }
}

async function notificationsTests(app) {
  // Obtener la instancia de NotificationsService del contexto de la aplicación
  const notificationsService = app.get(NotificationsService);

  try {
    console.log('=== Ejecutando pruebas de NotificationsService ===');
    const notifications = await notificationsService.getNotifications(1);
    console.log('Notificaciones encontradas ✅:', notifications.length);
    
  } catch (error) {
    console.error('Error en pruebas manuales de NotificationsService ❌ :', error);
  }
}

async function commentsTests(app) {
  // Obtener la instancia de CommentsService del contexto de la aplicación
  const commentsService = app.get(CommentsService);

  try {
    console.log('=== Ejecutando pruebas de CommentsService ===');
    const comments = await commentsService.getComments(1);
    console.log('Comentarios encontrados ✅:', comments.length);

  } catch (error) {
    console.error('Error en pruebas manuales de CommentsService ❌ :', error);
  }
}

async function bootstrap() {
  // Crear el contexto de la aplicación para AppModule
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Ejecutar las pruebas de cada servicio
    await userTests(app);
    await notificationsTests(app);
    await commentsTests(app);
  } catch (error) {
    console.error('Error en la ejecución de las pruebas manuales ❌:', error);
  } finally {
    // Cerrar la aplicación para liberar los recursos
    await app.close();
  }
}

bootstrap();
