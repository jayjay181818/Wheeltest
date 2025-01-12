document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const prizePopup = document.getElementById('prizePopup');
    const prizePopupText = document.getElementById('prizePopupText');

    if (!canvas || !ctx || !spinButton || !prizePopup || !prizePopupText) {
        console.error('One or more required elements are missing.');
        return;
    }

    const prizes = ["$100", "$25", "$50", "$75", "$100", "$150"];
    const colors = ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845", "#2ECC71"];
    const totalPrizes = prizes.length;
    const angle = Math.PI * 2 / totalPrizes;
    let currentRotation = 0;

    function adjustCanvasSize() {
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const size = Math.min(maxWidth, maxHeight, 500);
        canvas.width = size;
        canvas.height = size;
    }

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        prizes.forEach((prize, index) => {
            const startAngle = index * angle + currentRotation;
            const endAngle = (index + 1) * angle + currentRotation;

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, colors[index]);
            gradient.addColorStop(1, 'white');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();

            // Add text shadow for better readability
            ctx.fillStyle = 'white';
            ctx.font = `bold ${canvas.width / 20}px Poppins, sans-serif`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(startAngle + angle / 2);
            ctx.textAlign = 'right';
            ctx.fillText(prize, canvas.width / 2 - 20, 0);
            ctx.restore();
        });

        drawIndicator();
    }

    function drawIndicator() {
        // Create a larger, more visible indicator
        ctx.fillStyle = '#FF6B6B';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 15, 0);
        ctx.lineTo(canvas.width / 2 + 15, 0);
        ctx.lineTo(canvas.width / 2, 30);
        ctx.closePath();
        ctx.fill();
        
        // Add a subtle border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }

    function spinWheel() {
        const spinDuration = 7000;
        const startTimestamp = performance.now();
        const endAngle = Math.PI * 2 * (5 + Math.random() * 5);

        const rotateWheel = (timestamp) => {
            const elapsedTime = timestamp - startTimestamp;
            const progress = elapsedTime / spinDuration;
            const easeOutProgress = -(Math.cos(Math.PI * progress) - 1) / 2;
            currentRotation = easeOutProgress * endAngle;

            drawWheel();

            if (progress < 1) {
                requestAnimationFrame(rotateWheel);
            } else {
                showPrize();
            }
        };

        requestAnimationFrame(rotateWheel);
    }

    function showPrize() {
        const prizeIndex = Math.floor((totalPrizes - (currentRotation % (Math.PI * 2)) / angle) % totalPrizes);
        prizePopupText.textContent = `You won ${prizes[prizeIndex]}!`;
        prizePopup.style.display = 'block';
    }

    spinButton.addEventListener('click', spinWheel);
    window.addEventListener('resize', adjustCanvasSize);

    adjustCanvasSize();
    drawWheel();
});
