import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from "./NoteItem"
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate=useNavigate();
    const { notes, getNotes ,editNote} = context;
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            getNotes();
        }else{
            navigate('/login')
        }
    }, [])
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
        //props.showAlert("Updated Successfully","success");
    }
    const ref = useRef(null);
    const refClose=useRef(null);
    
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag); // Update the note
        refClose.current.click(); // Close the modal
        props.showAlert("Updated Successfully", "success"); // Show the alert
    };
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}
                                    onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription"
                                    value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}
                                     onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'No Notes to Display'}
                </div>
                {notes.length>0 && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes
