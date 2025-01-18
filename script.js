document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const prizePopup = document.getElementById('prizePopup');
    const prizePopupText = document.getElementById('prizePopupText');
    const addPrizeButton = document.getElementById('addPrize');
    const savePrizesButton = document.getElementById('savePrizes');
    const prizeInputsContainer = document.querySelector('.prize-inputs');

    if (!canvas || !ctx || !spinButton || !prizePopup || !prizePopupText) {
        console.error('One or more required elements are missing.');
        return;
    }

    const themes = {
        warm: {
            colors: ["#FF6E6E", "#FFC93C", "#FF9A3C", "#FF7C7C", "#FFB347", "#FF8066"],
            name: "Warm Theme"
        },
        vibrant: {
            colors: ["#4CAF50", "#E91E63", "#FFC107", "#2196F3", "#9C27B0", "#FF5722"],
            name: "Vibrant Theme"
        }
    };

    // Define predefined prize lists
    const predefinedPrizes = {
        default: ["$100", "$25", "$50", "$75", "$100", "$150"],
        money: ["$5", "$10", "$20", "$50", "$100", "$200"],
        fun: ["T-Shirt", "Hat", "Stickers", "Mug", "Poster", "Keychain"]
    };

    // Initialize prizes with in-memory storage
    class InMemoryPrizeStorage {
        constructor() {
            // Start with the 'fun' prize list as default
            this.prizes = predefinedPrizes.fun;
        }

        get() {
            return this.prizes;
        }

        set(prizes) {
            this.prizes = prizes;
        }
    }

    let prizeStorage = new InMemoryPrizeStorage();
    let prizes = prizeStorage.get();
    console.log('Initial prizes loaded:', prizes);
    let totalPrizes = prizes.length;
    let angle = Math.PI * 2 / totalPrizes;
    
    function updatePrizeInputs() {
        console.log('Updating prize inputs with:', prizes, 'prizeInputsContainer:', prizeInputsContainer);
        prizeInputsContainer.innerHTML = ''; // Clear existing inputs
        prizes.forEach((prize, index) => {
            const prizeInputDiv = document.createElement('div');
            prizeInputDiv.classList.add('prize-input');
            prizeInputDiv.innerHTML = `
                <input type="text" class="prize-value" placeholder="Prize" value="${prize}">
                <button class="remove-prize">×</button>
            `;
            
            // Add input change event listener
            const input = prizeInputDiv.querySelector('.prize-value');
            input.addEventListener('input', () => {
                prizes[index] = input.value;
                drawWheel();
            });

            // Add remove event listener
            const removeButton = prizeInputDiv.querySelector('.remove-prize');
            removeButton.addEventListener('click', () => {
                if (prizes.length > 2) {
                    prizes.splice(index, 1);
                    totalPrizes = prizes.length;
                    angle = Math.PI * 2 / totalPrizes;
                    updatePrizeInputs();
                    drawWheel();
                } else {
                    alert('You need at least 2 prizes!');
                }
            });

            prizeInputsContainer.appendChild(prizeInputDiv);
        });
    }
    
    // Initialize prize inputs on page load
    updatePrizeInputs();
    
    // Set initial dropdown value and trigger change event
    const predefinedListsDropdown = document.getElementById('predefinedLists');
    
    // Update prize inputs based on selected predefined list
    predefinedListsDropdown.addEventListener('change', () => {
        const selectedList = predefinedListsDropdown.value;
        if (selectedList && predefinedPrizes[selectedList]) {
            prizes = predefinedPrizes[selectedList];
            updatePrizeInputs();
        }
    });

    // Initialize with the 'fun' prize list
    predefinedListsDropdown.value = 'fun';
    prizes = predefinedPrizes.fun;
    prizeStorage.set(prizes);
    totalPrizes = prizes.length;
    angle = Math.PI * 2 / totalPrizes;
    
    // Manually trigger the change event to update the UI
    const changeEvent = new Event('change', { bubbles: true });
    predefinedListsDropdown.dispatchEvent(changeEvent);
    
    // Debug logging
    console.log('Initial prizes:', prizes);
    console.log('Total prizes:', totalPrizes);
    console.log('Angle per prize:', angle);

    // Generate colors for prizes
    function getPrizeColors(count) {
        const baseColors = themes[currentTheme].colors;
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(baseColors[i % baseColors.length]);
        }
        return colors;
    }
    let currentRotation = 0;
    let currentTheme;
    try {
        currentTheme = localStorage.getItem('wheelTheme') || 'vibrant';
    } catch (e) {
        console.error('Error accessing localStorage for theme:', e);
        currentTheme = 'vibrant';
    }

    // Initialize prize inputs
    function initializePrizeInputs() {
        updatePrizeInputs();
    }

    function createPrizeInput(value = '', index) {
        console.log('Creating prize input with value:', value, 'and index:', index, 'prizeInputsContainer:', prizeInputsContainer);
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'prize-input';
        inputWrapper.innerHTML = `
            <input type="text" class="prize-value" value="${value}" placeholder="Prize ${index + 1}">
            <button class="remove-prize">×</button>
        `;
        prizeInputsContainer.appendChild(inputWrapper);

        // Add input change event listener
        inputWrapper.querySelector('.prize-value').addEventListener('input', () => {
            const index = Array.from(prizeInputsContainer.children).indexOf(inputWrapper);
            prizes[index] = inputWrapper.querySelector('.prize-value').value;
            drawWheel();
        });

        // Add remove event listener
        inputWrapper.querySelector('.remove-prize').addEventListener('click', () => {
            if (prizes.length > 2) {
                prizes.splice(index, 1);
                totalPrizes = prizes.length;
                angle = Math.PI * 2 / totalPrizes;
                initializePrizeInputs();
                drawWheel();
            } else {
                alert('You need at least 2 prizes!');
            }
        });

        return inputWrapper;
    }

    // Add new prize input
    addPrizeButton.addEventListener('click', () => {
        if (prizes.length < 12) {
            console.log('Adding prize. Current prizes:', prizes, 'length:', prizes.length);
            const newPrize = `Prize ${prizes.length + 1}`;
            prizes.push(newPrize);
            console.log('Prizes array after push:', prizes);
            prizeStorage.set(prizes); // Update storage
            console.log('Storage after update:', prizeStorage.get());
            updatePrizeInputs(); // Update all inputs
            console.log('Prizes after adding:', prizes, 'length:', prizes.length);
            drawWheel();
            console.log('Wheel drawn with prizes:', prizes, 'length:', prizes.length);
        } else {
            alert('Maximum of 12 prizes reached!');
        }
    });

    // Save prizes
    savePrizesButton.addEventListener('click', () => {
        console.log('Save button clicked. Current prizes:', prizes, 'prizeInputsContainer:', prizeInputsContainer);
        const newPrizes = [];
        document.querySelectorAll('.prize-value').forEach(input => {
            if (input.value.trim()) {
                newPrizes.push(input.value.trim());
            }
        });
        console.log('Prizes to be saved:', newPrizes, 'newPrizes:', newPrizes);

        if (newPrizes.length >= 2) {
            prizes = newPrizes;
            totalPrizes = prizes.length;
            angle = Math.PI * 2 / totalPrizes;
            prizeStorage.set(prizes);
            drawWheel();
            alert('Prizes saved successfully!');
        } else {
            alert('You need at least 2 prizes!');
        }
    });

    // Initialize UI
    document.body.setAttribute('data-theme', currentTheme === 'vibrant' ? 'vibrant' : '');
    initializePrizeInputs();

    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'warm' ? 'vibrant' : 'warm';
        try {
            localStorage.setItem('wheelTheme', currentTheme);
        } catch (e) {
            console.error('Error accessing localStorage for theme:', e);
        }
        document.body.setAttribute('data-theme', currentTheme === 'vibrant' ? 'vibrant' : '');
        themeToggle.textContent = `Switch to ${currentTheme === 'warm' ? 'Vibrant' : 'Warm'} Theme`;
        drawWheel();
    });
    
    // Set initial theme button text
    themeToggle.textContent = `Switch to ${currentTheme === 'warm' ? 'Vibrant' : 'Warm'} Theme`;

    function adjustCanvasSize() {
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const size = Math.min(maxWidth, maxHeight, 500);
        canvas.width = size;
        canvas.height = size;
    }

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw segments starting from top (0 degrees)
        prizes.forEach((prize, index) => {
            const startAngle = -Math.PI/2 + (index * angle) + currentRotation;
            const endAngle = startAngle + angle;
            
            // Draw segment
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, getPrizeColors(totalPrizes)[index]);
            gradient.addColorStop(1, 'white');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw text
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(startAngle + angle / 2);
            ctx.fillStyle = 'white';
            ctx.font = `bold ${canvas.width / 20}px Poppins, sans-serif`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(prize, canvas.width / 2 - 20, 0);
            ctx.restore();
        });
        
        drawIndicator();
    }

    function drawIndicator() {
        // Use theme color for indicator
        ctx.fillStyle = themes[currentTheme].colors[0];
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
        const spins = 5 + Math.random() * 5; // 5-10 spins
        const targetAngle = spins * Math.PI * 2;
        
        const rotateWheel = (timestamp) => {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / spinDuration, 1);
            
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentRotation = easeOut * targetAngle;
            
            drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(rotateWheel);
            } else {
                // Calculate winning prize
                // 1. Get final rotation (negative for clockwise spin)
                let finalRotation = -currentRotation;
                
                // 2. Normalize to positive angle between 0 and 2π
                finalRotation = ((finalRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
                
                // 3. Add half angle to align with indicator
                const adjustedRotation = (finalRotation + angle/2) % (Math.PI * 2);
                
                // 4. Calculate prize index (clockwise from top)
                const prizeIndex = Math.floor(adjustedRotation / angle);
                
                // Show result
                const prize = prizes[prizeIndex];
                prizePopupText.textContent = `You won ${prize}!`;
                prizePopup.style.display = 'flex';
            }
        };
        
        requestAnimationFrame(rotateWheel);
    }

    spinButton.addEventListener('click', spinWheel);
    window.addEventListener('resize', adjustCanvasSize);

    adjustCanvasSize();
    drawWheel();
});
