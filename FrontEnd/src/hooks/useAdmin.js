import { useState, useCallback } from 'react';
import { getUsersApi, getPendingProductsApi, updateProductStatusApi } from '../services/api';

export function useAdmin() {
  const [users, setUsers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const result = await getUsersApi();
      setUsers(result.data || []);
    } catch (error) {
      console.error('Lỗi:', error);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const loadPendingProducts = useCallback(async () => {
    setLoadingPending(true);
    try {
      const result = await getPendingProductsApi();
      setPendingProducts(result.data || []);
    } catch (e) {
      console.error('Lỗi load data admin:', e);
    } finally {
      setLoadingPending(false);
    }
  }, []);

  const updateStatus = async (productId, newStatus) => {
    const label = newStatus === 'APPROVED' ? 'DUYỆT' : 'TỪ CHỐI';
    if (!window.confirm(`Xác nhận ${label} lô hàng này?`)) return;
    try {
      const result = await updateProductStatusApi(productId, newStatus);
      if (result.ok) loadPendingProducts();
    } catch {
      alert('Lỗi hệ thống');
    }
  };

  return {
    users, pendingProducts,
    loadingUsers, loadingPending,
    loadUsers, loadPendingProducts, updateStatus
  };
}
