import { useState, useCallback } from 'react';
import { getDiariesApi, createDiaryApi } from '../services/api';

export function useDiary(farmerId) {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDiaries = useCallback(async () => {
    if (!farmerId) return;
    setLoading(true);
    try {
      const result = await getDiariesApi(farmerId);
      if (result.status === 'success') {
        setDiaries(result.data || []);
      }
    } catch (e) {
      console.error('Lỗi tải nhật ký:', e);
    } finally {
      setLoading(false);
    }
  }, [farmerId]);

  const addDiary = async (data) => {
    try {
      const result = await createDiaryApi(data);
      if (result.ok) {
        alert('Đã thêm nhật ký thành công!');
        loadDiaries(); // re-fetch locally
        return true;
      } else {
        alert(result.data.message || 'Thêm nhật ký thất bại');
        return false;
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối Server');
      return false;
    }
  };

  return { diaries, loading, loadDiaries, addDiary };
}
