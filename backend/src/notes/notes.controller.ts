import { Controller, Get, Post, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { CreateNoteDTO } from './dto/create-note-dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }
    @Get()
    getNotes(@Query('username') username: string) {
        return this.notesService.findAll(username)
    }
    @Get(':id')
    getNote(@Param('id') id: string) {
        return this.notesService.find(id)
    }
    @Post()
    createNote(@Body() noteDTO: CreateNoteDTO) {
        return this.notesService.create(noteDTO)
    }
    @Put(':id')
    editNote(@Body() noteDTO: CreateNoteDTO, @Param('id') id: string) {
        return this.notesService.edit(noteDTO, id)
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        return this.notesService.remove(id)
    }
}
