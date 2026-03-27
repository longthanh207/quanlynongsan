import { useState } from 'react';
import { changeEmailApi, changePasswordApi, deleteAccountApi } from '../services/api';
import { useAuth } from './useAuth';

export function useSettings() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const changeEmail = async (userId) => {
    const newEmail = prompt('Nhập Email mới của bạn:');
    if (!newEmail) return;

    setLoading(true);
    try {
      const result = await changeEmailApi(userId, newEmail);
      if (result.ok) {
        alert('Đổi Email thành công! Vui lòng đăng nhập lại.');
        logout();
      } else {
        alert(result.data.message || 'Lỗi đổi email');
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối Server');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (userId) => {
    const newPassword = prompt('Nhập Mật khẩu mới của bạn:');
    if (!newPassword || newPassword.length < 6) {
      alert('Mật khẩu quá ngắn hoặc không lặp lệ.');
      return;
    }

    setLoading(true);
    try {
      const result = await changePasswordApi(userId, newPassword);
      if (result.ok) {
        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
        logout();
      } else {
        alert(result.data.message || 'Lỗi đổi mật khẩu');
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối Server');
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (userId) => {
    if (!window.confirm('CẢNH BÁO NGUY HIỂM\n\nTài khoản của bạn và mọi dữ liệu liên quan sẽ MẤT VĨNH VIỄN!\nBạn có chắc chắn muốn xóa tài khoản không?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteAccountApi(userId);
      if (result.ok) {
        alert('Tài khoản đã bị xóa thành công khỏi hệ thống.');
        logout();
      } else {
        alert(result.data.message || 'Lỗi khi yêu cầu xóa');
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối Server');
    } finally {
      setLoading(false);
    }
  };

  return { loading, changeEmail, changePassword, deleteAccount };
}
