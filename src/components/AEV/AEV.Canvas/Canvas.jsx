import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Canvas.scss';
import {
  FaHandPaper, FaFont, FaPencilAlt, FaEraser, FaDownload, FaUndo, FaRedo,
  FaExpand, FaCompress, FaLayerGroup, FaEye, FaEyeSlash, FaLock, FaLockOpen,
  FaCopy, FaPaste, FaImage, FaTrash, FaPlus, FaMinus, FaRuler, FaShapes,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaBold, FaItalic, FaUnderline,
  FaUpload, FaTimes, FaGamepad
} from 'react-icons/fa';
import { BiGridAlt } from 'react-icons/bi';
import useFetch from '../../../hooks/useFetch';
import UploadBox from '../AEV.UploadBox/UploadBox';

const TOOLS = {
  MOVE: 'move',
  TEXT: 'text',
  DRAW: 'draw',
  ERASER: 'eraser',
  SHAPE: 'shape',
  IMAGE: 'image'
};

const SHAPES = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  LINE: 'line',
  ARROW: 'arrow',
  TRIANGLE: 'triangle',
  STAR: 'star',
  HEXAGON: 'hexagon'
};

const DEFAULT_GAME_IMAGE = '/assets/images/default-game.jpg';

const Canvas = () => {
  // State management
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [tool, setTool] = useState(TOOLS.MOVE);
  const [selectedShape, setSelectedShape] = useState(SHAPES.RECTANGLE);
  const [selectedId, setSelectedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [contextMenu, setContextMenu] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [clipboard, setClipboard] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(true);
  const [layers, setLayers] = useState([
    { id: 1, name: 'Calque 1', visible: true, locked: false, elements: [] }
  ]);
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [isDragging, setIsDragging] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('games');
  const { data: gamesData, loading: isLoading, error: gamesError } = useFetch(showImageModal && activeTab === 'games' ? '/api/games' : null);
  const games = gamesData?.data || [];

  // History management
  const addToHistory = useCallback((newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  // Layer management
  const addLayer = () => {
    const newLayer = {
      id: Date.now(),
      name: `Calque ${layers.length + 1}`,
      visible: true,
      locked: false,
      elements: []
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer.id);
  };

  const toggleLayerVisibility = (layerId) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLayerLock = (layerId) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const deleteLayer = (layerId) => {
    if (layers.length > 1) {
      const newLayers = layers.filter(layer => layer.id !== layerId);
      setLayers(newLayers);
      if (selectedLayer === layerId) {
        setSelectedLayer(newLayers[0].id);
      }
    }
  };

  // Element management
  const addText = (x = 300, y = 200) => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      content: 'Double-cliquez pour éditer',
      x,
      y,
      fontSize: 18,
      fontFamily: 'Montserrat',
      color: '#ffffff',
      background: 'transparent',
      layer: selectedLayer,
      rotation: 0,
      opacity: 1,
      style: {
        bold: false,
        italic: false,
        underline: false,
        align: 'left'
      },
      effects: {
        shadow: false,
        blur: 0,
        glow: false
      }
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(newElement.id);
  };

  const addShape = (x = 300, y = 200) => {
    const shapeProps = {
      rectangle: {
        width: 100,
        height: 100,
        style: {}
      },
      circle: {
        width: 100,
        height: 100,
        style: { borderRadius: '50%' }
      },
      triangle: {
        width: 100,
        height: 100,
        style: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }
      },
      star: {
        width: 100,
        height: 100,
        style: { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }
      },
      hexagon: {
        width: 100,
        height: 100,
        style: { clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }
      },
      line: {
        width: 100,
        height: 2,
        style: {}
      },
      arrow: {
        width: 100,
        height: 2,
        style: {
          '&::after': {
            content: '""',
            position: 'absolute',
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            borderLeft: '10px solid #fff',
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent'
          }
        }
      }
    };

    const props = shapeProps[selectedShape] || shapeProps.rectangle;

    const newElement = {
      id: Date.now(),
      type: 'shape',
      shape: selectedShape,
      x,
      y,
      ...props,
      color: '#ffffff',
      strokeColor: '#ffffff',
      strokeWidth: 2,
      layer: selectedLayer,
      rotation: 0,
      opacity: 1,
      effects: {
        shadow: false,
        blur: 0,
        glow: false
      }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(newElement.id);
  };

  const addImage = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newElement = {
        id: Date.now(),
        type: 'image',
        src: e.target.result,
        x: 300,
        y: 200,
        width: 200,
        height: 200,
        layer: selectedLayer,
        rotation: 0,
        opacity: 1,
        effects: {
          shadow: false,
          blur: 0,
          brightness: 100,
          contrast: 100
        }
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      addToHistory(newElements);
      setSelectedId(newElement.id);
    };
    reader.readAsDataURL(file);
  };

  // Drawing handlers
  const startDrawing = (e) => {
    if (tool !== TOOLS.DRAW) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    setIsDrawing(true);
    setDrawingPoints([[x, y]]);

    // Create a new path element with bounding box
    const newPath = {
      id: Date.now(),
      type: 'path',
      points: [[x, y]],
      color: brushColor,
      width: brushSize,
      layer: selectedLayer,
      opacity: 1,
      bounds: {
        minX: x,
        maxX: x,
        minY: y,
        maxY: y
      }
    };
    setCurrentPath(newPath);
  };

  const draw = (e) => {
    if (!isDrawing || tool !== TOOLS.DRAW) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    const newPoints = [...drawingPoints, [x, y]];
    setDrawingPoints(newPoints);

    if (currentPath) {
      // Update bounding box
      const bounds = {
        minX: Math.min(currentPath.bounds.minX, x),
        maxX: Math.max(currentPath.bounds.maxX, x),
        minY: Math.min(currentPath.bounds.minY, y),
        maxY: Math.max(currentPath.bounds.maxY, y)
      };

      setCurrentPath({
        ...currentPath,
        points: newPoints,
        bounds
      });
    }
  };

  const endDrawing = () => {
    if (!isDrawing || !currentPath) return;

    // Adjust the path position and points based on bounding box
    const bounds = currentPath.bounds;
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;

    const adjustedPoints = currentPath.points.map(([x, y]) => [
      x - bounds.minX,
      y - bounds.minY
    ]);

    const finalPath = {
      ...currentPath,
      x: bounds.minX,
      y: bounds.minY,
      width,
      height,
      points: adjustedPoints
    };

    const newElements = [...elements, finalPath];
    setElements(newElements);
    addToHistory(newElements);

    setIsDrawing(false);
    setDrawingPoints([]);
    setCurrentPath(null);
  };

  // Canvas controls
  const handleWheel = (e) => {
    if (e.ctrlKey) {
    e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.min(5, Math.max(0.1, prev * delta)));
    }
  };

  const startPan = (e) => {
    if (tool !== TOOLS.MOVE) return;
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

  // Element manipulation
  const updateElement = (id, updates) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const handleDragElement = (e, el) => {
    if (layers.find(l => l.id === el.layer)?.locked) return;
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (event) => {
      const dx = (event.clientX - startX) / zoom;
      const dy = (event.clientY - startY) / zoom;
      updateElement(el.id, { x: el.x + dx, y: el.y + dy });
    };

    const stop = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', stop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
  };

  const deleteElement = (id) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(null);
    setContextMenu(null);
  };

  const duplicateElement = (id) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;

    const newElement = {
      ...element,
      id: Date.now(),
      x: element.x + 20,
      y: element.y + 20
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(newElement.id);
  };

  // Export/Import
  const exportCanvas = () => {
    const data = {
      elements,
      layers
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCanvas = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setElements(data.elements || []);
        setLayers(data.layers || []);
        addToHistory(data.elements || []);
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
      }
    };
    reader.readAsText(file);
  };

  // Add fullscreen handling
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle context menu
  const handleContextMenu = (e, element = null) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

      setContextMenu({
      x,
      y,
      element
    });
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Handle element selection
  const handleElementClick = (e, element) => {
    e.stopPropagation();
    if (!isDragging) {
      setSelectedId(element.id);
    }
  };

  // Handle canvas click
  const handleCanvasClick = (e) => {
    if (contextMenu) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    if (tool === TOOLS.TEXT && !selectedId) {
      addText(x, y);
    } else if (tool === TOOLS.SHAPE && !selectedId) {
      addShape(x, y);
    } else {
      setSelectedId(null);
    }
  };

  // Update mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(false);
    if (tool === TOOLS.DRAW) {
      startDrawing(e);
    } else if (tool === TOOLS.MOVE) {
      startPan(e);
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      draw(e);
    } else if (isPanning) {
      setIsDragging(true);
      onPan(e);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      endDrawing();
    } else if (isPanning) {
      stopPan();
    }
  };

  // Render toolbar groups
  const renderToolbar = () => (
    <div className="aev-canvas-toolbar main">
      <div className="tools-group">
        <button onClick={() => setTool(TOOLS.MOVE)} className={tool === TOOLS.MOVE ? 'active' : ''} title="Déplacer">
          <FaHandPaper />
        </button>
        <button onClick={() => setTool(TOOLS.TEXT)} className={tool === TOOLS.TEXT ? 'active' : ''} title="Texte">
          <FaFont />
        </button>
        <button onClick={() => setTool(TOOLS.DRAW)} className={tool === TOOLS.DRAW ? 'active' : ''} title="Dessiner">
          <FaPencilAlt />
        </button>
        <button onClick={() => setTool(TOOLS.ERASER)} className={tool === TOOLS.ERASER ? 'active' : ''} title="Gomme">
          <FaEraser />
        </button>
      </div>

      <div className="tools-group">
        <button onClick={() => setTool(TOOLS.SHAPE)} className={tool === TOOLS.SHAPE ? 'active' : ''} title="Formes">
          <FaShapes />
        </button>
        <button onClick={() => {
          setTool(TOOLS.IMAGE);
          setShowImageModal(true);
        }} className={tool === TOOLS.IMAGE ? 'active' : ''} title="Image">
          <FaImage />
        </button>
        <button onClick={() => setShowRulers(!showRulers)} className={showRulers ? 'active' : ''} title="Règles">
          <FaRuler />
        </button>
        <button onClick={() => setShowGrid(!showGrid)} className={showGrid ? 'active' : ''} title="Grille">
          <BiGridAlt />
        </button>
      </div>

      <div className="tools-group">
        <button onClick={undo} disabled={historyIndex <= 0} title="Annuler">
          <FaUndo />
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} title="Refaire">
          <FaRedo />
        </button>
      </div>

      <div className="tools-group">
        <button onClick={exportCanvas} title="Exporter">
          <FaDownload />
        </button>
        <button onClick={toggleFullscreen} title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}>
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
    </div>
  );

  // Render side controls
  const renderSideControls = () => (
    <div className="aev-canvas-toolbar side">
      <div className="zoom-controls">
        <span>{Math.round(zoom * 100)}%</span>
        <div className="zoom-buttons">
          <button onClick={() => setZoom(prev => Math.min(5, prev * 1.1))} title="Zoom +">
            <FaPlus />
          </button>
          <button onClick={() => setZoom(prev => Math.max(0.1, prev * 0.9))} title="Zoom -">
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );

  // Render text formatting toolbar when text is selected
  const renderTextFormatting = () => {
    const selectedElement = elements.find(el => el.id === selectedId);
    if (!selectedElement || selectedElement.type !== 'text') return null;

    return (
      <div className="text-formatting-toolbar">
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, bold: !selectedElement.style.bold }
          })}
          className={selectedElement.style.bold ? 'active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, italic: !selectedElement.style.italic }
          })}
          className={selectedElement.style.italic ? 'active' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, underline: !selectedElement.style.underline }
          })}
          className={selectedElement.style.underline ? 'active' : ''}
        >
          <FaUnderline />
        </button>
        <div className="separator" />
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, align: 'left' }
          })}
          className={selectedElement.style.align === 'left' ? 'active' : ''}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, align: 'center' }
          })}
          className={selectedElement.style.align === 'center' ? 'active' : ''}
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => updateElement(selectedId, {
            style: { ...selectedElement.style, align: 'right' }
          })}
          className={selectedElement.style.align === 'right' ? 'active' : ''}
        >
          <FaAlignRight />
        </button>
      </div>
    );
  };

  // Render context menu
  const renderContextMenu = () => {
    if (!contextMenu) return null;

    return (
      <div
        className="context-menu"
        style={{
          top: contextMenu.y,
          left: contextMenu.x
        }}
      >
        {contextMenu.element ? (
          <>
            <div className="menu-item" onClick={() => {
              duplicateElement(contextMenu.element.id);
              setContextMenu(null);
            }}>
              <FaCopy /> Dupliquer
            </div>
            <div className="separator" />
            <div className="menu-item danger" onClick={() => {
              deleteElement(contextMenu.element.id);
              setContextMenu(null);
            }}>
              <FaTrash /> Supprimer
            </div>
          </>
        ) : (
          <>
            <div className="menu-item" onClick={() => {
              addText(contextMenu.x, contextMenu.y);
              setContextMenu(null);
            }}>
              <FaFont /> Ajouter du texte
            </div>
            <div className="menu-item" onClick={() => {
              addShape(contextMenu.x, contextMenu.y);
              setContextMenu(null);
            }}>
              <FaShapes /> Ajouter une forme
            </div>
          </>
        )}
      </div>
    );
  };

  const selectGameImage = (game) => {
    const newElement = {
      id: Date.now(),
      type: 'image',
      src: game.thumbnail || game.image || DEFAULT_GAME_IMAGE,
      x: 300,
      y: 200,
      width: 200,
      height: 200,
      layer: selectedLayer,
      rotation: 0,
      opacity: 1,
      effects: {
        shadow: false,
        blur: 0,
        glow: false
      }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedId(newElement.id);
    setShowImageModal(false);
  };

  // Image selection modal using existing components
  const renderImageModal = () => (
    <div className="canvas-modal-overlay" onClick={() => setShowImageModal(false)}>
      <div className="canvas-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sélectionner une image</h2>
          <button className="close-btn" onClick={() => setShowImageModal(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <FaUpload /> Télécharger
          </button>
          <button
            className={`tab ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            <FaGamepad /> Jeux
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'upload' ? (
            <UploadBox onUpload={addImage} />
          ) : (
            <div className="games-grid">
              {isLoading ? (
                <div className="loading-state">
                  <div className="loading-spinner" />
                  <p>Chargement des jeux...</p>
                </div>
              ) : gamesError ? (
                <div className="error-state">
                  <span className="error-icon">⚠️</span>
                  <h3>Erreur de chargement</h3>
                  <p>{gamesError.message}</p>
                  <button onClick={() => window.location.reload()}>Réessayer</button>
                </div>
              ) : !games || games.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">🎮</span>
                  <h3>Aucun jeu trouvé</h3>
                  <p>Il n'y a pas encore de jeux disponibles.</p>
                </div>
              ) : (
                <div className="games-list">
                  {games.map(game => (
                    <div
                      key={game.id}
                      className="game-card"
                      onClick={() => selectGameImage(game)}
                    >
                      <img
                        src={game.thumbnail || game.image || DEFAULT_GAME_IMAGE}
                        alt={game.name || game.title}
                        className="game-image"
                      />
                      <div className="game-overlay">
                        <button className="select-btn">Sélectionner</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`aev-canvas-wrapper tool-${tool} ${isFullscreen ? 'fullscreen' : ''}`} onWheel={handleWheel}>
      {renderToolbar()}
      {renderSideControls()}
      {renderTextFormatting()}
      {renderContextMenu()}
      {renderImageModal()}

      <div
        className={`aev-canvas-area ${isPanning ? 'panning' : ''} ${isDrawing ? 'drawing' : ''}`}
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => handleContextMenu(e)}
      >
        <div
          className={`aev-canvas-board ${showGrid ? 'with-grid' : ''}`}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`
          }}
        >
          {elements.map((el) => {
            const layer = layers.find(l => l.id === el.layer);
            if (!layer?.visible) return null;

            return (
            <div
              key={el.id}
                className={`canvas-element ${selectedId === el.id ? 'selected' : ''} ${el.type}`}
              style={{
                left: el.x,
                top: el.y,
                  transform: `rotate(${el.rotation}deg)`,
                  opacity: el.opacity,
                  pointerEvents: layer?.locked ? 'none' : 'auto',
                  ...(el.type === 'text' && {
                color: el.color,
                background: el.background,
                fontFamily: el.fontFamily,
                    fontSize: el.fontSize,
                    textAlign: el.style?.align || 'left',
                    fontWeight: el.style?.bold ? 'bold' : 'normal',
                    fontStyle: el.style?.italic ? 'italic' : 'normal',
                    textDecoration: el.style?.underline ? 'underline' : 'none'
                  }),
                  ...(el.type === 'image' && {
                    width: el.width,
                    height: el.height
                  }),
                  ...(el.type === 'shape' && {
                    width: el.width,
                    height: el.height,
                    backgroundColor: el.color,
                    border: `${el.strokeWidth}px solid ${el.strokeColor}`
                  })
                }}
                onClick={(e) => handleElementClick(e, el)}
              onMouseDown={(e) => handleDragElement(e, el)}
                onContextMenu={(e) => handleContextMenu(e, el)}
              >
                {el.type === 'text' ? (
                  <div
              contentEditable
              suppressContentEditableWarning
                    onBlur={(e) => updateElement(el.id, { content: e.target.innerText })}
                  >
                    {el.content}
                  </div>
                ) : el.type === 'image' ? (
                  <img src={el.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : el.type === 'path' ? (
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <path
                      d={`M ${el.points.map(([x, y]) => `${x} ${y}`).join(' L ')}`}
                      stroke={el.color}
                      strokeWidth={el.width}
                      fill="none"
                    />
                  </svg>
                ) : null}
              </div>
            );
          })}
          {isDrawing && (
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
              <path
                d={`M ${drawingPoints.map(([x, y]) => `${x} ${y}`).join(' L ')}`}
                stroke={brushColor}
                strokeWidth={brushSize}
                fill="none"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="aev-layers-panel">
        <div className="panel-header">
          <h3>Calques</h3>
          <button onClick={addLayer} title="Nouveau calque">+</button>
        </div>
        <div className="layers-list">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`layer-item ${selectedLayer === layer.id ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="layer-controls">
                <button onClick={() => toggleLayerVisibility(layer.id)}>
                  {layer.visible ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button onClick={() => toggleLayerLock(layer.id)}>
                  {layer.locked ? <FaLock /> : <FaLockOpen />}
                </button>
              </div>
              <div className="layer-info">
                <span className="layer-name">{layer.name}</span>
                <span className="layer-details">
                  {elements.filter(el => el.layer === layer.id).length} éléments
                </span>
              </div>
              {layers.length > 1 && (
                <button onClick={() => deleteLayer(layer.id)} className="delete-layer">
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedId && (
        <div className="aev-properties-panel">
          <div className="panel-header">
            <h3>Propriétés</h3>
            <button onClick={() => setSelectedId(null)}>×</button>
          </div>
          <div className="properties-content">
            {elements.find(e => e.id === selectedId)?.type === 'text' && (
              <div className="property-group">
                <div className="property-header">Texte</div>
                <label>
                  Contenu
          <input
            type="text"
            value={elements.find(e => e.id === selectedId)?.content || ''}
                    onChange={(e) => updateElement(selectedId, { content: e.target.value })}
                  />
                </label>
                <label>
                  Police
          <select
            value={elements.find(e => e.id === selectedId)?.fontFamily}
                    onChange={(e) => updateElement(selectedId, { fontFamily: e.target.value })}
          >
            <option value="Montserrat">Montserrat</option>
            <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </label>
                <label>
                  Taille
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={elements.find(e => e.id === selectedId)?.fontSize || 16}
                    onChange={(e) => updateElement(selectedId, { fontSize: Number(e.target.value) })}
                  />
                </label>
                <label>
                  Couleur
                  <input
                    type="color"
                    value={elements.find(e => e.id === selectedId)?.color || '#ffffff'}
                    onChange={(e) => updateElement(selectedId, { color: e.target.value })}
                  />
                </label>
              </div>
            )}

            {elements.find(e => e.id === selectedId)?.type === 'shape' && (
              <div className="property-group">
                <div className="property-header">Forme</div>
                <label>
                  Type
                  <select
                    value={elements.find(e => e.id === selectedId)?.shape}
                    onChange={(e) => updateElement(selectedId, { shape: e.target.value })}
                  >
                    <option value={SHAPES.RECTANGLE}>Rectangle</option>
                    <option value={SHAPES.CIRCLE}>Cercle</option>
                    <option value={SHAPES.LINE}>Ligne</option>
                    <option value={SHAPES.ARROW}>Flèche</option>
          </select>
                </label>
                <label>
                  Couleur de remplissage
          <input
            type="color"
                    value={elements.find(e => e.id === selectedId)?.color || '#ffffff'}
                    onChange={(e) => updateElement(selectedId, { color: e.target.value })}
          />
                </label>
                <label>
                  Couleur de bordure
          <input
            type="color"
                    value={elements.find(e => e.id === selectedId)?.strokeColor || '#ffffff'}
                    onChange={(e) => updateElement(selectedId, { strokeColor: e.target.value })}
                  />
                </label>
                <label>
                  Épaisseur de bordure
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={elements.find(e => e.id === selectedId)?.strokeWidth || 2}
                    onChange={(e) => updateElement(selectedId, { strokeWidth: Number(e.target.value) })}
                  />
                </label>
        </div>
      )}

            <div className="property-group">
              <div className="property-header">Transformation</div>
              <label>
                Rotation
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={elements.find(e => e.id === selectedId)?.rotation || 0}
                  onChange={(e) => updateElement(selectedId, { rotation: Number(e.target.value) })}
                />
              </label>
              <label>
                Opacité
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(elements.find(e => e.id === selectedId)?.opacity || 1) * 100}
                  onChange={(e) => updateElement(selectedId, { opacity: Number(e.target.value) / 100 })}
                />
              </label>
            </div>

            <div className="button-group">
              <button onClick={() => duplicateElement(selectedId)}>
                <FaCopy /> Dupliquer
              </button>
              <button onClick={() => deleteElement(selectedId)} className="delete">
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
