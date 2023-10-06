import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        type: 'string',
        example:'rahat',
        description:'Community Category'
    })
  @IsString()
  name: string;
}
