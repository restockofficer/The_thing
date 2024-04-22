const adiv = document.getElementById('mydiv');
let leftpos = 0;

function movediv(timestamp){
  leftpos += 5;
  adiv.style.left = leftpos + 'px';
  requestAnimationFrame(movediv);
}

requestAnimationFrame(movediv);