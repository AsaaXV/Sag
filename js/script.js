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

// Symmetry pattern
function drawSymmetryPattern(ctx) {
    const size = 20;
    for (let x = 0; x < canvas.width; x += 50) {
        for (let y = 0; y < canvas.height; y += 50) {
            drawPoint(ctx, x, y, size);
        }
    }
}

// Random pattern
function drawRandomPattern(ctx) {
    const size = 20;
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        drawPoint(ctx, x, y, size);
    }
}

// Gradation pattern
function drawGradationPattern(ctx) {
    for (let i = 0; i < 10; i++) {
        const size = i * 5 + 10;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        drawPoint(ctx, x, y - i * 30, size);
    }
}

// Wave pattern
function drawWavePattern(ctx) {
    const size = 10;
    for (let x = 0; x < canvas.width; x += 20) {
        const y = canvas.height / 2 + Math.sin(x * 0.1) * 100;
        drawPoint(ctx, x, y, size);
    }
}

// Concentric pattern
function drawConcentricPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < 10; i++) {
        const size = i * 20 + 10;
        drawPoint(ctx, centerX, centerY, size);
    }
}