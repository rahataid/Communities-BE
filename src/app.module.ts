import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@pipes/validation.pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CommunityModule } from './community/community.module';
import { PrismaModule } from './prisma/prisma.module';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CommunityModule,
    CategoriesModule,
    ManagersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
