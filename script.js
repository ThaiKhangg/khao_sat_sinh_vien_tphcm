document.addEventListener('DOMContentLoaded', () => {
    // Fake survey loader
    const fakeLoader = document.getElementById('fake-survey-loader');
    const stepCheckFree = document.getElementById('step-check-free');

    // Sau 0.8s giả vờ tải form, mở ra màn hình rủ bạn
    setTimeout(() => {
        if (fakeLoader) {
            fakeLoader.style.opacity = '0';
            setTimeout(() => {
                fakeLoader.style.display = 'none';
                stepCheckFree.style.display = 'block';
            }, 300);
        } else {
            stepCheckFree.style.display = 'block';
        }
    }, 800);
    const stepInvite = document.getElementById('step-invite');
    const stepTimePicker = document.getElementById('step-time-picker');
    const stepSuccess = document.getElementById('step-success');
    const stepCancelled = document.getElementById('step-cancelled');

    // Nút màn 1
    const btnFree = document.getElementById('btn-free');
    const btnBusy = document.getElementById('btn-busy');

    // Nút màn 2
    const btnAgree = document.getElementById('btn-agree');
    const btnRefuse = document.getElementById('btn-refuse');
    const teaseText = document.getElementById('tease-text');

    // Nút màn 3 & inputs
    const timeBtns = document.querySelectorAll('.time-btn');
    const noteInput = document.getElementById('note-input');
    const btnFinalConfirm = document.getElementById('btn-final-confirm');

    // Màn 4 text
    const successTitle = document.getElementById('success-title');
    const successNoteDisplay = document.getElementById('success-note-display');

    // Modal hỏi chắc chưa
    const busyModal = document.getElementById('busy-modal');
    const modalTitle = document.getElementById('modal-title');
    const btnModalFree = document.getElementById('btn-modal-free');
    const btnModalBusy = document.getElementById('btn-modal-busy');

    let busyCount = 0;
    const busyRounds = [
        {
            title: "M chắc chưa?",
            busyBtnText: "Bận thật mà"
        },
        {
            title: "Suy nghĩ lại đi mà",
            busyBtnText: "Đang bận thiệt ba"
        },
        {
            title: "Không đi được thật à",
            busyBtnText: "Bận lắm không đi được đâu"
        }
    ];

    let selectedTime = "19:30";
    let dodgeCount = 0;
    let isDodgeDisabled = false;

    // ===================================
    // MÀN 1: HỎI RẢNH KHÔNG
    // ===================================
    btnFree.addEventListener('click', () => {
        stepCheckFree.style.display = 'none';
        stepInvite.style.display = 'block';
    });

    btnBusy.addEventListener('click', () => {
        showBusyModal();
    });

    function showBusyModal() {
        if (busyCount < busyRounds.length) {
            const current = busyRounds[busyCount];
            modalTitle.innerText = current.title;
            btnModalBusy.innerText = current.busyBtnText;
            busyModal.style.display = 'flex';
        } else {
            busyModal.style.display = 'none';
            stepCheckFree.style.display = 'none';
            stepCancelled.style.display = 'block';
        }
    }

    // Chọn "Nể lắm t mới đi á nha" -> chuyển sang màn rủ cafe
    btnModalFree.addEventListener('click', () => {
        busyModal.style.display = 'none';
        stepCheckFree.style.display = 'none';
        stepInvite.style.display = 'block';
    });

    // Chọn nút bận -> chuyển sang câu hỏi và nút bận tiếp theo
    btnModalBusy.addEventListener('click', () => {
        busyCount++;
        if (busyCount >= busyRounds.length) {
            busyModal.style.display = 'none';
            stepCheckFree.style.display = 'none';
            stepCancelled.style.display = 'block';
        } else {
            showBusyModal();
        }
    });

    // ===================================
    // MÀN 2: RỦ ĐI CAFE - NÚT NÉ CHUỘT
    // ===================================
    btnAgree.addEventListener('click', () => {
        stepInvite.style.display = 'none';
        stepTimePicker.style.display = 'block';
    });

    function moveRefuseButton() {
        if (isDodgeDisabled) return;

        dodgeCount++;

        // Khi đã né đủ 10 lần -> Dừng né và hiện dòng "Thoi không ghẹo m nữa"
        if (dodgeCount >= 10) {
            isDodgeDisabled = true;
            teaseText.style.display = 'block';
            btnRefuse.style.position = 'static';
            btnRefuse.style.left = 'auto';
            btnRefuse.style.top = 'auto';
            return;
        }

        btnRefuse.style.position = 'fixed';
        
        const btnWidth = btnRefuse.offsetWidth || 80;
        const btnHeight = btnRefuse.offsetHeight || 44;
        
        const maxX = window.innerWidth - btnWidth - 40;
        const maxY = window.innerHeight - btnHeight - 40;
        
        const randomX = Math.max(30, Math.floor(Math.random() * maxX));
        const randomY = Math.max(30, Math.floor(Math.random() * maxY));
        
        btnRefuse.style.left = `${randomX}px`;
        btnRefuse.style.top = `${randomY}px`;
    }

    btnRefuse.addEventListener('mouseenter', moveRefuseButton);
    btnRefuse.addEventListener('touchstart', (e) => {
        if (!isDodgeDisabled) {
            e.preventDefault();
            moveRefuseButton();
        }
    });

    // Khi người dùng bấm nút "ko" sau khi đã dừng né
    btnRefuse.addEventListener('click', () => {
        if (isDodgeDisabled) {
            stepInvite.style.display = 'none';
            stepCancelled.style.display = 'block';
        }
    });

    // ===================================
    // MÀN 3: CHỌN GIỜ BẰNG ĐỒNG HỒ & GHI CHÚ
    // ===================================
    const timePickerInput = document.getElementById('time-picker-input');

    btnFinalConfirm.addEventListener('click', () => {
        const chosenTime = timePickerInput.value || "19:30";
        const note = noteInput.value.trim();
        stepTimePicker.style.display = 'none';
        
        successTitle.innerText = `Oke thế khoảng ${chosenTime} t đón nha`;
        if (note) {
            successNoteDisplay.innerText = `Ghi chú: "${note}"`;
        } else {
            successNoteDisplay.innerText = `Ghi chú: "Chuẩn bị lên đồ nha má!"`;
        }
        
        stepSuccess.style.display = 'block';
    });
});
