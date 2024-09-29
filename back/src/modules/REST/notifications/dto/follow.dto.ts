import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FollowDto {

    @ApiProperty({
        type: Number,
        description: 'Id de la solicitud de seguimiento'
    })
    @IsNotEmpty({
        message: 'El id_follow es requerido'
    })
    id_follow: number;

    @ApiProperty({
        type: Number,
        description: 'Id de la notificación'
    })
    @IsNotEmpty({
        message: 'El id_notification es requerido'
    })
    id_notification: number;
}
