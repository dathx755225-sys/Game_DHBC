// Thay thế bằng các đường dẫn hình ảnh thực tế của bạn
const CAU_DO = [
    {
        dap_an: "XE TẢI",
        goi_y: "X _ T _ _",
        hinh_1: "xe_dochoi.jpg", // Tượng trưng cho XE
        hinh_2: "mui_ten_tai.png", // Tượng trưng cho TẢI
        giai_thich: "Xe (đồ chơi) + Tải (mũi tên tải xuống) = XE TẢI"
    },
    {
        dap_an: "GIAO THÔNG",
        goi_y: "G _ _ _ T _ _ _ _",
        hinh_1: "giao_diem.png", // Tượng trưng cho GIAO
        hinh_2: "cay_thong_noel.jpg", // Tượng trưng cho THÔNG
        giai_thich: "Giao (điểm O) + Thông (cây thông) = GIAO THÔNG"
    },
    {
        dap_an: "ĐƯỜNG BỘ",
        goi_y: "Đ _ _ _ _ B _",
        hinh_1: "con_duong.jpg", // Tượng trưng cho ĐƯỜNG
        hinh_2: "nguoi_chay_bo.jpg", // Tượng trưng cho BỘ
        giai_thich: "Đường (nhựa) + Bộ (hành/chạy bộ) = ĐƯỜNG BỘ"
    },
    {
        dap_an: "CAO TỐC",
        goi_y: "C _ _ T _ _ ",
        hinh_1: "huou_cao_co.png", // Tượng trưng cho CAO
        hinh_2: "dong_ho_toc_do.jpg", // Tượng trưng cho TỐC
        giai_thich: "Cao (hươu cao cổ) + Tốc (tốc độ) = CAO TỐC"
    },
    {
        dap_an: "VẬN TẢI",
        goi_y: "V _ _ T _ _",
        hinh_1: "xe_van_chuyen.png", // Tượng trưng cho VẬN
        hinh_2: "bao_tai_xanh.jpg", // Tượng trưng cho TẢI
        giai_thich: "Vận (chuyển) + Tải (bao tải) = VẬN TẢI"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Hàm tải câu hỏi hiện tại lên giao diện
function loadQuestion() {
    if (currentQuestionIndex >= CAU_DO.length) {
        showEndGame();
        return;
    }

    const currentQuestion = CAU_DO[currentQuestionIndex];
    const container = document.getElementById('question-container');
    
    // Tạo nội dung HTML cho hình ảnh và gợi ý
    container.innerHTML = `
        <div class="image-set">
            <div class="image-item">
                <img src="${currentQuestion.hinh_1}" alt="Hình gợi ý 1">
            </div>
            <div class="image-item">
                <img src="${currentQuestion.hinh_2}" alt="Hình gợi ý 2">
            </div>
        </div>
        <div id="hint-text">${currentQuestion.goi_y}</div>
    `;

    // Thiết lập lại trạng thái
    document.getElementById('answer-input').value = '';
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('result-message').className = '';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('input-area').style.display = 'flex';
    answered = false;
}

// Hàm kiểm tra đáp án
function checkAnswer() {
    if (answered) return; 

    const input = document.getElementById('answer-input').value.trim().toUpperCase();
    const currentAnswer = CAU_DO[currentQuestionIndex].dap_an.toUpperCase();
    const resultMessage = document.getElementById('result-message');

    if (input === currentAnswer) {
        resultMessage.innerHTML = `✅ Chính xác! Đáp án là ${currentAnswer}.`;
        resultMessage.className = 'correct';
        score++;
        updateScore();
        answered = true;
        document.getElementById('next-button').style.display = 'block';
        document.getElementById('input-area').style.display = 'none';
    } else {
        resultMessage.innerHTML = `❌ Sai rồi. Thử lại hoặc dùng gợi ý!`;
        resultMessage.className = 'incorrect';
    }
}

// Hàm hiển thị gợi ý (giải thích)
function showHint() {
    const giaiThich = CAU_DO[currentQuestionIndex].giai_thich;
    const resultMessage = document.getElementById('result-message');
    resultMessage.innerHTML = `💡 Gợi ý: ${giaiThich}`;
    resultMessage.className = 'incorrect';
}

// Hàm chuyển sang câu hỏi tiếp theo
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Hàm cập nhật điểm số
function updateScore() {
    document.getElementById('score-board').textContent = `Điểm: ${score}`;
}

// Hàm kết thúc trò chơi
function showEndGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h1>🎉 KẾT THÚC TRÒ CHƠI 🎉</h1>
        <p style="font-size: 1.5em;">Bạn đã hoàn thành tất cả các câu hỏi!</p>
        <p style="font-size: 2em; color: #007bff;">Tổng Điểm: ${score}/${CAU_DO.length}</p>
        <button onclick="location.reload()">Chơi Lại</button>
    `;
}

// Khởi tạo trò chơi khi trang web tải xong
window.onload = loadQuestion;