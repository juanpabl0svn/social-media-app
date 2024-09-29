import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({
        description: 'Id del post',
        type: Number,
        example: 1
    })
    @IsNotEmpty({ message: 'El id_post no puede estar vacío' })
    id_post: number;

    @ApiProperty({
        description: 'Id del usuario',
        type: Number,
        example: 1
    })
    @IsNotEmpty({ message: 'El id_user no puede estar vacío' })
    id_user: number;

    @ApiProperty({
        description: 'Texto del comentario',
        type: String,
        example: 'Bonito post!'
    })
    @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
    comment: string;
}
