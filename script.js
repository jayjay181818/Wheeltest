document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const prizePopup = document.getElementById('prizePopup');
    const prizePopupText = document.getElementById('prizePopupText');

    const prizes = ["$100", "$25", "$50", "$75", "$100", "$150"];
    const colors = ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845", "#2ECC71"];

    const totalPrizes = prizes.length;
    const angle = Math.PI * 2 / totalPrizes;
    let currentRotation = 0;

    function adjustCanvasSize() {
        // Determine the maximum size of the canvas based on the viewport, ensuring it's fully visible
        const maxWidth = window.innerWidth * 0.8; // 80% of viewport width
        const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
        const size = Math.min(maxWidth, maxHeight, 500); // Ensure the size does not exceed 500px or the viewport limits
        canvas.width = size;
        canvas.height = size;
    }

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        prizes.forEach((prize, index) => {
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, index * angle + currentRotation, (index + 1) * angle + currentRotation);
            ctx.closePath();
            ctx.fill();

            // Adjust text positioning and size for better visibility
            ctx.fillStyle = 'black';
            ctx.font = `bold ${canvas.width / 25}px Helvetica, Arial`; // Dynamic font size based on canvas size
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(index * angle + angle / 2 + currentRotation);
            ctx.textAlign = 'right';
            ctx.fillText(prize, canvas.width / 2 - 20, 0); // Adjust text position based on canvas size
            ctx.restore();
        });

        drawIndicator();
    }

    function drawIndicator() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 5, 0);
        ctx.lineTo(canvas.width / 2 + 5, 0);
        ctx.lineTo(canvas.width / 2, 20); // Adjust indicator size based on canvas size
        ctx.closePath();
        ctx.fill();
    }

    function spinWheel() {
        const spinDuration = 7000;
        const startTimestamp = performance.now();
        const endAngle = Math.PI * 2 * (5 + Math.random() * 5); // Ensures at least 5 full spins

        const rotateWheel = (timestamp) => {
            const elapsedTime = timestamp - startTimestamp;
            const progress = elapsedTime / spinDuration;
            const easeOutProgress = -(Math.cos(Math.PI * progress) - 1) / 2;

            currentRotation = (easeOutProgress * endAngle) % (2 * Math.PI);

            if (progress < 1) {
                drawWheel();
                requestAnimationFrame(rotateWheel);
            } else {
                currentRotation = endAngle % (2 * Math.PI); // Normalize final angle
                drawWheel();
                const prizeIndex = determinePrize(currentRotation);
                displayPrize(prizeIndex);
            }
        };

        requestAnimationFrame(rotateWheel);
    }

    function determinePrize(finalAngle) {
        const offsetAngle = Math.PI / 2; // Offset to align with the arrow
        finalAngle = (finalAngle + offsetAngle) % (2 * Math.PI);
        let prizeIndex = Math.floor((2 * Math.PI - finalAngle) / angle) % totalPrizes;
        return prizeIndex;
    }

    function displayPrize(prizeIndex) {
        prizePopupText.textContent = `Congratulations! You won ${prizes[prizeIndex]}`;
        prizePopup.style.display = "flex";
    }

    spinButton.addEventListener('click', () => {
        prizePopup.style.display = 'none';
        currentRotation = 0; // Reset for a new spin
        spinWheel();
    });

    prizePopup.addEventListener('click', () => {
        prizePopup.style.display = 'none';
    });

    window.addEventListener('resize', adjustCanvasSize);
    adjustCanvasSize(); // Adjust the canvas size initially
    drawWheel(); // Draw the wheel initially
});