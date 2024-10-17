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
    const frequency = 10;
    const amplitude = 50;

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

// Fungsi untuk generate pola simetris acak dengan gradasi gelombang
function drawSymmetricWavePattern(ctx) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 50;
    const pointsCount = 500;
    const frequency = 10;
    const amplitude = 50;
    const randomFactor = 100;

    for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2;
        const wave = Math.sin(frequency * angle) * amplitude;
        const randomOffset = (Math.random() - 0.5) * randomFactor;
        const radius = maxRadius + wave + randomOffset;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const pointSize = (i / pointsCount) * 15 + 5;

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