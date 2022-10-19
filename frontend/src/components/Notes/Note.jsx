const Note = ({ note, setShow }) => {
    return (

        <div className="modal">
            <div className='modal-content'>
                <h1>{note.title}</h1>
                <p>{note.content}</p>
                <button onClick={() => setShow(false)}>close</button>
            </div>
        </div>

    )
}

export default Note