// ==========================================
//   TRACK PAGE - Logic (Tra cứu sản phẩm)
// ==========================================

// Lấy mã lô hàng từ URL (?id=BAT-XXXXXX)
const urlParams = new URLSearchParams(window.location.search);
const batchId = urlParams.get('id');

async function loadTrackingData() {
    const loadingEl = document.getElementById('loading');
    const detailsEl = document.getElementById('product-details');
    const errorEl = document.getElementById('error-message');

    if (!batchId) {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.innerText = 'Không có mã lô hàng trong đường dẫn!';
        return;
    }

    try {
        const result = await trackProductApi(batchId);

        loadingEl.style.display = 'none';

        if (result.ok) {
            const product = result.data.data;
            detailsEl.style.display = 'block';

            document.getElementById('p-image').src = getImageUrl(product.productImageUrl);
            document.getElementById('p-name').innerText = product.name;
            document.getElementById('p-batch').innerText = product.batchSerialNumber;
            document.getElementById('p-farmer').innerText = product.farmerId;
            document.getElementById('p-quantity').innerText = `${product.quantity} ${product.unit}`;
            document.getElementById('p-price').innerText = `${product.price.toLocaleString()}đ`;
            document.getElementById('p-date').innerText = new Date(product.createdAt).toLocaleDateString('vi-VN');
        } else {
            errorEl.style.display = 'block';
        }
    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.innerText = 'Lỗi kết nối server! Vui lòng thử lại.';
    }
}

loadTrackingData();
