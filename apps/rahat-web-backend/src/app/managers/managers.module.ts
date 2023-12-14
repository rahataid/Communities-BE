import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { PrismaModule, PrismaService } from '@rahat/prisma';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService, PrismaService],
  imports: [PrismaModule],
})
export class ManagersModule {}
