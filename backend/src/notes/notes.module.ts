import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { Note } from './notes.entity';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Note])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule { }
