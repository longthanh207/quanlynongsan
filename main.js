const productForm = document.getElementById('productForm');
const resultBox = document.getElementById('result-box');


productForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const formData = new FormData(productForm);

    try {
        const submitBtn = productForm.querySelector('button');
        submitBtn.innerText = "Đang xử lý...";
        submitBtn.disabled = true;

        const response = await fetch('http://localhost:5000/api/v1/farmer/products', {
            method: 'POST',
            body: formData 
        });

        const resultData = await response.json();

        if (response.ok) {
            document.getElementById('batch-id').innerText = resultData.data.batchSerialNumber;

            const qrImageUrl = 'http://localhost:5000' + resultData.data.qrCodeImageUrl;
            document.getElementById('qr-image').src = qrImageUrl;

            resultBox.style.display = 'block';
            
            productForm.reset(); 
        } else {
            alert("Lỗi từ server: " + resultData.message);
        }

    } catch (error) {
        console.error("Lỗi kết nối:", error);
        alert("Không thể kết nối đến Backend. Hãy chắc chắn Server đang chạy!");
    } finally {
    
        const submitBtn = productForm.querySelector('button');
        submitBtn.innerText = "Tạo Lô Hàng & Sinh Mã QR";
        submitBtn.disabled = false;
    }
});

// === CODE HIỂN THỊ DANH SÁCH CHO NÔNG DÂN ===

async function loadFarmerProducts() {
    // (Lưu ý: Bạn cần tạo một <div id="farmer-product-list"></div> trong file index.html để chứa nó nhé)
    const listContainer = document.getElementById('farmer-product-list');
    if (!listContainer) return; // Nếu không có thẻ div này thì bỏ qua

    try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const result = await response.json();

        if (response.ok) {
            listContainer.innerHTML = ''; // Xóa sạch dữ liệu cũ

            result.data.forEach(product => {
                const priceVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
                
                // Cấu trúc HTML giống Figma phần "Sản phẩm gần đây"
                const itemHtml = `
                    <div style="display: flex; align-items: center; padding: 15px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 10px; background: white;">
                        <img src="http://localhost:5000${product.productImageUrl}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 5px;">${product.name}</div>
                            <div style="color: #666; font-size: 14px;">${product.quantity} ${product.unit} - ${priceVND}/${product.unit}</div>
                        </div>
                        <div>
                            <span style="padding: 5px 12px; background-color: #e8f5e9; color: #00a65a; border-radius: 20px; font-size: 13px; font-weight: bold;">
                                ${product.status === 'PENDING' ? 'Chờ duyệt' : 'Đã duyệt'}
                            </span>
                        </div>
                    </div>
                `;
                listContainer.innerHTML += itemHtml;
            });
        }
    } catch (error) {
        console.error("Lỗi tải danh sách nông dân:", error);
    }
}

// Gọi hàm tải danh sách khi vừa mở trang
loadFarmerProducts();