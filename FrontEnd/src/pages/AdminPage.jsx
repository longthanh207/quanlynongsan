import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
import ApprovalCard from '../components/ApprovalCard';
import UserRow from '../components/UserRow';
import './AdminPage.css';

export default function AdminPage() {
  const { user, logout } = useAuth('ADMIN');
  const { users, pendingProducts, loadUsers, loadPendingProducts, updateStatus } = useAdmin();
  const [activeTab, setActiveTab] = useState('tab-users');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'tab-users') loadUsers();
    if (tabId === 'tab-overview') loadPendingProducts();
  };

  if (!user) return null;

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="icon">🛡️</div>
          Admin Central
        </div>
        <div className="menu">
          <button className={`menu-item ${activeTab === 'tab-overview' ? 'active' : ''}`} onClick={() => switchTab('tab-overview')}>
            <span>📊</span> Tổng quan
          </button>
          <button className={`menu-item ${activeTab === 'tab-users' ? 'active' : ''}`} onClick={() => switchTab('tab-users')}>
            <span>👥</span> Người dùng
          </button>
          <button className="menu-item" onClick={() => alert('Tính năng đang phát triển!')}>
            <span>🕒</span> Nhật ký hệ thống
          </button>
        </div>
        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="avatar-circle">Q</div>
            <div className="admin-info">
              <h4>{user.fullName}</h4>
              <p>Administrator</p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>[→ Đăng xuất]</button>
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'tab-overview' && (
          <>
            <div className="top-bar">
              <h2>Tổng quan hệ thống</h2>
              <button className="btn btn-outline" onClick={loadPendingProducts}>Làm mới</button>
            </div>
            <div className="table-container" style={{ padding: '20px' }}>
              <h3 style={{ marginTop: 0 }}>📦 Lô hàng chờ duyệt</h3>
              {pendingProducts.length === 0 ? (
                <p style={{ color: '#888', padding: '20px' }}>🎉 Tuyệt vời! Không còn lô hàng nào đang chờ duyệt.</p>
              ) : (
                pendingProducts.map(p => (
                  <ApprovalCard 
                    key={p._id} 
                    product={p}
                    onApprove={() => updateStatus(p._id, 'APPROVED')}
                    onReject={() => updateStatus(p._id, 'REJECTED')}
                  />
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'tab-users' && (
          <>
            <div className="top-bar">
              <h2>Quản lý người dùng</h2>
              <div className="action-btns">
                <button className="btn btn-outline" onClick={loadUsers}>Làm mới</button>
                <button className="btn btn-primary">👤+ Thêm người dùng</button>
              </div>
            </div>

            <div className="filter-bar">
              <div className="search-box">
                <input type="text" placeholder="Tìm kiếm theo tên hoặc email..." />
              </div>
              <select className="filter-select">
                <option>Tất cả vai trò</option>
                <option>Nông dân</option>
                <option>Quản trị viên</option>
              </select>
              <button className="btn btn-outline">⚙ Lọc nâng cao</button>
              <button className="btn btn-outline">📄 Import Excel</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ textAlign: 'center' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <UserRow key={u._id} user={u} />
                  ))}
                  {/* Admin mẫu */}
                  <tr>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar avatar-Q">Q</div>
                        <div>
                          <div className="user-name">Quản trị viên</div>
                          <div className="user-email">admin@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-admin">Quản trị viên</span></td>
                    <td><span className="badge badge-status">Đang hoạt động</span></td>
                    <td>2026-01-01</td>
                    <td style={{ textAlign: 'center' }}><div className="action-dot">⋮</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
