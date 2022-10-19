import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Note } from './notes/notes.entity';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [NotesModule, ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.host,
    port: parseInt(process.env.port, 10),
    username: process.env.db_username,
    password: process.env.password,
    database: process.env.database,
    entities: [Note],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
