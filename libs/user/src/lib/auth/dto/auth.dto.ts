import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '0xAF5Fc4D7D6DBF1221C1330D88553E95959027391',
    description: 'authAddress',
  })
  authAddress: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Wallet',
    description: 'authType',
  })
  authType: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'roleId',
  })
  roleId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Travia',
    description: 'firstName',
  })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Jeff',
    description: 'lastName',
  })
  lastName: string;
}

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '98570238574',
    description: 'authAddress',
  })
  authAddress: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'admin@mailinator.com',
    description: 'authAddress',
  })
  authAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '07845',
    description: 'otp',
  })
  otp: string;
}

export class WalletLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example:
      '0xaa38ee9f193186448c50734de746babd7b6cb272f10749c9130cc7316235dcc4366c4892733e3f162acfce829c14d4cbbe49a7b2e72022908af3f1bdef8a4eb31c',
    description: 'signature',
    required: true,
  })
  signature: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'hello world!',
    description: 'message',
  })
  message: string;
}
