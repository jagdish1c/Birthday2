// const audio = document.getElementById('backgroundMusic');
// const birthdayMusic = document.getElementById('birthdayMusic');

// document.getElementById('dialogBtn').onclick = () => {
//   console.log("Clicked")
//   document.getElementById('myDialog').showModal();
//   document.getElementById('myDialog').scrollTop = 0;
//   birthdayMusic.pause();
//   audio.muted = false;
//   audio.play();
// };

// document.getElementById('closeBtn').onclick = () => {
//   document.getElementById('myDialog').close();
//   audio.pause();
//   audio.currentTime = 0;
//   birthdayMusic.play();
// };

// document.querySelector('.Picture-note-video span').onclick = () => {
//   document.getElementById('myDialog').showModal();
//   document.getElementById('myDialog').scrollTop = 0;
//   birthdayMusic.pause();
//   audio.muted = false;
//   audio.play();
// };





document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('backgroundMusic');
  const birthdayMusic = document.getElementById('birthdayMusic');
  const dialog = document.getElementById('myDialog');

  // Polyfill support
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  const createHeart = (x, y) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 2000);
  };

  const openDialog = (event) => {
    console.log("Clicked");
    
    // Create heart animation at click position
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createHeart(
          x + (Math.random() - 0.5) * 60,
          y + (Math.random() - 0.5) * 60
        );
      }, i * 100);
    }
    
    dialog.showModal();
    dialog.scrollTop = 0;
    birthdayMusic.pause();
    
    const perfectVideo = document.getElementById('perfect_video');
    if (perfectVideo) {
      perfectVideo.play();
    }
  };

  const resetCardPositions = () => {
    const pictures = document.querySelectorAll('.Picture, .Picture-video');
    pictures.forEach(picture => {
      const range = 100;
      const randomX = Math.random() * (range * 2) - range;
      const randomY = Math.random() * (range * 2) - range;
      const randomRotate = Math.random() * (range / 2) - range / 4;
      picture.style.top = `${randomY}px`;
      picture.style.left = `${randomX}px`;
      picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
    });
  };

  const closeDialog = () => {
    const perfectVideo = document.getElementById('perfect_video');
    if (perfectVideo) {
      perfectVideo.pause();
      perfectVideo.currentTime = 0;
    }
    location.reload();
    resetCardPositions();
  };

  const dialogBtn = document.getElementById('dialogBtn');
  if (dialogBtn) {
    dialogBtn.addEventListener('click', openDialog);
  }
  
  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDialog);
  }
});
