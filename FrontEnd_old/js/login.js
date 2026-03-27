// ==========================================
//   LOGIN PAGE - Logic
// ==========================================

let isAdminMode = false;

// --- CẤU HÌNH TÀI KHOẢN ADMIN TẠI ĐÂY ---
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASS = "admintest";

function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    const body = document.getElementById('body-theme');

    if (isAdminMode) {
        // 1. ĐỔI SANG GIAO DIỆN ADMIN
        body.className = 'theme-admin';
        document.getElementById('logo-icon').innerText = '🛡️';
        document.getElementById('form-title').innerText = 'Admin Central';
        document.getElementById('form-subtitle').innerText = 'Đăng nhập Cổng Quản trị Hệ thống';

        // 2. Tự động điền Email và khóa lại
        const emailInput = document.getElementById('email');
        emailInput.value = ADMIN_EMAIL;
        emailInput.readOnly = true;
        emailInput.style.backgroundColor = "#f8f9fa";
        emailInput.style.color = "#8b5cf6";
        emailInput.style.fontWeight = "bold";

        // 3. Tự động điền luôn Mật khẩu
        const passInput = document.getElementById('password');
        passInput.value = ADMIN_PASS;

        // Focus sẵn vào nút Đăng nhập để Enter là vào
        document.getElementById('login-btn').focus();

        document.getElementById('toggle-btn').innerText = '← Quay lại Cổng Nông dân';
    } else {
        // TRẢ VỀ GIAO DIỆN NÔNG DÂN
        body.className = 'theme-farmer';
        document.getElementById('logo-icon').innerText = '🍃';
        document.getElementById('form-title').innerText = 'Quản lý Nông sản';
        document.getElementById('form-subtitle').innerText = 'Đăng nhập dành cho Nông dân';

        // Xóa trống Form
        const emailInput = document.getElementById('email');
        emailInput.value = '';
        emailInput.readOnly = false;
        emailInput.style.backgroundColor = "white";
        emailInput.style.color = "#333";
        emailInput.style.fontWeight = "normal";

        document.getElementById('password').value = '';

        document.getElementById('toggle-btn').innerHTML = '🛡️ Chuyển sang Cổng Quản trị viên';
    }
}

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ email và mật khẩu!");
        return;
    }

    try {
        const btn = document.getElementById('login-btn');
        btn.innerText = "Đang xử lý...";

        const result = await loginApi(email, password);

        if (result.ok) {
            localStorage.setItem('user', JSON.stringify(result.data.data));
            // Điều hướng tự động dựa vào Role trả về từ DB
            if (result.data.data.role === 'ADMIN') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            alert(result.data.message);
            btn.innerText = "➔ Đăng nhập";
        }
    } catch (error) {
        alert("Lỗi kết nối Server! Vui lòng kiểm tra lại Backend.");
        document.getElementById('login-btn').innerText = "➔ Đăng nhập";
    }
}
