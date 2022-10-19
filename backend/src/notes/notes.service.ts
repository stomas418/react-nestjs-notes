import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateNoteDTO } from './dto/create-note-dto';
import { Note } from './notes.entity'

@Injectable()
export class NotesService {
    constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) { }

    findAll(author: string): Promise<Note[]> {
        return this.noteRepository.findBy({ author })
    }

    find(id: string): Promise<Note> {
        return this.noteRepository.findOneBy({ id: parseInt(id) })
    }

    async remove(id: string) {
        const deleteNote = await this.find(id)
        await this.noteRepository.delete(parseInt(id))
        return deleteNote
    }

    create(note: CreateNoteDTO) {
        return this.noteRepository.save(note)
    }

    async edit(editNote: CreateNoteDTO, id: string) {
        await this.noteRepository.update({ id: parseInt(id) }, editNote)
        return editNote
    }
}
