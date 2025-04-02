import React, { useState, useRef } from 'react';
import Button from '../AEV.Button/Button';
import './Canvas.scss';

const Canvas = () => {
    const [elements, setElements] = useState([]);
    const [zoom, setZoom] = useState(1);
    const canvasRef = useRef(null);

    const addText = () => {
        setElements(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'text',
                content: 'New Text',
                x: 100,
                y: 100,
            }
        ]);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setElements(prev => [
                ...prev,
                {
                    id: Date.now(),
                    type: 'image',
                    content: url,
                    x: 150,
                    y: 150
                }
            ]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setElements(prev => [
                ...prev,
                {
                    id: Date.now(),
                    type: 'image',
                    content: url,
                    x: e.clientX - 200,
                    y: e.clientY - 200
                }
            ]);
        }
    };

    const handleMouseDown = (e, id) => {
        e.stopPropagation();
        const index = elements.findIndex(el => el.id === id);
        const selected = elements[index];
        const startX = e.clientX;
        const startY = e.clientY;

        const onMouseMove = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const updated = { ...selected, x: selected.x + dx / zoom, y: selected.y + dy / zoom };
            const updatedElements = [...elements];
            updatedElements[index] = updated;
            setElements(updatedElements);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="canvas-wrapper">
            <div className="canvas-toolbar">
                <Button text="+ Text" size="medium" onClick={addText} />
                <label className="upload-btn">
                    <Button text="Upload Image" size="medium" variant="transparent" />
                    <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
                </label>
            </div>

            <div
                className="canvas"
                ref={canvasRef}
                style={{ transform: `scale(${zoom})` }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {elements.map(el => (
                    <div
                        key={el.id}
                        className="canvas-element"
                        style={{ top: el.y, left: el.x }}
                        onMouseDown={(e) => handleMouseDown(e, el.id)}
                    >
                        {el.type === 'text' && (
                            <div contentEditable suppressContentEditableWarning>{el.content}</div>
                        )}
                        {el.type === 'image' && (
                            <img src={el.content} alt="Canvas" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Canvas;
