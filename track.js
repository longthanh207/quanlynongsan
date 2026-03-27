// File: track.js

// 1. Lấy mã ID lô hàng từ trên thanh URL của trình duyệt 
const urlParams = new URLSearchParams(window.location.search);
const batchId = urlParams.get('id');

const loadingDiv = document.getElementById('loading');
const detailsDiv = document.getElementById('product-details');
const errorDiv = document.getElementById('error-message');

// Hàm chạy ngay khi mở trang
async function fetchProductDetails() {
    // Nếu không có mã ID trên URL -> Báo lỗi luôn
    if (!batchId) {
        loadingDiv.style.display = 'none';
        errorDiv.innerText = "Mã QR không hợp lệ hoặc thiếu mã sản phẩm!";
        errorDiv.style.display = 'block';
        return;
    }

    try {
        // 2. GỌI API XUỐNG BACKEND để hỏi thông tin lô hàng này
        const response = await fetch(`http://localhost:5000/api/v1/consume/track/${batchId}`);
        const result = await response.json();

        // Tắt chữ "Đang tải..."
        loadingDiv.style.display = 'none';

        if (response.ok) {
            // 3. ĐIỀN DỮ LIỆU VÀO GIAO DIỆN
            const data = result.data;
            
            // Link ảnh từ backend trả về phải cộng thêm http://localhost:5000
            document.getElementById('p-image').src = `http://localhost:5000${data.productImageUrl}`;
            document.getElementById('p-name').innerText = data.productName;
            document.getElementById('p-batch').innerText = data.batchSerialNumber;
            
            // Nếu có mã nông dân thì hiển thị, không thì để trống
            document.getElementById('p-farmer').innerText = data.farmerId || 'Đang cập nhật';
            document.getElementById('p-quantity').innerText = `${data.quantity} ${data.unit}`;
            
            // Format tiền tệ VNĐ cho đẹp
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price);
            document.getElementById('p-price').innerText = formattedPrice;

            // Format ngày tháng năm
            const dateObj = new Date(data.createdAt);
            document.getElementById('p-date').innerText = dateObj.toLocaleDateString('vi-VN');

            // Hiển thị khung thông tin lên
            detailsDiv.style.display = 'block';
        } else {
            // Nếu API báo lỗi (không tìm thấy mã)
            errorDiv.innerText = result.message || "Không tìm thấy thông tin lô hàng này!";
            errorDiv.style.display = 'block';
        }

    } catch (error) {
        console.error("Lỗi:", error);
        loadingDiv.style.display = 'none';
        errorDiv.innerText = "Lỗi kết nối đến máy chủ! Vui lòng kiểm tra xem Backend (cổng 5000) đã chạy chưa.";
        errorDiv.style.display = 'block';
    }
}

// Chạy hàm
fetchProductDetails();