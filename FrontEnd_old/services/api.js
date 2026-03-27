// ==========================================
//   API SERVICE - Tập trung tất cả API calls
// ==========================================

const API_BASE = 'http://localhost:5000';

// ===== AUTH =====

async function loginApi(email, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

async function registerApi(fullName, email, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

// ===== PRODUCTS =====

async function getProductsApi() {
  const response = await fetch(`${API_BASE}/api/v1/products`);
  const result = await response.json();
  return result;
}

async function createProductApi(formData) {
  const response = await fetch(`${API_BASE}/api/v1/farmer/products`, {
    method: 'POST',
    body: formData
  });
  return { ok: response.ok };
}

// ===== CONSUMER =====

async function trackProductApi(batchSerial) {
  const response = await fetch(`${API_BASE}/api/v1/consume/track/${batchSerial}`);
  const result = await response.json();
  return { ok: response.ok, data: result };
}

// ===== ADMIN =====

async function getPendingProductsApi() {
  const response = await fetch(`${API_BASE}/api/v1/admin/products/pending`);
  const result = await response.json();
  return result;
}

async function updateProductStatusApi(productId, newStatus) {
  const response = await fetch(`${API_BASE}/api/v1/admin/products/${productId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  return { ok: response.ok };
}

async function getUsersApi() {
  const response = await fetch(`${API_BASE}/api/v1/admin/users`);
  const result = await response.json();
  return result;
}

// Helper: Tạo đường dẫn đầy đủ cho ảnh từ server
function getImageUrl(path) {
  return `${API_BASE}${path}`;
}
