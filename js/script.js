let uploadedImage = null;

// Handle image upload
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                uploadedImage = img;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Adjust canvas size to fill the screen
function adjustCanvasSize() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize();

// Generate pattern based on the selected option
function generatePattern() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const patternType = document.getElementById('patternType').value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (patternType) {
        case 'symmetry':
            drawSymmetryPattern(ctx);
            break;
        case 'random':
            drawRandomPattern(ctx);
            break;
        case 'gradation':
            drawGradationPattern(ctx);
            break;
        case 'wave':
            drawWavePattern(ctx);
            break;
        case 'concentric':
            drawConcentricPattern(ctx);
            break;
        default:
            break;
    }
}

// Helper function to draw a custom point or image
function drawPoint(ctx, x, y, size) {
    if (uploadedImage) {
        ctx.drawImage(uploadedImage, x - size / 2, y - size / 2, size, size);
    } else {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}

// Symmetry pattern: Create grid of dots with even spacing
function drawSymmetryPattern(ctx) {
    const size = 10;
    const spacingX = 80;
    const spacingY = 80;

    for (let x = spacingX; x < canvas.width; x += spacingX) {
        for (let y = spacingY; y < canvas.height; y += spacingY) {
            drawPoint(ctx, x, y, size);
        }
    }
}

// Random pattern: Spread dots randomly but aesthetically across the canvas
function drawRandomPattern(ctx) {
    const numberOfDots = 100;
    const minSize = 5;
    const maxSize = 20;

    for (let i = 0; i < numberOfDots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = minSize + Math.random() * (maxSize - minSize);
        drawPoint(ctx, x, y, size);
    }
}

// Gradation pattern: From small to large dots
function drawGradationPattern(ctx) {
    const layers = 10;
    const sizeStart = 5;
    const sizeEnd = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < layers; i++) {
        const size = sizeStart + (sizeEnd - sizeStart) * (i / layers);
        const angleStep = (Math.PI * 2) / (i * 8 + 10);

        for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
            const x = centerX + Math.cos(angle) * i * 50;
            const y = centerY + Math.sin(angle) * i * 50;
            drawPoint(ctx, x, y, size);
        }
    }
}

// Wave pattern: Sine wave with evenly spaced dots
function drawWavePattern(ctx) {
    const size = 15;
    const amplitude = 60;
    const frequency = 0.02;

    for (let x = 0; x < canvas.width; x += 30) {
        const y = canvas.height / 2 + Math.sin(x * frequency) * amplitude;
        drawPoint(ctx, x, y, size);
    }
}

// Concentric pattern: Dots arranged in concentric circles
function drawConcentricPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numberOfCircles = 15;
    const sizeStart = 5;
    const sizeEnd = 20;

    for (let i = 0; i < numberOfCircles; i++) {
        const radius = 40 + i * 30;
        const size = sizeStart + (sizeEnd - sizeStart) * (i / numberOfCircles);
        const numPoints = i * 8 + 12;
        const angleStep = (Math.PI * 2) / numPoints;

        for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            drawPoint(ctx, x, y, size);
        }
    }
}