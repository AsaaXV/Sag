let points = [];

// Fungsi untuk memastikan tidak ada tabrakan antara titik
function isColliding(newPoint, radius) {
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const distance = Math.sqrt((newPoint.x - point.x) ** 2 + (newPoint.y - point.y) ** 2);
        if (distance < radius + point.radius) {
            return true; // Titik bertabrakan
        }
    }
    return false;
}

// Helper function to draw a custom circle point
function drawPoint(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

// Generate pattern based on the selected option
function generatePattern() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const patternType = document.getElementById('patternType').value;

    // Clear the canvas and reset points array
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];

    // Generate a pattern
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

// Ensure that canvas size is adjusted
function adjustCanvasSize() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize();

// Generate a random size between min and max for the circles
function randomSize(min, max) {
    return Math.random() * (max - min) + min;
}

// Lissajous curve pattern with non-colliding circles
function drawLissajousPattern(ctx) {
    const A = 150, B = 150; // Amplitudes
    const a = 5, b = 4; // Frequencies
    const delta = Math.PI / 2; // Phase shift
    const pointsCount = 1000;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < pointsCount; t++) {
        const x = centerX + A * Math.sin(a * t * 0.01 + delta);
        const y = centerY + B * Math.sin(b * t * 0.01);
        const radius = randomSize(5, 20); // Random radius between 5 and 20

        if (!isColliding({x, y}, radius)) {
            drawPoint(ctx, x, y, radius);
            points.push({x, y, radius});
        }
    }
}

// Spiral pattern with non-colliding circles
function drawSpiralPattern(ctx) {
    const a = 5;
    const b = 0.2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxAngle = Math.PI * 8;
    const pointsCount = 1000;

    for (let t = 0; t < maxAngle; t += maxAngle / pointsCount) {
        const r = a * Math.exp(b * t);
        const x = centerX + r * Math.cos(t);
        const y = centerY + r * Math.sin(t);
        const radius = randomSize(5, 20);

        if (!isColliding({x, y}, radius)) {
            drawPoint(ctx, x, y, radius);
            points.push({x, y, radius});
        }
    }
}

// Flower pattern with non-colliding circles
function drawFlowerPattern(ctx) {
    const k = 7;
    const pointsCount = 1000;
    const size = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < pointsCount; t++) {
        const theta = (t / pointsCount) * Math.PI * 2;
        const r = size * Math.cos(k * theta);
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        const radius = randomSize(5, 20);

        if (!isColliding({x, y}, radius)) {
            drawPoint(ctx, x, y, radius);
            points.push({x, y, radius});
        }
    }
}

// Lemniscate pattern with non-colliding circles
function drawLemniscatePattern(ctx) {
    const a = 200;
    const pointsCount = 1000;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let t = 0; t < pointsCount; t++) {
        const theta = (t / pointsCount) * Math.PI * 2;
        const r = a * Math.sqrt(Math.cos(2 * theta));
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        const radius = randomSize(5, 20);

        if (!isColliding({x, y}, radius)) {
            drawPoint(ctx, x, y, radius);
            points.push({x, y, radius});
        }
    }
}

// Sierpinski Fractal pattern is inherently non-colliding
function drawSierpinskiFractal(ctx, depth = 5) {
    const size = canvas.height * 0.8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawTriangle(x, y, size, depth) {
        if (depth === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.closePath();
            ctx.fillStyle = 'black';
            ctx.fill();
        } else {
            const newSize = size / 2;
            drawTriangle(x, y - newSize / 2, newSize, depth - 1);
            drawTriangle(x - newSize / 2, y + newSize / 2, newSize, depth - 1);
            drawTriangle(x + newSize / 2, y + newSize / 2, newSize, depth - 1);
        }
    }

    drawTriangle(centerX, centerY, size, depth);
}

// Download the generated image
// function downloadImage() {
   // const canvas = document.getElement
// Download the generated image
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'nirmana_titik.png'; // Nama file unduhan
    link.href = canvas.toDataURL(); // Mengubah canvas menjadi data URL gambar
    link.click(); // Simulasi klik untuk memulai unduhan
}