// ==========================================
//   ADMIN PAGE - Logic
// ==========================================

// 1. Kiểm tra xác thực Admin
const user = JSON.parse(localStorage.getItem('user'));
if (!user || user.role !== 'ADMIN') {
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = 'login.html';
} else {
    document.getElementById('adminName').innerText = user.fullName;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// 2. Chuyển đổi Tab Menu
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');

    if (tabId === 'tab-users') loadUserData();
    if (tabId === 'tab-overview') loadApprovalData();
}

// 3. TẢI DỮ LIỆU NGƯỜI DÙNG (Cho Tab Quản lý người dùng)
async function loadUserData() {
    try {
        const result = await getUsersApi();

        let userHtml = '';
        result.data.forEach(u => {
            const date = new Date(u.createdAt).toISOString().split('T')[0];
            const firstLetter = u.fullName.charAt(0).toUpperCase();

            userHtml += `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar avatar-N">${firstLetter}</div>
                            <div>
                                <div class="user-name">${u.fullName}</div>
                                <div class="user-email">${u.email}</div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-farmer">Nông dân</span></td>
                    <td><span class="badge badge-status">Đang hoạt động</span></td>
                    <td>${date}</td>
                    <td style="text-align: center;"><div class="action-dot">⋮</div></td>
                </tr>
            `;
        });

        // Add thêm một dòng Admin mẫu để giống hệt giao diện thiết kế
        userHtml += `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar avatar-Q">Q</div>
                            <div>
                                <div class="user-name">Quản trị viên</div>
                                <div class="user-email">admin@example.com</div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-admin">Quản trị viên</span></td>
                    <td><span class="badge badge-status">Đang hoạt động</span></td>
                    <td>2026-01-01</td>
                    <td style="text-align: center;"><div class="action-dot">⋮</div></td>
                </tr>
        `;

        document.getElementById('user-list').innerHTML = userHtml;
    } catch (error) { console.error("Lỗi:", error); }
}

// 4. TẢI DỮ LIỆU DUYỆT HÀNG (Cho Tab Tổng quan)
async function loadApprovalData() {
    try {
        const result = await getPendingProductsApi();

        const listContainer = document.getElementById('pending-list');
        listContainer.innerHTML = "";

        if (!result.data || result.data.length === 0) {
            listContainer.innerHTML = '<p style="color:#888; padding: 20px;">🎉 Tuyệt vời! Không còn lô hàng nào đang chờ duyệt.</p>';
            return;
        }

        result.data.forEach(p => {
            listContainer.innerHTML += `
                <div class="approval-card">
                    <div style="display: flex; align-items: center;">
                        <img src="${getImageUrl(p.productImageUrl)}" style="width:60px; height:60px; border-radius:8px; margin-right:15px; object-fit:cover;">
                        <div>
                            <h4 style="margin: 0 0 5px; font-size: 16px;">${p.name}</h4>
                            <p style="margin: 0; color: #666; font-size: 13px;">Nông dân: ${p.farmerId} | Mã: ${p.batchSerialNumber}</p>
                        </div>
                    </div>
                    <div style="display:flex; gap: 10px;">
                        <button class="btn btn-primary" style="background:#16a34a;" onclick="updateStatus('${p._id}', 'APPROVED')">✅ Duyệt</button>
                        <button class="btn btn-primary" style="background:#dc2626;" onclick="updateStatus('${p._id}', 'REJECTED')">❌ Từ chối</button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error("Lỗi load data admin:", e);
        document.getElementById('pending-list').innerHTML = "❌ Lỗi kết nối server!";
    }
}

// Hàm bắn API duyệt hàng
async function updateStatus(productId, newStatus) {
    if (!confirm(`Xác nhận ${newStatus === 'APPROVED' ? 'DUYỆT' : 'TỪ CHỐI'} lô hàng này?`)) return;
    try {
        const result = await updateProductStatusApi(productId, newStatus);
        if (result.ok) loadApprovalData();
    } catch (error) { alert("Lỗi hệ thống"); }
}

// Khởi động load dữ liệu cho tab đang bật (Tab Users)
loadUserData();
