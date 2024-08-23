import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {

    @IsNotEmpty({ message: 'El id_post no puede estar vacío' })
    id_post: number;

    @IsNotEmpty({ message: 'El id_user no puede estar vacío' })
    id_user: number;

    @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
    comment: string;
}
