const pictures = document.querySelectorAll('.Picture');
var previousTouch = undefined;
var velocity = { x: 0, y: 0 };
var lastTime = 0;

document.addEventListener('DOMContentLoaded', function() {
    
});
function updateElementPosition(element, event) {
  var movementX, movementY;
  const currentTime = Date.now();
  const deltaTime = currentTime - lastTime;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? (touch.clientX - previousTouch.clientX) * 1.5 : 0;
    movementY = previousTouch ? (touch.clientY - previousTouch.clientY) * 1.5 : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }
  
  if (deltaTime > 0) {
    velocity.x = movementX / deltaTime * 16;
    velocity.y = movementY / deltaTime * 16;
  }
  
  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left|| 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
  lastTime = currentTime;
  
  // Play birthday music when pic1 is moved
  if (element.id === 'pic1') {
    const birthdayMusic = document.getElementById('birthdayMusic');
    birthdayMusic.play().catch(e =>console.log("Error while playing music"));
  }
}

function startDrag(element, event) {
  // Enable audio on first user interaction
  if (element.id === 'pic1') {
    const birthdayMusic = document.getElementById('birthdayMusic');
    birthdayMusic.muted = false;
  }

  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({update: updateFunction, stop: stopFunction}, element);
  lastTime = Date.now();
  velocity = { x: 0, y: 0 };
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
  
}

function applyInertia(element) {
  const friction = 0.95;
  const minVelocity = 0.1;
  
  function animate() {
    if (Math.abs(velocity.x) < minVelocity && Math.abs(velocity.y) < minVelocity) return;
    
    const currentX = parseInt(element.style.left || 0);
    const currentY = parseInt(element.style.top || 0);
    
    element.style.left = (currentX + velocity.x) + "px";
    element.style.top = (currentY + velocity.y) + "px";
    
    velocity.x *= friction;
    velocity.y *= friction;
    
    requestAnimationFrame(animate);
  }
  
  if (Math.abs(velocity.x) > minVelocity || Math.abs(velocity.y) > minVelocity) {
    animate();
  }
}

function stopDrag(functions, element) {
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
  applyInertia(element);
}

pictures.forEach(picture => {
  const range = 100;
  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;
  const startFunction = (event) => startDrag(picture, event);
  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
  picture.addEventListener("mousedown", startFunction);
  picture.addEventListener("touchstart", startFunction);
});

// Video controls for birthday music
const video = document.querySelector('.Picture-img-video');
const birthdayMusic = document.getElementById('birthdayMusic');

if (video && birthdayMusic) {
  video.addEventListener('play', () => {
    birthdayMusic.pause();
  });
}