const registerForm = document.getElementById('registerForm');
const registerSubmit = document.getElementById('registerSubmit');

function setRegisterState(isLoading) {
  if (!registerSubmit) return;
  registerSubmit.disabled = isLoading;
  registerSubmit.textContent = isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay';
}

registerForm?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  try {
    setRegisterState(true);
    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: name,
        email: email,
        password: password,
        role: 'FARMER',
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Đăng ký thành công! Đang chuyển về trang Đăng nhập...');
      window.location.href = 'login.html';
    } else {
      alert(result.message || 'Không thể đăng ký tài khoản.');
    }
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Không thể kết nối đến máy chủ.');
  } finally {
    setRegisterState(false);
  }
});
