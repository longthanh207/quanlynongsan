// ==========================================
//   DASHBOARD PAGE - Logic (Nông dân)
// ==========================================

const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'login.html';
document.getElementById('userName').innerText = user.fullName;

function logout() { localStorage.clear(); window.location.href = 'login.html'; }
function openModal() { document.getElementById('addModal').style.display = 'flex'; }
function closeModal() { document.getElementById('addModal').style.display = 'none'; }

function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
}

async function loadDashboard() {
    try {
        const result = await getProductsApi();
        const products = result.data;

        // Thống kê
        document.getElementById('stat-total').innerText = products.length;
        document.getElementById('stat-pending').innerText = products.filter(p => p.status === 'PENDING').length;
        document.getElementById('stat-approved').innerText = products.filter(p => p.status === 'APPROVED').length;
        document.getElementById('stat-rejected').innerText = products.filter(p => p.status === 'REJECTED').length;

        let gridHtml = '';

        products.forEach(p => {
            let badgeClass = 'badge-pending';
            let statusLabel = '⏳ Chờ duyệt';
            if (p.status === 'APPROVED') { badgeClass = 'badge-approved'; statusLabel = '✅ Đã duyệt'; }
            if (p.status === 'REJECTED') { badgeClass = 'badge-rejected'; statusLabel = '❌ Từ chối'; }

            // Card cho Tab Sản phẩm
            gridHtml += `
                <div class="product-card">
                    <span class="badge ${badgeClass}">${statusLabel}</span>
                    <img src="${getImageUrl(p.productImageUrl)}">
                    <div class="card-body">
                        <h4 style="margin:0;">${p.name}</h4>
                        <p style="font-size:13px; color:#666; margin: 5px 0;">SL: ${p.quantity} ${p.unit} | Mã: ${p.batchSerialNumber}</p>
                        <div style="display:flex; justify-content: space-between; align-items: center; margin-top:10px;">
                            <span style="font-weight:bold; color:#00a65a;">${p.price.toLocaleString()}đ</span>
                            ${p.status === 'APPROVED' ? `<img src="${getImageUrl(p.qrCodeImageUrl)}" width="30">` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById('grid-container').innerHTML = gridHtml;
        document.getElementById('recent-list').innerHTML = "Dữ liệu đã được cập nhật!";
    } catch (e) { console.error(e); }
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('farmerName', user.fullName);

    try {
        const result = await createProductApi(formData);
        if (result.ok) {
            alert("Đã gửi lô hàng! Chờ Admin phê duyệt.");
            closeModal();
            loadDashboard();
        }
    } catch (err) { alert("Lỗi server"); }
});

loadDashboard();
