import { useRef } from "react"
import { useNotes } from "../../context/Context"

const EditNote = ({ note, show, setShow }) => {
    const title = useRef()
    const content = useRef()
    const [notes, setNotes] = useNotes()
    const onSubmit = async (e) => {
        e.preventDefault()
        note.title = title.current.value
        note.content = content.current.value
        const editNote = {
            title: note.title,
            content: note.content,
            author: note.author,
            active: note.active,
            tag: note.tag
        }
        await fetch(`http://localhost:3000/notes/${note.id}`, {
            method: "PUT",
            body: JSON.stringify(editNote),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newNotes = notes.filter(noteInArr => noteInArr.id != note.id)
        newNotes.push(note)
        setNotes(newNotes)

    }
    return (
        show ?
            <div id="editNoteModal" className="modal">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="form-field">
                            <label htmlFor="title">title</label>
                            <input type="text" name="title" ref={title} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" ref={content} />
                        </div>
                        <div className="close-submit">
                            <button onClick={() => setShow(false)}>Close</button>
                            <button type="submit">Edit note!</button>
                        </div>
                    </form>
                    <button onClick={() => setShow(false)}>Close</button>
                </div>
            </div>
            : ""
    )
}

export default EditNote