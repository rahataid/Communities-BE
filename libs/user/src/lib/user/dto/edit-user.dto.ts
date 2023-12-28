import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Ram',
    required: true,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Yadav',
    required: true,
  })
  lastName?: string;
}
