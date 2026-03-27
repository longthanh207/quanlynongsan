// ==========================================
//   API SERVICE - Tập trung tất cả API calls
// ==========================================

const API_BASE = 'http://localhost:5000';

// ===== AUTH =====

export async function loginApi(email, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

export async function registerApi(fullName, email, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

// ===== PRODUCTS =====

export async function getProductsApi() {
  const response = await fetch(`${API_BASE}/api/v1/products`);
  const result = await response.json();
  return result;
}

export async function createProductApi(formData) {
  const response = await fetch(`${API_BASE}/api/v1/farmer/products`, {
    method: 'POST',
    body: formData
  });
  return { ok: response.ok };
}

// ===== CONSUMER =====

export async function trackProductApi(batchSerial) {
  const response = await fetch(`${API_BASE}/api/v1/consume/track/${batchSerial}`);
  const result = await response.json();
  return { ok: response.ok, data: result };
}

// ===== ADMIN =====

export async function getPendingProductsApi() {
  const response = await fetch(`${API_BASE}/api/v1/admin/products/pending`);
  const result = await response.json();
  return result;
}

export async function updateProductStatusApi(productId, newStatus) {
  const response = await fetch(`${API_BASE}/api/v1/admin/products/${productId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  return { ok: response.ok };
}

export async function getUsersApi() {
  const response = await fetch(`${API_BASE}/api/v1/admin/users`);
  const result = await response.json();
  return result;
}

// Helper: Tạo đường dẫn đầy đủ cho ảnh từ server
export function getImageUrl(path) {
  return `${API_BASE}${path}`;
}

// ===== DIARY =====

export async function createDiaryApi(data) {
  const response = await fetch(`${API_BASE}/api/v1/farmer/diary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

export async function getDiariesApi(farmerId) {
  const response = await fetch(`${API_BASE}/api/v1/farmer/diary?farmerId=${farmerId}`);
  const result = await response.json();
  return result;
}

// ===== SETTINGS =====

export async function changeEmailApi(userId, newEmail) {
  const response = await fetch(`${API_BASE}/api/v1/users/settings/email`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, newEmail })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

export async function changePasswordApi(userId, newPassword) {
  const response = await fetch(`${API_BASE}/api/v1/users/settings/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, newPassword })
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}

export async function deleteAccountApi(userId) {
  const response = await fetch(`${API_BASE}/api/v1/users/settings/account/${userId}`, {
    method: 'DELETE'
  });
  const result = await response.json();
  return { ok: response.ok, data: result };
}
