import { IsBoolean, IsNotEmpty } from "class-validator";


export class CreateLikeDto {

    @IsNotEmpty({message: 'id_post is required'})
    id_post: number;

    @IsNotEmpty({message: 'id_user is required'})
    id_user: number;

    @IsNotEmpty({message: 'like is required'})
    @IsBoolean({message: 'like must be a boolean'})
    like: boolean;
}
