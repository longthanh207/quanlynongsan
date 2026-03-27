import { getImageUrl } from '../services/api';

export default function ProductCard({ product }) {
  const { status, productImageUrl, name, quantity, unit, price, qrCodeImageUrl } = product;

  let badgeClass = 'badge-pending';
  let statusLabel = 'Chờ duyệt';
  if (status === 'APPROVED') { badgeClass = 'badge-approved'; statusLabel = 'Đã duyệt'; }
  if (status === 'REJECTED') { badgeClass = 'badge-rejected'; statusLabel = 'Bị từ chối'; }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', height: '180px', width: '100%' }}>
        <img 
          src={getImageUrl(productImageUrl)} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span className={`badge ${badgeClass}`}>{statusLabel}</span>
        </div>
      </div>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{name}</h4>
        
        <div style={{ marginBottom: '12px' }}>
          <span style={{ 
            display: 'inline-block', padding: '4px 8px', borderRadius: '4px', 
            backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '500' 
          }}>
            Nông sản
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5', flex: 1 }}>
          Sản phẩm nông sản chất lượng cao, nuôi trồng theo quy trình chuẩn. Đảm bảo vệ sinh an toàn thực phẩm.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '13px', color: '#475569' }}>
            Số lượng: <span style={{ fontWeight: '600', color: '#1e293b' }}>{quantity} {unit}</span>
          </div>
          <div style={{ fontSize: '13px', color: '#475569' }}>
            Giá: <span style={{ fontWeight: '600', color: '#1e293b' }}>{price.toLocaleString()}đ/{unit}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            flex: 1, padding: '8px 0', background: 'transparent',
            border: '1px solid #e2e8f0', borderRadius: '8px', color: '#475569',
            fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Sửa
          </button>
          <button style={{
            flex: 1, padding: '8px 0', background: 'transparent',
            border: '1px solid #fecaca', borderRadius: '8px', color: '#ef4444',
            fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
          }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            Xóa
          </button>
          {status === 'APPROVED' && (
            <button style={{
              padding: '0 12px', background: 'transparent',
              border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <img src={getImageUrl(qrCodeImageUrl)} style={{ width: '20px', height: '20px' }} alt="QR" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
