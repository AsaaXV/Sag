// Helper function to draw a custom point or image
function drawPoint(ctx, x, y, size = 5) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

// Generate pattern based on the selected option
function generatePattern() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const patternType = document.getElementById('patternType').value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (patternType) {
        case 'lissajous':
            drawLissajousPattern(ctx);
            break;
        case 'spiral':
            drawSpiralPattern(ctx);
            break;
        case 'flower':
            drawFlowerPattern(ctx);
            break;
        case 'lemniscate':
            drawLemniscatePattern(ctx);
            break;
        case 'fractal':
            drawSierpinskiFractal(ctx);
            break;
        default:
            break;
    }
}

// Lissajous curve pattern (complex curves based on sine and cosine)
function drawLissajousPattern(ctx) {
    const A = 150, B = 150; // Amplitudes
    const a = 5, b = 4; // Frequencies
    const delta = Math.PI / 2; // Phase shift
    const points = 1000;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < points; t++) {
        const x = centerX + A * Math.sin(a * t * 0.01 + delta);
        const y = centerY + B * Math.sin(b * t * 0.01);
        drawPoint(ctx, x, y, 3);
    }
}

// Spiral pattern (logarithmic spiral)
function drawSpiralPattern(ctx) {
    const a = 5; // Controls the tightness of the spiral
    const b = 0.2; // Controls the distance between the spiral turns
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxAngle = Math.PI * 8; // 4 complete rotations
    const points = 1000;

    for (let t = 0; t < maxAngle; t += maxAngle / points) {
        const r = a * Math.exp(b * t); // Exponential growth
        const x = centerX + r * Math.cos(t);
        const y = centerY + r * Math.sin(t);
        drawPoint(ctx, x, y, 3);
    }
}

// Flower pattern using polar coordinates
function drawFlowerPattern(ctx) {
    const k = 7; // Controls the number of petals
    const points = 1000;
    const size = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < points; t++) {
        const theta = (t / points) * Math.PI * 2;
        const r = size * Math.cos(k * theta);
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        drawPoint(ctx, x, y, 3);
    }
}

// Lemniscate pattern (figure-eight curve)
function drawLemniscatePattern(ctx) {
    const a = 200; // Controls the size of the lemniscate
    const points = 1000;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < points; t++) {
        const theta = (t / points) * Math.PI * 2;
        const r = a * Math.sqrt(Math.cos(2 * theta));
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        drawPoint(ctx, x, y, 3);
    }
}

// Sierpinski Fractal pattern (recursive triangle fractal)
function drawSierpinskiFractal(ctx, depth = 5) {
    const size = canvas.height * 0.8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawTriangle(x, y, size, depth) {
        if (depth === 0) {
            // Draw filled triangle
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.closePath();
            ctx.fillStyle = 'black';
            ctx.fill();
        } else {
            // Recursive case: draw 3 smaller triangles
            const newSize = size / 2;
            drawTriangle(x, y - newSize / 2, newSize, depth - 1);
            drawTriangle(x - newSize / 2, y + newSize / 2, newSize, depth - 1);
            drawTriangle(x + newSize / 2, y + newSize / 2, newSize, depth - 1);
        }
    }

    drawTriangle(centerX, centerY, size, depth);
}