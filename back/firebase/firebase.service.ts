// config/firebase.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable()
export class FirebaseService {

  private readonly firebaseApp: FirebaseApp;
  public storage: FirebaseStorage;


  constructor(private readonly configService: ConfigService) {
    this.firebaseApp = initializeApp({
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID'),
    });
    this.storage = getStorage(this.firebaseApp);
  }

  async uploadFile(file: Express.Multer.File, path: string, name: string): Promise<string> {
    const storageRef = ref(this.storage, `${path}/${name}`);
    await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}
