const productForm = document.getElementById('productForm');
const resultBox = document.getElementById('result-box');
const submitBtn = productForm?.querySelector('button');
const productList = document.getElementById('farmer-product-list');

function setSubmitting(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.setAttribute('aria-busy', String(isLoading));
  submitBtn.textContent = isLoading ? 'Đang xử lý...' : 'Tạo lô hàng & sinh mã QR';
}

async function handleCreateProduct(event) {
  event.preventDefault();
  const formData = new FormData(productForm);
  try {
    setSubmitting(true);
    const response = await fetch('http://localhost:5000/api/v1/farmer/products', {
      method: 'POST',
      body: formData,
    });

    const resultData = await response.json();

    if (response.ok) {
      document.getElementById('batch-id').innerText = resultData.data.batchSerialNumber;
      const qrImageUrl = 'http://localhost:5000' + resultData.data.qrCodeImageUrl;
      document.getElementById('qr-image').src = qrImageUrl;
      resultBox.style.display = 'block';
      productForm.reset();
      await loadFarmerProducts();
    } else {
      alert('Lỗi từ server: ' + (resultData.message || 'Không xác định'));
    }
  } catch (error) {
    console.error('Lỗi kết nối:', error);
    alert('Không thể kết nối đến Backend. Hãy chắc chắn Server đang chạy!');
  } finally {
    setSubmitting(false);
  }
}

productForm?.addEventListener('submit', handleCreateProduct);

async function loadFarmerProducts() {
  if (!productList) return;
  productList.innerHTML = '<div class="empty-state">Đang tải dữ liệu sản phẩm...</div>';

  try {
    const response = await fetch('http://localhost:5000/api/v1/products');
    const result = await response.json();

    if (response.ok) {
      if (!result.data.length) {
        productList.innerHTML = '<div class="empty-state">Chưa có sản phẩm nào.</div>';
        return;
      }

      productList.innerHTML = '';
      result.data.forEach((product) => {
        const priceVND = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(product.price);

        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
          <img src="http://localhost:5000${product.productImageUrl}" alt="${product.name}" class="list-item__img" loading="lazy" />
          <div class="list-item__meta">
            <p class="list-item__title">${product.name}</p>
            <p class="list-item__desc">${product.quantity} ${product.unit} • ${priceVND}/${product.unit}</p>
          </div>
          <span class="list-item__status">
            ${product.status === 'PENDING' ? 'Chờ duyệt' : 'Đã duyệt'}
          </span>
        `;
        productList.appendChild(item);
      });
    } else {
      productList.innerHTML = '<div class="empty-state">Không thể tải danh sách.</div>';
    }
  } catch (error) {
    console.error('Lỗi tải danh sách nông dân:', error);
    productList.innerHTML = '<div class="empty-state">Lỗi tải dữ liệu.</div>';
  }
}

loadFarmerProducts();
