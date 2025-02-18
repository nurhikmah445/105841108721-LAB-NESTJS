import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PrismaService from './prisma';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';
import { MahasiswaProfileModule } from './mahasiswa-profile/mahasiswa-profile.module';


@Module({
  imports: [
    JwtModule.register({
      secret : "a123b123c123d123"}),
    ProfileModule,
    ChatModule,
    MahasiswaProfileModule,
],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
