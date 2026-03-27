// ==========================================
//   SEARCH PAGE - Logic
// ==========================================

let html5QrcodeScanner;

// 1. Tìm bằng cách nhập mã tay
function searchProduct() {
    const id = document.getElementById('batchId').value.trim();
    if (id) window.location.href = `track.html?id=${id}`;
}

// 2. Mở Camera quét mã
function openCamera() {
    document.getElementById('qr-reader-modal').style.display = 'flex';

    // Khởi tạo máy quét
    html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);

    // Hàm chạy khi quét thành công
    html5QrcodeScanner.render(function onScanSuccess(decodedText) {
        closeCamera();
        window.location.href = decodedText;
    }, function onScanFailure(error) {
        // Đang quét... bỏ qua lỗi rác
    });
}

// 3. Tắt Camera
function closeCamera() {
    document.getElementById('qr-reader-modal').style.display = 'none';
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
    }
}
