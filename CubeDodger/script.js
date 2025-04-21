// --- Hàm cập nhật logic game (chạy mỗi khung hình) ---
function updateGame() {
    // ... (phần đầu hàm giữ nguyên) ...

    // --- Kiểm tra va chạm ---
    // ... (phần kiểm tra Đạn vs Thiên thạch giữ nguyên) ...

    // 2. Tàu vs Thiên thạch
     const currentPlayerRadius = playerRadius; // Bán kính tàu
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        if (!asteroid || !player) continue; // Kiểm tra tồn tại
        const currentAsteroidRadius = asteroid.userData.radius || asteroidRadius;
        const distance = player.position.distanceTo(asteroid.position);

        // Kiểm tra va chạm
        if (distance < currentPlayerRadius + currentAsteroidRadius) {

            // === DEBUG LOGGING START ===
            // Log thông tin chi tiết NGAY KHI va chạm được phát hiện
            console.error(`%c IMMEDIATE COLLISION! Game Over Triggered.`, 'color: red; font-weight: bold;');
            console.log(`- Frame Distance: ${distance.toFixed(3)}`);
            console.log(`- Collision Threshold: ${(currentPlayerRadius + currentAsteroidRadius).toFixed(3)}`);
            console.log(`- Player Radius: ${currentPlayerRadius.toFixed(3)}`);
            console.log(`- Asteroid Radius (userData): ${currentAsteroidRadius.toFixed(3)}`);
            console.log(`- Player Position: x=${player.position.x.toFixed(3)}, y=${player.position.y.toFixed(3)}, z=${player.position.z.toFixed(3)}`);
            console.log(`- Asteroid Position: x=${asteroid.position.x.toFixed(3)}, y=${asteroid.position.y.toFixed(3)}, z=${asteroid.position.z.toFixed(3)}`);
            console.log('- Asteroid Object:', asteroid); // In ra cả đối tượng để kiểm tra thêm
            // === DEBUG LOGGING END ===

            // Xóa thiên thạch va chạm khỏi scene và mảng
            scene.remove(asteroid); asteroids.splice(i, 1);
            endGame(); // Gọi hàm kết thúc game
            return; // Dừng hàm update ngay lập tức
        }
    }

    // --- Cập nhật Camera ---
    updateCamera(); // Gọi hàm cập nhật vị trí và hướng nhìn camera
}