import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService],
  imports: [PrismaModule],
})
export class ManagersModule {}
