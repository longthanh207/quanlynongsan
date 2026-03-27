// ==========================================
//   REGISTER PAGE - Logic
// ==========================================

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    try {
        const btn = e.target.querySelector('button');
        btn.innerText = "Đang xử lý...";
        btn.disabled = true;

        // GỌI API ĐĂNG KÝ
        const result = await registerApi(fullName, email, password);

        if (result.ok) {
            alert("Đăng ký thành công! Đang chuyển về trang Đăng nhập...");
            window.location.href = 'login.html';
        } else {
            alert(result.data.message);
        }
    } catch (error) {
        alert("Không thể kết nối đến Server! Vui lòng kiểm tra xem Backend đã chạy chưa.");
    } finally {
        const btn = e.target.querySelector('button');
        btn.innerText = "Đăng ký tài khoản";
        btn.disabled = false;
    }
});
