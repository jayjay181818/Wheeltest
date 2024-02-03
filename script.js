document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const prizePopup = document.getElementById('prizePopup');
    const prizePopupText = document.getElementById('prizePopupText');

    // Initialize the "Congratulations" box to be hidden
    prizePopup.style.display = 'none';

    const prizes = ["$100", "$25", "$50", "$75", "$100", "$150"];
    const colors = ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845", "#2ECC71"];
    let currentRotation = 0; // Tracks the current rotation of the wheel
    const totalPrizes = prizes.length;
    const angle = Math.PI * 2 / totalPrizes; // The angle for each segment

    function adjustCanvasSize() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let size = Math.min(viewportWidth, viewportHeight) * 0.75; // Use 75% of the smaller viewport dimension
        size = Math.max(250, Math.min(450, size)); // Ensure the canvas size is within a reasonable range
        canvas.width = size;
        canvas.height = size;
        drawWheel();
        positionSpinButton();
    }

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
        prizes.forEach((prize, index) => {
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, index * angle + currentRotation, (index + 1) * angle + currentRotation);
            ctx.closePath();
            ctx.fill();

            // Draw the prize text
            ctx.fillStyle = 'black';
            ctx.font = `${canvas.width / 15}px Arial`; // Adjust font size based on canvas size
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const textAngle = index * angle + angle / 2 + currentRotation;
            const textX = canvas.width / 2 + Math.cos(textAngle) * (canvas.width / 2) * 0.75;
            const textY = canvas.height / 2 + Math.sin(textAngle) * (canvas.height / 2) * 0.75;
            ctx.save();
            ctx.translate(textX, textY);
            ctx.rotate(textAngle + Math.PI / 2); // Rotate text to align with the segment
            ctx.fillText(prize, 0, 0);
            ctx.restore();
        });
        drawArrow();
    }

    function drawArrow() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 10, 5); // Adjusted to ensure it's at the very top
        ctx.lineTo(canvas.width / 2 + 10, 5);
        ctx.lineTo(canvas.width / 2, 25); // Adjust the height as needed
        ctx.closePath();
        ctx.fill();
    }

    function positionSpinButton() {
        spinButton.style.position = 'absolute';
        spinButton.style.left = `${canvas.offsetLeft + (canvas.width / 2) - (spinButton.offsetWidth / 2)}px`;
        spinButton.style.top = `${canvas.offsetTop + (canvas.height / 2) - (spinButton.offsetHeight / 2)}px`;
    }

    function spinWheel() {
        const spinDuration = 5000; // Spin duration in milliseconds
        let startTimestamp;

        // Randomize the stopping position within a segment for more variability
        const stopAngle = Math.random() * angle; // Random angle within a segment

        // Calculate the end rotation to include a random segment and additional random angle within that segment
        const rotations = Math.floor(3 + Math.random() * 4); // Full rotations for randomness
        const endRotation = rotations * Math.PI * 2 + stopAngle; // Final rotation angle

        function animateSpin(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsedTime = timestamp - startTimestamp;
            const progress = elapsedTime / spinDuration;

            if (progress < 1) {
                const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease-out effect for smooth ending
                currentRotation = startRotation + easeOutProgress * (endRotation - startRotation);
                drawWheel();
                requestAnimationFrame(animateSpin);
            } else {
                // Ensure the wheel stops at the calculated final position
                currentRotation = endRotation % (Math.PI * 2);
                drawWheel();
                // Calculate the prize index based on the final rotation
                const prizeIndex = Math.floor(totalPrizes - (currentRotation / (Math.PI * 2)) * totalPrizes) % totalPrizes;
                displayPrize(prizeIndex);
            }
        }

        const startRotation = currentRotation; // Capture the starting rotation before the spin
        requestAnimationFrame(animateSpin);
    }

    function displayPrize(prizeIndex) {
        prizePopupText.textContent = `Congratulations! You won ${prizes[prizeIndex]}`;
        prizePopup.style.display = "flex";
    }

    spinButton.addEventListener('click', function() {
        // Hide the popup before starting a new spin
        prizePopup.style.display = 'none';
        spinWheel();
    });

    prizePopup.addEventListener('click', function() {
        // Hide the popup when clicked
        prizePopup.style.display = 'none';
    });

    window.addEventListener('resize', adjustCanvasSize); // Adjust the canvas size and reposition elements on resize

    adjustCanvasSize(); // Initial setup to adjust canvas size and position elements
});
