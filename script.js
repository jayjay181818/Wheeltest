document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const prizePopup = document.getElementById('prizePopup');
    const prizePopupText = document.getElementById('prizePopupText');

    prizePopup.style.display = 'none';

    const prizes = ["$100", "$25", "$50", "$75", "$100", "$150"];
    const colors = ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845", "#2ECC71"];
    let currentRotation = 0;
    const totalPrizes = prizes.length;
    const angle = Math.PI * 2 / totalPrizes; // Angle for each segment

    function adjustCanvasSize() {
        canvas.width = window.innerWidth * 0.75;
        canvas.height = canvas.width; // Keep the wheel circular
        drawWheel();
        positionSpinButton();
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

            // Draw prize text
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(index * angle + angle / 2 + currentRotation);
            ctx.textAlign = 'right';
            ctx.font = '16px Arial';
            ctx.fillText(prize, canvas.width / 2 - 10, 0);
            ctx.restore();
        });
        drawArrow();
    }

    function drawArrow() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 10, 0);
        ctx.lineTo(canvas.width / 2 + 10, 0);
        ctx.lineTo(canvas.width / 2, 20);
        ctx.closePath();
        ctx.fill();
    }

    function positionSpinButton() {
        spinButton.style.position = 'absolute';
        spinButton.style.left = `${canvas.offsetLeft + (canvas.width / 2) - (spinButton.offsetWidth / 2)}px`;
        spinButton.style.top = `${canvas.offsetTop + (canvas.height / 2) - (spinButton.offsetHeight / 2)}px`;
    }

    function spinWheel() {
        let startTimestamp;
        const spinDuration = 5000; // Ensure the spin lasts exactly 5 seconds
        const rotations = Math.random() * 10 + 5; // Random rotations between 5 and 15
        const endRotation = currentRotation + rotations * Math.PI * 2; // Calculate end rotation for a full spin

        function animateSpin(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsedTime = timestamp - startTimestamp;
            const progress = elapsedTime / spinDuration;

            if (progress < 1) {
                const easeOutProgress = 1 - (1 - progress) ** 3; // Ease-out effect for smooth ending
                currentRotation = (endRotation * easeOutProgress) % (Math.PI * 2);
                drawWheel();
                requestAnimationFrame(animateSpin);
            } else {
                // Finalize the spin
                currentRotation = endRotation % (Math.PI * 2);
                drawWheel();
                const prizeIndex = calculatePrizeIndex(currentRotation);
                displayPrize(prizeIndex);
            }
        }

        requestAnimationFrame(animateSpin);
    }

    function calculatePrizeIndex(rotation) {
        // Adjust the calculation to ensure it matches where the arrow points
        const adjustedRotation = (rotation + Math.PI / 2) % (Math.PI * 2); // Adjust for arrow pointing down
        const prizeIndex = Math.floor((2 * Math.PI - adjustedRotation) / angle) % totalPrizes;
        return prizeIndex;
    }

    function displayPrize(prizeIndex) {
        prizePopupText.textContent = `Congratulations! You won ${prizes[prizeIndex]}`;
        prizePopup.style.display = "flex";
    }

    spinButton.addEventListener('click', function() {
        prizePopup.style.display = 'none';
        spinWheel();
    });

    prizePopup.addEventListener('click', function() {
        prizePopup.style.display = 'none';
    });

    window.addEventListener('resize', adjustCanvasSize);
    adjustCanvasSize(); // Initial setup
});
