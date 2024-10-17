let points = [];
let uploadedImage = null; // Variabel untuk menyimpan gambar yang di-upload

// Fungsi untuk menangani gambar yang di-upload
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            uploadedImage = img; // Simpan gambar yang di-upload
            console.log('Gambar ter-load dan siap digunakan');
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Fungsi menggambar titik (sekarang mendukung gambar yang di-upload)
function drawPoint(ctx, x, y, radius) {
    if (uploadedImage) {
        // Jika ada gambar yang di-upload, gunakan gambar sebagai titik
        const imgWidth = radius * 2;
        const imgHeight = radius * 2;
        ctx.drawImage(uploadedImage, x - radius, y - radius, imgWidth, imgHeight);
    } else {
        // Jika tidak ada gambar yang di-upload, gunakan lingkaran default
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}

// Fungsi untuk mengecek tabrakan antara titik
function isColliding(point, radius) {
    for (let i = 0; i < points.length; i++) {
        const existingPoint = points[i];
        const dx = existingPoint.x - point.x;
        const dy = existingPoint.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < existingPoint.radius + radius) {
            return true;
        }
    }
    return false;
}

// Fungsi untuk generate pola Lissajous
function drawLissajousPattern(ctx) {
    const a = 100; // Amplitudo untuk sumbu X
    const b = 100; // Amplitudo untuk sumbu Y
    const delta = Math.PI / 2; // Perbedaan fase
    const pointsCount = 500;

    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * (Math.PI * 2); // Parameter waktu
        const x = a * Math.sin(3 * t + delta) + ctx.canvas.width / 2;
        const y = b * Math.sin(2 * t) + ctx.canvas.height / 2;
        const pointSize = Math.random() * 15 + 5; // Ukuran titik acak

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk generate pola Spiral
function drawSpiralPattern(ctx) {
    const pointsCount = 500;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2 - 50;

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 4; // 2 putaran penuh
        const radius = (maxRadius / pointsCount) * i; // Radius bertambah seiring dengan i

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const pointSize = Math.random() * 15 + 5; // Ukuran titik acak

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk generate pola Bunga Polar
function drawFlowerPattern(ctx) {
    const pointsCount = 500;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2 - 50;

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 4; // 2 putaran penuh
        const radius = maxRadius * Math.sin(3 * angle); // Bunga dengan 3 kelopak

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const pointSize = Math.random() * 15 + 5; // Ukuran titik acak

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk generate pola Lemniscate (∞)
function drawLemniscatePattern(ctx) {
    const pointsCount = 500;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) / 2 - 50;

    for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * Math.PI * 2; // Parameter untuk lemniscate
        const radius = maxRadius * Math.sin(t); // Jari-jari mengikuti fungsi sinus

        const x = centerX + radius * Math.cos(t);
        const y = centerY + radius * Math.sin(t);
        const pointSize = Math.random() * 15 + 5; // Ukuran titik acak

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk generate pola Fraktal Sierpinski
function drawSierpinskiFractal(ctx) {
    const iterations = 5; // Jumlah iterasi fraktal
    const initialPoints = [
        { x: ctx.canvas.width / 2, y: 20 },
        { x: 20, y: ctx.canvas.height - 20 },
        { x: ctx.canvas.width - 20, y: ctx.canvas.height - 20 }
    ];
    drawSierpinski(ctx, initialPoints, iterations);
}

function drawSierpinski(ctx, points, iterations) {
    if (iterations === 0) {
        drawPoint(ctx, points[0].x, points[0].y, 5);
        drawPoint(ctx, points[1].x, points[1].y, 5);
        drawPoint(ctx, points[2].x, points[2].y, 5);
        return;
    }

    const midpoints = [
        { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 },
        { x: (points[1].x + points[2].x) / 2, y: (points[1].y + points[2].y) / 2 },
        { x: (points[2].x + points[0].x) / 2, y: (points[2].y + points[0].y) / 2 }
    ];

    drawSierpinski(ctx, [points[0], midpoints[0], midpoints[2]], iterations - 1);
    drawSierpinski(ctx, [midpoints[0], points[1], midpoints[1]], iterations - 1);
    drawSierpinski(ctx, [midpoints[2], midpoints[1], points[2]], iterations - 1);
}

// Fungsi untuk generate pola simetris
function drawSymmetricPattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 50;
    const pointsCount = 500;

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2;
        const radius = maxRadius * (i / pointsCount); // Simetris, titik mengikuti jari-jari bertahap

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const pointSize = (i / pointsCount) * 15 + 5;

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk generate pola acak
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

// Fungsi untuk generate pola gelombang
function drawWavePattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 50;
    const pointsCount = 500;
    const frequency = 5; // Frekuensi lebih kecil
    const amplitude = 20; // Amplitudo lebih kecil

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2;
        const wave = Math.sin(frequency * angle) * amplitude; // Gelombang sinusoidal

        const radius = maxRadius + wave;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const pointSize = (i / pointsCount) * 15 + 5;

        if (!isColliding({ x, y }, pointSize)) {
            drawPoint(ctx, x, y, pointSize);
            points.push({ x, y, radius: pointSize });
        }
    }
}

// Fungsi untuk menggambar pola gradasi kotak sama sisi
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

// Fungsi download gambar dari canvas
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'nirmana_titik.png'; // Nama file unduhan
    link.href = canvas.toDataURL(); // Mengubah canvas menjadi data URL gambar
    link.click(); // Simulasi klik untuk memulai unduhan
}

// Generate pattern based on the selected option
function generatePattern() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const patternType = document.getElementById('patternType').value;

    // Atur ukuran kanvas
    canvas.width = window.innerWidth - 100; 
    canvas.height = window.innerHeight - 200;

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
        case 'GradientSquare':
            drawGradientSquarePattern(ctx);
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
        case 'symmetric': // Pola Simetris
            drawSymmetricPattern(ctx);
            break;
        case 'random': // Pola Acak
            drawRandomPattern(ctx);
            break;
        case 'wave': // Pola Gelombang
            drawWavePattern(ctx);
            break;
        default:
            break;
    }
}

// Event listener untuk tombol generate dan download
document.getElementById('generateBtn').addEventListener('click', generatePattern);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);