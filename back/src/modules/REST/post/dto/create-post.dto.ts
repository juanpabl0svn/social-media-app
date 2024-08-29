import { IsNotEmpty } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({message: 'id_user is required'}) 
    id_user: number;

    @IsNotEmpty({message: 'image is required'})
    image: File;

    description: string
}
