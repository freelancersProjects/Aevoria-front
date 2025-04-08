import React from "react";
import "./NoteCard.scss";

const NoteCard = ({ text }) => {
    return (
        <div className="note-card">
            <div className="note-content">{text}</div>
            <div className="note-options">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};


export default NoteCard;
