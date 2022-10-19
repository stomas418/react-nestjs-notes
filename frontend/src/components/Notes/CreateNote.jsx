import { useRef } from "react"
import { useNotes, useUser } from "../../context/Context"

const CreateNote = ({ show, setShow }) => {
    const title = useRef()
    const content = useRef()
    const [user,] = useUser()
    const [notes, setNotes] = useNotes()
    const onSubmit = async (e) => {
        e.preventDefault()
        const note = {
            title: title.current.value,
            content: content.current.value,
            author: user,
            active: true,
            tag: "",
        }
        const response = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const newNote = await response.json()
        setNotes([...notes, newNote])
        setShow(false)
    }
    return (
        show ?
            <div className="modal">
                <div className="modal-content">

                    <form onSubmit={onSubmit}>
                        <div className="form-field">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" ref={title} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="content">Content</label>
                            <textarea name="content" ref={content} />
                        </div>
                        <div className="close-submit">
                            <button onClick={() => setShow(false)}>Close</button>
                            <button type="submit">Create note!</button>
                        </div>
                    </form>
                </div>
            </div>
            : ""
    )
}

export default CreateNote