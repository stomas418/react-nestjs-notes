import { useNotes } from '../../context/Context'
import { useEffect } from 'react'
import MiniatureNote from '../Notes/MiniatureNote'
import { useState } from 'react'
import { useUser } from '../../context/Context'
import CreateNote from '../Notes/CreateNote'

const Home = () => {
    const [user,] = useUser()
    const [notes, setNotes] = useNotes()
    const [showActive, setShowActive] = useState(true)
    const [create, setCreate] = useState(false)

    useEffect(() => {
        const getNotes = async () => {
            const response = await fetch(`http://localhost:3000/notes?username=${user}`)
            const notesFromServer = await response.json()
            setNotes(notesFromServer)
            console.log(notesFromServer)
        }
        getNotes()
    }, [user])



    return (
        user && notes ?
            <div id="home">
                <h1>My notes</h1>
                <div id="options">
                    <h3 onClick={() => setShowActive(true)} className={showActive ? "focused" : ""}>See active notes</h3>
                    <h3 onClick={() => setShowActive(false)} className={showActive ? "" : "focused"}>See archived notes</h3>
                </div>
                <br />
                <div id="notes-container">
                    <div id="createNote" className="miniature">

                        <button onClick={() => setCreate(!create)}>{create ? "cancel" : "create a note"}</button>
                    </div>
                    {
                        notes.map(note => (
                            <MiniatureNote note={note} key={note.id} show={showActive} />
                        ))
                    }

                </div>

                <CreateNote show={create} setShow={setCreate} />
            </div >
            : ""
    )
}

export default Home