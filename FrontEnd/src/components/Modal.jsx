export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        {children}
        <button 
          type="button" 
          onClick={onClose} 
          style={{ width: '100%', background: 'none', color: '#666', border: 'none', marginTop: '10px', cursor: 'pointer' }}
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
}
