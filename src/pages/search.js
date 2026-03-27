const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const publicProductList = document.getElementById('public-product-list');

function handleSearch() {
  const batchId = searchInput.value.trim();
  if (!batchId) {
    alert('Vui lòng nhập mã sản phẩm!');
    searchInput.focus();
    return;
  }
  window.location.href = `track.html?id=${batchId}`;
}

async function loadPublicProducts() {
  if (!publicProductList) return;
  publicProductList.innerHTML = '<div class="empty-state">Đang tải dữ liệu...</div>';

  try {
    const response = await fetch('http://localhost:5000/api/v1/products');
    const result = await response.json();

    if (response.ok && result.data.length > 0) {
      publicProductList.innerHTML = '';
      result.data.forEach((product) => {
        const priceVND = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(product.price);

        const item = document.createElement('div');
        item.className = 'list-item';
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          window.location.href = `track.html?id=${product.batchSerialNumber}`;
        });
        item.innerHTML = `
          <img src="http://localhost:5000${product.productImageUrl}" alt="${product.name}" class="list-item__img" loading="lazy" />
          <div class="list-item__meta">
            <p class="list-item__title">${product.name}</p>
            <p class="list-item__desc">Mã: ${product.batchSerialNumber}</p>
          </div>
          <div class="list-item__status" style="background:#e8f5e9; color: var(--primary); border:none;">
            ${priceVND}/${product.unit}
          </div>
        `;
        publicProductList.appendChild(item);
      });
    } else {
      publicProductList.innerHTML = '<div class="empty-state">Chưa có sản phẩm nào.</div>';
    }
  } catch (error) {
    console.error('Lỗi:', error);
    publicProductList.innerHTML = '<div class="empty-state" style="color:red;">Lỗi tải dữ liệu.</div>';
  }
}

searchBtn?.addEventListener('click', handleSearch);
searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
});

loadPublicProducts();
