import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { CreateTagsDto } from './dto/create-tags.dto';
import { CreateManager } from './dto/manager.dto';
import {
  UpdateCommunityAssetDto,
  UpdateCommunityDto,
} from './dto/update-community.dto';

@Controller('communities')
@ApiTags('communities')
export class CommunityController {
  constructor(private readonly communitiesService: CommunityService) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll(@Query() query?: any) {
    return this.communitiesService.findAll(query);
  }

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.communitiesService.findOne(address);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(+id);
  }

  @Patch(':id/asset')
  updateAsset(
    @Param('id') id: string,
    @Body() assetData: UpdateCommunityAssetDto,
  ) {
    return this.communitiesService.updateAsset(+id, assetData);
  }

  @Post('tags/bulk')
  createTagsBulk(@Body() tags: CreateTagsDto) {
    return this.communitiesService.createBulkTags(tags.tags);
  }

  @Get('tags')
  getAllTags() {
    return this.communitiesService.getAllTags();
  }

  @Post('/manager')
  createCommunityManager(@Body() manager: CreateManager) {
    return this.communitiesService.createCommunityManager(manager);
  }

  @Get('/search/:searchKey')
  searchCommunity(@Param('searchKey') searchKey: string) {
    return this.communitiesService.search(searchKey);
  }

  @Post(':walletAddress/upload-asset/:key')
  @UseInterceptors(FileInterceptor('file'))
  uploadAsset(
    @Param('walletAddress') walletAddress: string,
    @Param('key') key:string,
    @UploadedFile() file,
  ) {
    return this.communitiesService.uploadCoverAsset(walletAddress,key, file);
  }


  @Post(':walletAddress/upload-asset/:key/multiple')
  @UseInterceptors(AnyFilesInterceptor())
  uploadMultipleAsset(
    @Param('walletAddress') walletAddress:string,
    @Param('key') key:string,
    @UploadedFiles() files,
  ){
    console.log(files)
   return this.communitiesService.uploadMultipleAsset(walletAddress,key,files)
  }
}
