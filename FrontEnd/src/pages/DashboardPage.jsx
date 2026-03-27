import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useDiary } from '../hooks/useDiary';
import { useSettings } from '../hooks/useSettings';
import ProductCard from '../components/ProductCard';
import StatCard from '../components/StatCard';
import DiaryCard from '../components/DiaryCard';
import Modal from '../components/Modal';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useAuth('FARMER');
  const { products, stats, createProduct } = useProducts();
  const { diaries, loading: diaryLoading, loadDiaries, addDiary } = useDiary(user?.id);
  const { changeEmail, changePassword, deleteAccount } = useSettings();

  const [activeTab, setActiveTab] = useState('tab-overview');
  const [modalType, setModalType] = useState(null);

  const productFormRef = useRef(null);
  const diaryFormRef = useRef(null);

  useEffect(() => {
    if (user && activeTab === 'tab-logs') {
      loadDiaries();
    }
  }, [user, activeTab, loadDiaries]);

  if (!user) return null;

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('farmerId', user.id);
    formData.append('farmerName', user.fullName);
    const success = await createProduct(formData);
    if (success) {
      setModalType(null);
      productFormRef.current?.reset();
    }
  };

  const handleDiarySubmit = async (e) => {
    e.preventDefault();
    const data = {
      farmerId: user.id,
      activityTitle: e.target.activityTitle.value,
      cropLabel: e.target.cropLabel.value,
      description: e.target.description.value,
      actionDate: e.target.actionDate.value,
    };
    const success = await addDiary(data);
    if (success) {
      setModalType(null);
      diaryFormRef.current?.reset();
    }
  };

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="dashboard-layout">
      {/* TOPBAR */}
      <header className="dashboard-topbar">
        <div className="topbar-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          <span className="brand-name">FarmerCentral</span>
          <span className="brand-divider">-</span>
          <span className="brand-sub">{user.id ? user.id.slice(-4) : 'abcc'}</span>
        </div>
        <div className="topbar-right">
          <button className="btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </button>
          <div className="topbar-avatar">{getInitials(user.fullName)}</div>
          <button className="btn-logout" onClick={logout}>
            [→ Đăng xuất]
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button className={`nav-item ${activeTab === 'tab-overview' ? 'active' : ''}`} onClick={() => setActiveTab('tab-overview')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              Tổng quan
            </button>
            <button className={`nav-item ${activeTab === 'tab-products' ? 'active' : ''}`} onClick={() => setActiveTab('tab-products')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              Sản phẩm của tôi
            </button>
            <button className={`nav-item ${activeTab === 'tab-logs' ? 'active' : ''}`} onClick={() => setActiveTab('tab-logs')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Nhật ký mùa vụ
            </button>
            <button className={`nav-item ${activeTab === 'tab-settings' ? 'active' : ''}`} onClick={() => setActiveTab('tab-settings')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Cài đặt
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <div className="sidebar-avatar">{getInitials(user.fullName)}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.fullName}</div>
              <div className="sidebar-user-role">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Nông dân'}</div>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main className="dashboard-main">
          {activeTab === 'tab-overview' && (
            <div className="tab-pane fade-in">
              <h2 className="tab-title">Tổng quan</h2>
              
              <div className="stats-row">
                <StatCard title="Tổng sản phẩm" value={stats.total} icon="📦" statType="total" />
                <StatCard title="Đang chờ duyệt" value={stats.pending} icon="⏳" statType="pending" />
                <StatCard title="Đã phê duyệt" value={stats.approved} icon="✅" statType="approved" />
                <StatCard title="Bị từ chối" value={stats.rejected} icon="❌" statType="rejected" />
              </div>
              
              <div className="activity-panel">
                <h3>Hoạt động gần đây</h3>
                <div className="activity-timeline">
                  {/* Mock activities for purely aesthetic purposes since backend does not supply timeline yet */}
                  <div className="timeline-item">
                    <div className="timeline-icon bg-success-light text-success"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <div className="timeline-content">
                      <p>Sản phẩm 'Cà chua Đà Lạt' đã được phê duyệt</p>
                      <span>5 phút trước</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon bg-primary-light text-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>
                    <div className="timeline-content">
                      <p>Bạn đã thêm sản phẩm 'Bơ sáp Đắk Lắk'</p>
                      <span>1 giờ trước</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon bg-warning-light text-warning"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                    <div className="timeline-content">
                      <p>Sản phẩm 'Xà lách thủy canh' đang chờ duyệt</p>
                      <span>3 giờ trước</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon bg-muted-light text-muted"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></div>
                    <div className="timeline-content">
                      <p>Bạn đã cập nhật nhật ký mùa vụ tháng 3</p>
                      <span>1 ngày trước</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tab-products' && (
            <div className="tab-pane fade-in">
              <div className="tab-header">
                <h2 className="tab-title">Sản phẩm của tôi</h2>
                <button className="btn-solid" onClick={() => setModalType('product')}>+ Thêm sản phẩm</button>
              </div>
              <div className="product-grid">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tab-logs' && (
             <div className="tab-pane fade-in">
              <div className="tab-header">
                <div>
                  <h2 className="tab-title mb-0">Nhật ký mùa vụ</h2>
                  <p className="tab-subtitle">Ghi lại các hoạt động chăm sóc, bón phân và thu hoạch</p>
                </div>
                <button className="btn-solid" onClick={() => setModalType('diary')}>+ Thêm nhật ký</button>
              </div>
              
              <div className="diary-timeline-container">
                {diaryLoading ? (
                  <p className="text-muted">Đang tải nhật ký...</p>
                ) : diaries.length === 0 ? (
                  <div className="empty-state">
                    <p>Chưa có bản ghi nhật ký nào. Hãy tạo nhật ký mới!</p>
                  </div>
                ) : (
                  <div className="diary-timeline">
                    {diaries.map(d => (
                      <DiaryCard key={d._id} diary={d} />
                    ))}
                  </div>
                )}
              </div>
             </div>
          )}

          {activeTab === 'tab-settings' && (
            <div className="tab-pane fade-in">
              <div className="tab-header" style={{ marginBottom: '30px' }}>
                <div>
                  <h2 className="tab-title mb-0">Cài đặt</h2>
                  <p className="tab-subtitle">Quản lý tài khoản và tùy chỉnh hệ thống</p>
                </div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <h3>Cài đặt tài khoản</h3>
                </div>
                
                <div className="form-group-modern">
                  <label>Họ và tên</label>
                  <div className="input-modern-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input type="text" readOnly value={user.fullName} className="input-modern" />
                  </div>
                </div>

                <div className="form-group-modern">
                  <label>Email liên hệ</label>
                  <div className="input-modern-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <input type="text" readOnly value={user.email} className="input-modern" />
                  </div>
                </div>

                <div className="form-group-modern">
                  <label>Vai trò</label>
                  <div className="badge badge-approved" style={{ width: 'fit-content' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Nông dân / Hợp tác xã
                  </div>
                </div>

                <button className="btn-solid" style={{ marginTop: '10px' }}>Lưu thay đổi</button>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <h3>Bảo mật tài khoản</h3>
                </div>

                <div className="setting-row">
                  <div className="setting-info">
                    <h4>Mật khẩu</h4>
                    <p>Cập nhật 3 tháng trước</p>
                  </div>
                  <button className="btn-link text-primary" onClick={() => changePassword(user.id)}>Thay đổi</button>
                </div>

                <div className="setting-row">
                  <div className="setting-info">
                    <h4>Địa chỉ Email</h4>
                    <p>{user.email}</p>
                  </div>
                  <button className="btn-link text-primary" onClick={() => changeEmail(user.id)}>Thay đổi</button>
                </div>

                <div className="setting-row">
                  <div className="setting-info">
                    <h4>Xác thực hai yếu tố</h4>
                    <p>Chưa kích hoạt</p>
                  </div>
                  <button className="btn-link text-primary">Kích hoạt</button>
                </div>
              </div>

              <div className="setting-card border-danger">
                <div className="setting-card-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  <h3 className="text-danger">Vùng nguy hiểm</h3>
                </div>
                <p className="text-muted" style={{ marginBottom: '15px' }}>Hành động này sẽ xóa vĩnh viễn tài khoản và mọi dữ liệu của bạn.</p>
                <button className="btn-danger" onClick={() => deleteAccount(user.id)}>Xóa tài khoản</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      <Modal isOpen={modalType === 'product'} onClose={() => setModalType(null)}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Tạo lô hàng mới</h3>
        <form onSubmit={handleProductSubmit} ref={productFormRef} className="modal-form">
          <input type="text" name="name" placeholder="Tên sản phẩm" required className="input-modern" />
          <input type="number" name="quantity" placeholder="Số lượng" required className="input-modern" />
          <input type="text" name="unit" placeholder="Đơn vị (kg, tấn...)" required className="input-modern" />
          <input type="number" name="price" placeholder="Giá/Đơn vị" required className="input-modern" />
          <input type="file" name="productImage" accept="image/*" required className="input-modern" />
          <button type="submit" className="btn-solid" style={{ width: '100%', marginTop: '10px' }}>Gửi phê duyệt</button>
        </form>
      </Modal>

      <Modal isOpen={modalType === 'diary'} onClose={() => setModalType(null)}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Thêm nhật ký chăm sóc</h3>
        <form onSubmit={handleDiarySubmit} ref={diaryFormRef} className="modal-form">
          <input type="text" name="activityTitle" placeholder="Tiêu đề (VD: Gieo hạt, Tưới nước)" required className="input-modern" />
          <input type="text" name="cropLabel" placeholder="Loại cây (VD: Cà chua bi)" required className="input-modern" />
          <textarea name="description" rows="4" placeholder="Mô tả công việc..." required className="input-modern" style={{ resize: 'vertical' }}></textarea>
          <input type="date" name="actionDate" required className="input-modern" />
          <button type="submit" className="btn-solid" style={{ width: '100%', marginTop: '10px' }}>Lưu nhật ký</button>
        </form>
      </Modal>
    </div>
  );
}
