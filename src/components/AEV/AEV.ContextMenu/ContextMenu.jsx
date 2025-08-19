import { useState } from 'react';
import './ContextMenu.scss';

const ContextMenu = () => {
  const [items, setItems] = useState(['First Item', 'Second Item']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="aev-context-menu always-visible">
      <div className="menu-header">Context Items</div>

      <div className="menu-footer">
        <input
          type="text"
          value={newItem}
          placeholder="Add item..."
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul className="menu-list">
        {items.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => removeItem(index)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
