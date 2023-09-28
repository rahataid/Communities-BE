import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UploadAssetParams } from 'rs-asset-uploader/dist/types';
import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}

export class UpdateCommunityAssetDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  logo?: string;

  @ApiProperty({
    type: 'string',
    example: '',
  })
  cover?: string;

  @ApiProperty({
    type: 'array',
    example: [],
  })
  gallery?: string[];
}

export class UploadAssetDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  file: UploadAssetParams['file'];

  @ApiProperty({
    type: 'string',
    example: '',
  })
  fileName: UploadAssetParams['fileName'];

  @ApiProperty({
    type: 'array',
    example: [],
  })
  folderName: UploadAssetParams['folderName'];

  @ApiProperty({
    type: 'array',
    example: [],
  })
  mimeType: UploadAssetParams['mimeType'];
}
