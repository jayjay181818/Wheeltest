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

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        prizes.forEach((prize, index) => {
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 250, index * angle + currentRotation, (index + 1) * angle + currentRotation);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.font = 'bold 14px Helvetica, Arial';
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(index * angle + angle / 2 + currentRotation);
            ctx.textAlign = 'right';
            ctx.fillText(prize, 230, 0);
            ctx.restore();
        });

        drawIndicator();
    }

    function drawIndicator() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(245, 0);
        ctx.lineTo(255, 0);
        ctx.lineTo(250, 20);
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
        prizePopupText.textContent = `Beta, tribute me now... ${prizes[prizeIndex]}`;
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

    drawWheel(); // Initial draw of the wheel
});
