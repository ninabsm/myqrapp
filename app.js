// 1. QR 코드 객체 생성 (이미지 옵션 제거)
const qrCode = new QRCodeStyling({
    width: 280,
    height: 280,
    data: "https://google.com",
    dotsOptions: {
        type: "extra-rounded", // 점 모양: 'rounded', 'dots', 'classy', 'square' 등 선택 가능
        color: "#2d3436"
    },
    backgroundOptions: {
        color: "#ffffff",
    }
});

window.onload = () => {
    const qrTarget = document.getElementById("qrcode");
    if (qrTarget) {
        qrCode.append(qrTarget);
    }

    const textInput = document.getElementById('text-input');
    const ssidInput = document.getElementById('wifi-ssid');
    const pwInput = document.getElementById('wifi-pw');

    // QR 업데이트 핵심 로직
    function updateQR() {
        // 현재 어떤 입력창이 보이는지 확인하여 모드 판단
        const isWifiVisible = !document.getElementById('input-wifi-container').classList.contains('hidden');
        let finalData = "";

        if (!isWifiVisible) {
            finalData = textInput.value;
        } else {
            const ssid = ssidInput.value;
            const pw = pwInput.value;
            // 와이파이는 SSID가 있어야 생성
            if (ssid) {
                finalData = `WIFI:S:${ssid};T:WPA;P:${pw};;`;
            }
        }

        // 데이터가 있을 때만 업데이트 (빈 값일 때 에러 방지)
        if (finalData.trim() !== "") {
            qrCode.update({ data: finalData });
        }
    }

    // 모든 입력창에 이벤트 연결
    [textInput, ssidInput, pwInput].forEach(el => {
        el.addEventListener('input', updateQR);
    });
};

// 모드 전환 함수
function switchMode(mode) {
    const isWifi = mode === 'wifi';
    
    // 입력창 토글
    document.getElementById('input-text-container').classList.toggle('hidden', isWifi);
    document.getElementById('input-wifi-container').classList.toggle('hidden', !isWifi);
    
    // 탭 디자인 토글
    const tabText = document.getElementById('tab-text');
    const tabWifi = document.getElementById('tab-wifi');
    
    if (isWifi) {
        tabWifi.className = 'flex-1 py-2 font-bold border-b-2 border-blue-600 text-blue-600';
        tabText.className = 'flex-1 py-2 font-bold text-gray-500';
    } else {
        tabText.className = 'flex-1 py-2 font-bold border-b-2 border-blue-600 text-blue-600';
        tabWifi.className = 'flex-1 py-2 font-bold text-gray-500';
    }
}

// 다운로드 기능
function downloadQR() {
    qrCode.download({ name: "my-qrcode", extension: "png" });
}