import { useState } from 'react'
import Note from './Note'
import EditNote from './EditNote'
import { useNotes } from '../../context/Context'


const MiniatureNote = ({ note, show }) => {

    const [showComplete, setShowComplete] = useState(false)
    const [edit, setEdit] = useState(false)
    const [notes, setNotes] = useNotes()
    const onDelete = async () => {
        await fetch(`http://localhost:3000/notes/${note.id}`, {
            method: "DELETE"
        })
        setNotes(notes.filter(noteInArr => noteInArr.id != note.id))
    }
    const changeActiveStatus = async () => {
        note.active = !note.active
        await fetch(`http://localhost:3000/notes/${note.id}`, {
            method: "PUT",
            body: JSON.stringify(note),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const newNotes = notes.filter(noteInArr => noteInArr.id != note.id)
        newNotes.push(note)
        setNotes(newNotes)
    }
    return (
        note.active == show &&
        <>
            {showComplete
                ?
                <Note note={note} setShow={setShowComplete} />
                :
                <div className="miniature">
                    <h1>{note.title}</h1>
                    <div className="buttons">
                        <button onClick={() => setEdit(!edit)}>{edit ? "cancel" : "edit"}</button>
                        <button onClick={onDelete}>delete</button>
                        <button onClick={changeActiveStatus}>{show ? "archive" : "unarchive"}</button>
                        <button onClick={() => setShowComplete(!showComplete)}>{showComplete ? "close" : "open"}</button>
                    </div>
                </div>
            }

            <EditNote note={note} show={edit} setShow={setEdit} />
        </>
    )
}

export default MiniatureNote