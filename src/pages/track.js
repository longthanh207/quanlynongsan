// File: src/pages/track.js

const urlParams = new URLSearchParams(window.location.search);
const batchId = urlParams.get('id');

const loadingDiv = document.getElementById('loading');
const detailsDiv = document.getElementById('product-details');
const errorDiv = document.getElementById('error-message');

async function fetchProductDetails() {
  if (!batchId) {
    loadingDiv.style.display = 'none';
    errorDiv.innerText = 'Mã QR không hợp lệ hoặc thiếu mã sản phẩm!';
    errorDiv.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/v1/consume/track/${batchId}`);
    const result = await response.json();

    loadingDiv.style.display = 'none';

    if (response.ok) {
      const data = result.data;
      document.getElementById('p-image').src = `http://localhost:5000${data.productImageUrl}`;
      document.getElementById('p-name').innerText = data.productName;
      document.getElementById('p-batch').innerText = data.batchSerialNumber;
      document.getElementById('p-farmer').innerText = data.farmerId || 'Đang cập nhật';
      document.getElementById('p-quantity').innerText = `${data.quantity} ${data.unit}`;

      const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price);
      document.getElementById('p-price').innerText = formattedPrice;

      const dateObj = new Date(data.createdAt);
      document.getElementById('p-date').innerText = dateObj.toLocaleDateString('vi-VN');

      detailsDiv.style.display = 'block';
    } else {
      errorDiv.innerText = result.message || 'Không tìm thấy thông tin lô hàng này!';
      errorDiv.style.display = 'block';
    }
  } catch (error) {
    console.error('Lỗi:', error);
    loadingDiv.style.display = 'none';
    errorDiv.innerText = 'Lỗi kết nối đến máy chủ! Vui lòng kiểm tra xem Backend (cổng 5000) đã chạy chưa.';
    errorDiv.style.display = 'block';
  }
}

fetchProductDetails();
