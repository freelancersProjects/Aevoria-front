import React, { useRef, useState, useEffect } from 'react';
import './Canvas.scss';
import {
  FaHandPaper, FaFont, FaImage, FaTrash, FaPencilAlt, FaEraser
} from 'react-icons/fa';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [tool, setTool] = useState('move');
  const [selectedId, setSelectedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [contextMenu, setContextMenu] = useState(null);

  const addText = (x = 300, y = 200) => {
    const id = Date.now();
    setElements(prev => [...prev, {
      id,
      type: 'text',
      content: 'New Text',
      x,
      y,
      fontSize: 18,
      fontFamily: 'Montserrat',
      color: '#ffffff',
      background: 'transparent'
    }]);
    setSelectedId(id);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom(prev => Math.min(3, Math.max(0.4, prev - e.deltaY * 0.001)));
  };

  const startPan = (e) => {
    if (tool !== 'move') return;
    setIsPanning(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onPan = (e) => {
    if (!isPanning || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const stopPan = () => setIsPanning(false);

  const updateElement = (id, key, value) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, [key]: value } : el))
    );
  };

  const handleDragElement = (e, el) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (event) => {
      const dx = (event.clientX - startX) / zoom;
      const dy = (event.clientY - startY) / zoom;
      updateElement(el.id, 'x', el.x + dx);
      updateElement(el.id, 'y', el.y + dy);
    };

    const stop = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', stop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
  };

  const deleteElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
    setContextMenu(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - canvasBounds.left - offset.x) / zoom;
    const y = (e.clientY - canvasBounds.top - offset.y) / zoom;

    const clicked = elements.find(el =>
      x >= el.x && x <= el.x + 200 && y >= el.y && y <= el.y + 60
    );

    if (clicked) {
      setSelectedId(clicked.id);
      setContextMenu({
        type: 'element',
        x: e.clientX,
        y: e.clientY,
        id: clicked.id
      });
    } else {
      setSelectedId(null);
      setContextMenu({
        type: 'blank',
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  return (
    <div className="aev-canvas-wrapper" onWheel={handleWheel}>
      <div className="aev-canvas-toolbar">
        <button onClick={() => setTool('move')} className={tool === 'move' ? 'active' : ''}><FaHandPaper /></button>
        <button onClick={() => addText()}><FaFont /></button>
        <button><FaImage /></button>
        <button><FaPencilAlt /></button>
        <button><FaEraser /></button>
        <button onClick={() => setElements([])}><FaTrash /></button>
      </div>

      <div
        className="aev-canvas-area"
        ref={canvasRef}
        onMouseDown={startPan}
        onMouseMove={onPan}
        onMouseUp={stopPan}
        onContextMenu={handleContextMenu}
      >
        <div
          className="aev-canvas-board"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`
          }}
        >
          {elements.map((el) => (
            <div
              key={el.id}
              className={`canvas-block ${selectedId === el.id ? 'selected' : ''}`}
              style={{
                left: el.x,
                top: el.y,
                color: el.color,
                background: el.background,
                fontFamily: el.fontFamily,
                fontSize: el.fontSize
              }}
              onMouseDown={(e) => handleDragElement(e, el)}
              onClick={() => setSelectedId(el.id)}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateElement(el.id, 'content', e.target.innerText)}
            >
              {el.content}
            </div>
          ))}
        </div>
      </div>

      {selectedId && (
        <div className="aev-canvas-editor">
          <label>Texte</label>
          <input
            type="text"
            value={elements.find(e => e.id === selectedId)?.content || ''}
            onChange={(e) => updateElement(selectedId, 'content', e.target.value)}
          />
          <label>Taille</label>
          <input
            type="range"
            min={12}
            max={48}
            value={elements.find(e => e.id === selectedId)?.fontSize}
            onChange={(e) => updateElement(selectedId, 'fontSize', +e.target.value)}
          />
          <label>Police</label>
          <select
            value={elements.find(e => e.id === selectedId)?.fontFamily}
            onChange={(e) => updateElement(selectedId, 'fontFamily', e.target.value)}
          >
            <option value="Montserrat">Montserrat</option>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier</option>
          </select>
          <label>Couleur</label>
          <input
            type="color"
            value={elements.find(e => e.id === selectedId)?.color}
            onChange={(e) => updateElement(selectedId, 'color', e.target.value)}
          />
          <label>Background</label>
          <input
            type="color"
            value={elements.find(e => e.id === selectedId)?.background}
            onChange={(e) => updateElement(selectedId, 'background', e.target.value)}
          />
        </div>
      )}

      {contextMenu && (
        <div
          className="aev-context-menu-canvas"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={() => setContextMenu(null)}
        >
          {contextMenu.type === 'element' ? (
            <>
              <div onClick={() => setSelectedId(contextMenu.id)}>Modifier</div>
              <div onClick={() => deleteElement(contextMenu.id)}>Supprimer</div>
            </>
          ) : (
            <>
              <div onClick={() => addText()}>Ajouter texte</div>
              <div>Ajouter image</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Canvas;
