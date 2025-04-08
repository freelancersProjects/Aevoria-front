import React, { useState, useEffect } from "react";
import "./Notes.scss";
import Modal from "../../../components/AEV/AEV.Modal/Modal";
import Button from "../../../components/AEV/AEV.Button/Button";
import NoteCard from "../../../components/NoteCard/NoteCard";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("aev-notes")) || [];
        setNotes(saved);
    }, []);

    const saveNote = () => {
        if (!currentNote.trim()) return;
        const updated = [...notes, { id: Date.now(), content: currentNote }];
        setNotes(updated);
        localStorage.setItem("aev-notes", JSON.stringify(updated));
        setCurrentNote("");
        setModalOpen(false);
    };

    return (
        <div className="notes-page">
            <div className="notes-header">
                <h2>Notes Rapides</h2>
                <Button text="Nouvelle note" onClick={() => setModalOpen(true)} />
            </div>

            <div className="note-grid">
                {notes.map((note) => (
                    <NoteCard key={note.id} text={note.content} />
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div
                    className="note-editor"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setCurrentNote(e.currentTarget.textContent)}
                    placeholder="Commence à écrire ici..."
                ></div>
                <div className="note-actions">
                    <Button text="Enregistrer" onClick={saveNote} />
                </div>
            </Modal>
        </div>
    );
};

export default Notes;
