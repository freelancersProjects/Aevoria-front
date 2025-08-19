
import './ContextMenuAbsolute.scss';

const ContextMenuAbsolute = ({ x, y, actions, onClose }) => {
  return (
    <div
      className="aev-context-menu"
      style={{ top: y, left: x }}
      onMouseLeave={onClose}
    >
      {actions.map((action, index) => (
        <div key={index} className="menu-item" onClick={action.onClick}>
          {action.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenuAbsolute;
