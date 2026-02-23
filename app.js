const textInput = document.getElementById('text-input');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

// QR 코드 객체 초기화
const qrcode = new QRCode(qrContainer, {
    width: 400,
    height: 400,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

// 입력값이 바뀔 때마다 실행
textInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    if (value.trim()) {
        qrcode.makeCode(value);
        downloadBtn.classList.remove('hidden');
    } else {
        qrContainer.innerHTML = ""; // 입력창 비면 QR 삭제
        downloadBtn.classList.add('hidden');
    }
});

// 이미지 다운로드 기능
function downloadQR() {
    const img = qrContainer.querySelector('img');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'my-qrcode.png';
        link.click();
    }
}

