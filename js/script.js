let points = [];

// Fungsi untuk menggambar titik
function drawPoint(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black'; // Warna titik
    ctx.fill();
}

// Fungsi untuk mendeteksi tabrakan titik
function isColliding(point, radius) {
    for (const p of points) {
        const dx = point.x - p.x;
        const dy = point.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius + p.radius) {
            return true;
        }
    }
    return false;
}

// Fungsi untuk menggambar pola Lissajous
function drawLissajousPattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const a = 100; // Amplitudo
    const b = 100; // Amplitudo
    const delta = Math.PI / 2; // Fase
    const pointsCount = 500;

    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * (Math.PI * 2);
        const x = canvasWidth / 2 + a * Math.sin(3 * t + delta);
        const y = canvasHeight / 2 + b * Math.sin(2 * t);

        const pointSize = 5;
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola spiral
function drawSpiralPattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pointsCount = 1000;

    for (let i = 0; i < pointsCount; i++) {
        const angle = 0.1 * i;
        const radius = 2 * i;

        const x = canvasWidth / 2 + radius * Math.cos(angle);
        const y = canvasHeight / 2 + radius * Math.sin(angle);

        const pointSize = (i / pointsCount) * 15 + 5; // Ukuran titik bertambah
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola bunga
function drawFlowerPattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pointsCount = 500;
    const petals = 8; // Jumlah kelopak

    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * Math.PI * 2;
        const r = 100 * Math.sin(petals * t); // Ukuran kelopak

        const x = canvasWidth / 2 + r * Math.cos(t);
        const y = canvasHeight / 2 + r * Math.sin(t);

        const pointSize = 5;
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola lemniscate
function drawLemniscatePattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pointsCount = 1000;

    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * Math.PI * 2; // Menghitung sudut
        const r = 100 * Math.sqrt(Math.cos(2 * t)); // Radius pola lemniscate

        const x = canvasWidth / 2 + r * Math.cos(t);
        const y = canvasHeight / 2 + r * Math.sin(t);

        const pointSize = 5;
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola fraktal Sierpinski
function drawSierpinskiFractal(ctx, x, y, size) {
    if (size < 1) return;

    // Menggambar segitiga
    const height = (Math.sqrt(3) / 2) * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size / 2, y + height);
    ctx.lineTo(x + size / 2, y + height);
    ctx.closePath();
    ctx.fill();

    // Rekursi untuk menggambar fraktal
    drawSierpinskiFractal(ctx, x - size / 4, y + height / 2, size / 2);
    drawSierpinskiFractal(ctx, x + size / 4, y + height / 2, size / 2);
    drawSierpinskiFractal(ctx, x, y, size / 2);
}

// Fungsi untuk menggambar pola simetris
function drawSymmetricPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pointsCount = 200;

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2; // Menghitung sudut
        const radius = 200; // Jari-jari

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const pointSize = 5; // Ukuran titik
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola acak
function drawRandomPattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pointsCount = 500;

    for (let i = 0; i < pointsCount; i++) {
        const x = Math.random() * canvasWidth; // Koordinat acak X
        const y = Math.random() * canvasHeight; // Koordinat acak Y
        const pointSize = Math.random() * 15 + 5; // Ukuran titik acak
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola gelombang
function drawWavePattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pointsCount = 1000;

    for (let i = 0; i < pointsCount; i++) {
        const x = (i / pointsCount) * canvasWidth; // Posisi X
        const y = canvasHeight / 2 + 50 * Math.sin((i / pointsCount) * Math.PI * 4); // Posisi Y dengan gelombang sinus

        const pointSize = 5; // Ukuran titik tetap
        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola kotak sama sisi dengan gradasi
function drawGradientSquarePattern(ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const squareSize = Math.min(canvasWidth, canvasHeight) - 50; // Ukuran kotak
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const pointsCount = 500; // Jumlah titik
    const stepSize = squareSize / Math.sqrt(pointsCount); // Ukuran langkah berdasarkan jumlah titik

    for (let i = 0; i < pointsCount; i++) {
        const row = Math.floor(i / Math.sqrt(pointsCount)); // Hitung baris
        const col = i % Math.sqrt(pointsCount); // Hitung kolom

        const x = centerX - squareSize / 2 + col * stepSize + stepSize / 2; // Posisi X
        const y = centerY - squareSize / 2 + row * stepSize + stepSize / 2; // Posisi Y

        // Hitung ukuran titik berdasarkan posisinya
        const pointSize = (1 - (row / Math.sqrt(pointsCount))) * 15 + 5; // Gradasi dari besar ke kecil

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi generate pattern berdasarkan pilihan yang dipilih
function generatePattern() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const patternType = document.getElementById('patternType').value;

    // Atur ukuran kanvas
    canvas.width = 600;  // Ukuran tetap untuk tampilan kotak
    canvas.height = 600; // Ukuran tetap untuk tampilan kotak

    // Clear the canvas dan reset points array
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
            drawSierpinskiFractal(ctx, canvas.width / 2, canvas.height / 2, 200);
            break;
        case 'symmetric': // Pola Simetris
            drawSymmetricPattern(ctx);
            break;
        case 'random': // Pola Acak
            drawRandomPattern(ctx);
            break;
        case 'wave': // Pola Gelombang
            drawWavePattern(ctx);
            break;
        case 'gradientSquare': // Pola Kotak Gradasi
            drawGradientSquarePattern(ctx);
            break;
        default:
            break;
    }
}

// Fungsi untuk mendownload gambar
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'nirmana.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listener untuk tombol generate dan download
document.getElementById('generateBtn').addEventListener('click', generatePattern);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

// Fungsi untuk menangani upload gambar
document.getElementById('imageUpload').addEventListener('change', function(event) {
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