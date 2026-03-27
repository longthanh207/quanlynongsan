import { getImageUrl } from '../services/api';

export default function ApprovalCard({ product, onApprove, onReject }) {
  return (
    <div className="approval-card">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={getImageUrl(product.productImageUrl)} 
          style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '15px', objectFit: 'cover' }}
          alt={product.name} 
        />
        <div>
          <h4 style={{ margin: '0 0 5px', fontSize: '16px' }}>{product.name}</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>
            Nông dân: {product.farmerId} | Mã: {product.batchSerialNumber}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn btn-primary" style={{ background: '#16a34a' }} onClick={onApprove}>
          ✅ Duyệt
        </button>
        <button className="btn btn-primary" style={{ background: '#dc2626' }} onClick={onReject}>
          ❌ Từ chối
        </button>
      </div>
    </div>
  );
}
