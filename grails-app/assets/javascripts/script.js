document.addEventListener("DOMContentLoaded", function() {
    const timeLeftDisplay = document.getElementById('time-left');
    const timerLabel = document.getElementById('timer-label');
    const startStopButton = document.getElementById('start_stop');
    const resetButton = document.getElementById('reset');
    const breakDecrementButton = document.getElementById('break-decrement');
    const breakLengthDisplay = document.getElementById('break-length');
    const breakIncrementButton = document.getElementById('break-increment');
    const sessionDecrementButton = document.getElementById('session-decrement');
    const sessionLengthDisplay = document.getElementById('session-length');
    const sessionIncrementButton = document.getElementById('session-increment');

    let sessionLengthMinutes = 25;
    let breakLengthMinutes = 5;
    let currentMode = 'Session';
    let currentTimeSeconds = sessionLengthMinutes * 60;
    let timerInterval = null;
    let isTimerRunning = false;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        return `${displayMinutes}:${displaySeconds}`;
    };

    const updateDisplay = () => {
        timeLeftDisplay.textContent = formatTime(currentTimeSeconds);
        timerLabel.textContent = currentMode;
        // Update value di controls
        breakLengthDisplay.textContent = breakLengthMinutes;
        sessionLengthDisplay.textContent = sessionLengthMinutes
    };

    const switchMode = () => {
        currentMode = (currentMode === 'Session') ? 'Break' : 'Session';
        currentTimeSeconds = (currentMode === 'Session' ? sessionLengthMinutes : breakLengthMinutes) * 60;
        updateDisplay();
        // Tidak otomatis start, user harus klik start lagi
        isTimerRunning = true;
        startStopButton.textContent = 'Pause';
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(decrementTime, 1000);
        // suara notifikasi
        playSound();
    };

    const decrementTime = () => {
        if (currentTimeSeconds > 0) {
            currentTimeSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            switchMode();
        }
    };

    const startStopTimer = () => {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            // PAUSE
            timerInterval = null;
            isTimerRunning = false;
            startStopButton.textContent = 'Start';
        } else {
            // START
            isTimerRunning = true;
            startStopButton.textContent = 'Pause';
            // mulai dari mode saat ini
            if (currentTimeSeconds <= 0) {
                currentTimeSeconds = (currentMode === 'Session' ? sessionLengthMinutes : breakLengthMinutes) * 60;
            }
            updateDisplay();
            timerInterval = setInterval(decrementTime, 1000);
        }
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
        currentMode = 'Session';
        //Reset ke value displa, bukan nilai default
        sessionLengthMinutes = parseInt(sessionLengthDisplay.textContent, 10);
        breakLengthMinutes = parseInt(breakLengthDisplay.textContent, 10);
        currentTimeSeconds = sessionLengthMinutes * 60;
        startStopButton.textContent = 'Start';
        updateDisplay();
        stopSound();
    };

    const changeLength = (type, delta) => {
        // timer tidak berubah saat sedang berjalan
        if (isTimerRunning) return;

        let currentLength = (type === 'session') ? sessionLengthMinutes : breakLengthMinutes;
        let newLength = currentLength + delta;

        //batasi 1 - 60
        if (newLength < 1) newLength = 1;
        if (newLength > 60) newLength = 60;

        if (type === 'session') {
            sessionLengthMinutes = newLength;
            sessionLengthDisplay.textContent = newLength;
            if (currentMode === 'Session') {
                currentTimeSeconds = newLength * 60;
                updateDisplay();
            }
        } else {
            breakLengthMinutes = newLength;
            breakLengthDisplay.textContent = newLength;
            if (currentMode === 'Break') {
                currentTimeSeconds = newLength * 60;
                updateDisplay();
            }
        }
    };

    //Event listeners
    startStopButton.addEventListener('click', startStopTimer);
    resetButton.addEventListener('click', resetTimer);

    breakDecrementButton.addEventListener('click', () => changeLength('break', -1));
    breakIncrementButton.addEventListener('click', () => changeLength('break', 1));
    sessionDecrementButton.addEventListener('click', () => changeLength('session', -1));
    sessionIncrementButton.addEventListener('click', () => changeLength('break', 1));

    updateDisplay();
});