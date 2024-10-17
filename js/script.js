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
function drawPoint(ctx, x, y) {
    const size = 40; // Fixed size for each dot (40x40)
    if (uploadedImage) {
        ctx.drawImage(uploadedImage, x - size / 2, y - size / 2, size, size);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(x - size / 2, y - size / 2, size, size); // Draw 40x40 square
    }
}

// Symmetry pattern: Evenly spaced dots in grid
function drawSymmetryPattern(ctx) {
    const spacingX = 100;
    const spacingY = 100;

    for (let x = spacingX / 2; x < canvas.width; x += spacingX) {
        for (let y = spacingY / 2; y < canvas.height; y += spacingY) {
            drawPoint(ctx, x, y);
        }
    }
}

// Random pattern: Dots randomly but sparsely placed with 40x40 size
function drawRandomPattern(ctx) {
    const numberOfDots = 50;

    for (let i = 0; i < numberOfDots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        drawPoint(ctx, x, y);
    }
}

// Gradation pattern: From small clusters to large across the canvas
function drawGradationPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const layers = 10;
    const size = 40; // Fixed size

    for (let i = 0; i < layers; i++) {
        const radius = 50 + i * 50;
        const numPoints = 6 + i * 4;
        const angleStep = (Math.PI * 2) / numPoints;

        for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            drawPoint(ctx, x, y);
        }
    }
}

// Wave pattern: 40x40 dots along a sine wave
function drawWavePattern(ctx) {
    const amplitude = 80;
    const frequency = 0.02;
    const spacing = 60; // Distance between dots

    for (let x = 0; x < canvas.width; x += spacing) {
        const y = canvas.height / 2 + Math.sin(x * frequency) * amplitude;
        drawPoint(ctx, x, y);
    }
}

// Concentric pattern: Dots in expanding concentric circles
function drawConcentricPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numberOfCircles = 8;
    const size = 40; // Fixed size for each dot

    for (let i = 0; i < numberOfCircles; i++) {
        const radius = 60 + i * 70;
        const numPoints = 8 + i * 4;
        const angleStep = (Math.PI * 2) / numPoints;

        for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            drawPoint(ctx, x, y);
        }
    }
}