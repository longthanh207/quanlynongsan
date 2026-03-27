export default function DiaryCard({ diary }) {
  const { activityTitle, cropLabel, description, actionDate, recordedAt } = diary;

  // Định dạng ngày thực hiện: YYYY-MM-DD
  const t = new Date(actionDate);
  const dateStr = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  
  // Định dạng giờ ghi nhận
  const recordT = new Date(recordedAt);
  const timeStr = `${recordT.toLocaleTimeString('vi-VN', { hour: '2-digit', minute:'2-digit', second:'2-digit' })} ${recordT.toLocaleDateString('vi-VN')}`;

  // Chọn icon dựa theo keyword trong tiêu đề, ngẫu nhiên cho đẹp
  let Icon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
  let iconClass = "bg-success-light text-success";
  
  const titleLow = activityTitle.toLowerCase();
  if (titleLow.includes('tưới')) {
    iconClass = "bg-primary-light text-primary";
    Icon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
  } else if (titleLow.includes('bón')) {
    iconClass = "bg-warning-light text-warning";
    Icon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527"/><path d="M14 2v7.527"/><path d="M8.5 2h7"/><path d="M15.429 11c1.464 0 2.651 1.189 2.651 2.656v3.31A8.046 8.046 0 0 1 12 21a8.046 8.046 0 0 1-6.08-4.034v-3.31C5.92 12.189 7.107 11 8.571 11Z"/></svg>; // flask
  } else if (titleLow.includes('sâu') || titleLow.includes('bệnh')) {
    iconClass = "bg-warning-light text-warning"; // or orange/red
  }

  return (
    <div className="timeline-item" style={{ alignItems: 'flex-start' }}>
      <div className={`timeline-icon ${iconClass}`} style={{ width: '48px', height: '48px', marginTop: '16px' }}>
        {Icon}
      </div>
      
      <div className="timeline-content" style={{ flex: 1, paddingLeft: '8px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{activityTitle}</h4>
              <span style={{ color: '#94a3b8' }}>—</span>
              <span style={{ 
                padding: '4px 12px', borderRadius: '50px', 
                backgroundColor: '#dcfce7', color: '#166534', 
                fontSize: '13px', fontWeight: '500' 
              }}>
                {cropLabel}
              </span>
            </div>
            <div style={{ 
              width: '28px', height: '28px', borderRadius: '50%', 
              border: '2px solid #22c55e', color: '#22c55e',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            {description}
          </p>

          <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              Ngày thực hiện: {dateStr}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Ghi nhận lúc: {timeStr}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
