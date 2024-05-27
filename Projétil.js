var myBullets = [];
var lastFireTime = 0;
var fireCooldown = 150; // Cooldown in milliseconds
if (myGameArea.keys && myGameArea.keys[38]) {fireBullet(); } // seta para cima
function fireBullet() {
    var now = new Date().getTime();
    if (now - lastFireTime > fireCooldown) {
        lastFireTime = now;
        var x = myGamePiece.x + myGamePiece.width / 2;
        var y = myGamePiece.y;
        var newBullet = new bullet(x, y);
        myBullets.push(newBullet);
    }
}