document.querySelectorAll('a.cta-join-link').forEach(el => {
  el.setAttribute('href', '#leadership');
});


window.addEventListener('resize', () => {
  hideMobileNav()
});


async function copyValue(elementId) {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }
  const textToCopy = element.innerText || element.textContent;

  try {
    await navigator.clipboard.writeText(textToCopy);
    const originalText = element.innerText;
    element.innerText = "Copied!";
    setTimeout(() => element.innerText = originalText, 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Copied ID!');
    } catch (fallbackErr) {
      console.error('Fallback failed:', fallbackErr);
    }
    document.body.removeChild(textArea);
  }
}

const monthData = [
    { name: "January", message: "Peper" },
    { name: "February", message: "Parzival" },
    { name: "March", message: "Illusionist" },
    { name: "April", message: "Dendennis & Mouna" },
    { name: "May", message: "Cloud & Mali" },
    { name: "June", message: "Xtar" },
    { name: "July", message: "PT" },
    { name: "August", message: "Zobeeze" },
    { name: "September", message: "Lan & Amber" },
    { name: "October", message: "Shooter & Sethora" },
    { name: "November", message: "Whyme" },
    { name: "December", message: "Storm & CC" }
  ];
  
  function getRealMonth() {
    const monthIndex = new Date().getMonth();
    const data = monthData[monthIndex];

    const element = document.getElementById('hero-vip-name');
  
    if (element) {
        element.textContent = data.message;
    } else {
        console.log("No VIP available.");
    }

  }

  getRealMonth()



  const container = document.querySelector('.gallery-container');
  const leftArrow  = document.querySelector('.gallery-arrow--left');
  const rightArrow = document.querySelector('.gallery-arrow--right');
  const track = document.querySelector('.custom-scrollbar-track');
  const thumb = document.querySelector('.custom-scrollbar-thumb');
  const PADDING_LEFT = 50;
  const EDGE_THRESHOLD = 10;
  
  function getScrollAmount(direction) {
    const images = document.querySelectorAll('.gallery-image');
    const containerRect = container.getBoundingClientRect();
  
    if (direction === 'right') {
      for (const image of images) {
        const rect = image.getBoundingClientRect();
        if (rect.left > containerRect.left + EDGE_THRESHOLD) {
            if (rect.right > containerRect.right + EDGE_THRESHOLD) {
              return rect.left - containerRect.left - PADDING_LEFT;
            }
          }
      }
    }
  
    if (direction === 'left') {
      const reversed = [...images].reverse();
      for (const image of reversed) {
        const rect = image.getBoundingClientRect();
        if (rect.left < containerRect.left + PADDING_LEFT - EDGE_THRESHOLD) {
            return rect.left - containerRect.left - PADDING_LEFT;
          }
      }
    }
  
    return 0;
  }
  
  function updateThumb() {
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const thumbWidth = (clientWidth / scrollWidth) * track.clientWidth;
    const thumbLeft  = (scrollLeft / scrollWidth) * track.clientWidth;
    thumb.style.width = `${thumbWidth}px`;
    thumb.style.left  = `${thumbLeft}px`;
  }
  
  function updateArrows() {
    const { scrollLeft, scrollWidth, clientWidth } = container;
    leftArrow.disabled  = scrollLeft <= 0;
    rightArrow.disabled = scrollLeft + clientWidth >= scrollWidth - PADDING_LEFT;
    updateThumb();
  }
  
  leftArrow.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount('left'), behavior: 'smooth' });
  });
  
  rightArrow.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount('right'), behavior: 'smooth' });
  });
  
  container.addEventListener('scroll', () => {
    updateArrows();
    clearTimeout(container._scrollEndTimer);
    container._scrollEndTimer = setTimeout(updateArrows, 150);
  });
  window.addEventListener('resize', updateArrows);

  
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      updateThumb();
      updateArrows();
    });
  });




  let isDragging = false;
  let dragStartX = 0;
  let scrollStartLeft = 0;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let momentumFrame = null;
  
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    scrollStartLeft = container.scrollLeft;
    lastX = e.clientX;
    lastTime = performance.now();
    velocity = 0;
  
    cancelAnimationFrame(momentumFrame);
  
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
  
    const now = performance.now();
    const dt = now - lastTime;
  
    if (dt > 0) {
      velocity = (e.clientX - lastX) / dt;
    }
  
    lastX = e.clientX;
    lastTime = now;
  
    const delta = e.clientX - dragStartX;
    container.scrollLeft = scrollStartLeft - delta;
  });
  
  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.userSelect = '';
  
    startMomentum();
  });
  
  document.addEventListener('mouseleave', () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    container.style.userSelect = '';
    startMomentum();
  });
  
  function startMomentum() {
    const FRICTION = 0.92;        
    const MIN_VELOCITY = 0.05;
  
    function step() {
      if (Math.abs(velocity) < MIN_VELOCITY) return;
  
      container.scrollLeft -= velocity * 16;
      velocity *= FRICTION;
  
      updateArrows();
  
      momentumFrame = requestAnimationFrame(step);
    }
  
    momentumFrame = requestAnimationFrame(step);
  }





let audioCtx;
let filter;
let source;
let isWebAudioSupported = true;

  function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 22050;
        filter.connect(audioCtx.destination);
    }
}

  document.getElementById("playButton").addEventListener("click", function () {
    if (!song.src) {
        document.getElementById("loadSongWrapper").style.display = "flex";
        song.src = "assets/song/raise-the-banner.mp3"; 
        song.load();
    }
    document.getElementById("playButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "flex";
    initAudioContext();
    if (song.paused) {
      song.play().then(() => {
        if (isWebAudioSupported && !source) {
          source = audioCtx.createMediaElementSource(song);
          source.connect(filter);
        }
      }).catch((error) => {
        console.error("Playback error:", error);
        isWebAudioSupported = false;
      });
    }
  });
  
  document.getElementById("pauseButton").addEventListener("click", function () {
    song.pause();
    document.getElementById("playButton").style.display = "flex";
    document.getElementById("pauseButton").style.display = "none";
  });

let bufferInterval = null;

function startBufferTracking() {
  if (bufferInterval) return;

  bufferInterval = setInterval(() => {
    if (song.buffered.length > 0 && song.duration) {
      const bufferedEnd = song.buffered.end(song.buffered.length - 1);
      const percent = (bufferedEnd / song.duration) * 100;

      document.getElementById("loadSongWrapper").style.display = "flex";

      if (percent >= 50) {
        document.getElementById("loadSongWrapper").style.display = "none";
        clearInterval(bufferInterval);
        bufferInterval = null;
      }
    }
  }, 500);
}

song.addEventListener("play", startBufferTracking);

  document.querySelector('.nav-menu-open').addEventListener('click', () => {
    toggleMobileNav()    
  });
  document.querySelector('.nav-menu-close').addEventListener('click', () => {
    toggleMobileNav()
  });

  function toggleMobileNav(){
    document.querySelector('.nav-menu-mobile').classList.toggle('active');
    document.querySelector('.nav-menu-close').classList.toggle('active');
    document.querySelector('.nav').classList.toggle('active');
    document.querySelector('.nav-menu-open').classList.toggle('hide');
  }


    const mobileLinks = document.querySelectorAll('.nav-menu-mobile a')
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          hideMobileNav()
        });
    })


    function hideMobileNav(){
      document.querySelector('.nav-menu-mobile').classList.remove('active');
      document.querySelector('.nav-menu-close').classList.remove('active');
      document.querySelector('.nav').classList.remove('active');
      document.querySelector('.nav-menu-open').classList.remove('hide');
    }