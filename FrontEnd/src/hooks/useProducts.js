import { useState, useEffect, useCallback } from 'react';
import { getProductsApi, createProductApi } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProductsApi();
      setProducts(result.data || []);
    } catch (e) {
      console.error('Lỗi load products:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const createProduct = async (formData) => {
    try {
      const result = await createProductApi(formData);
      if (result.ok) {
        alert('Đã gửi lô hàng! Chờ Admin phê duyệt.');
        loadProducts();
        return true;
      }
    } catch {
      alert('Lỗi server');
    }
    return false;
  };

  // Tính thống kê
  const stats = {
    total: products.length,
    pending: products.filter(p => p.status === 'PENDING').length,
    approved: products.filter(p => p.status === 'APPROVED').length,
    rejected: products.filter(p => p.status === 'REJECTED').length,
  };

  return { products, stats, loading, loadProducts, createProduct };
}
