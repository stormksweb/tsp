(function(){
  function launchPuppy(){
    const CFG = {
      PIXEL:       1,
      COLS:        56,
      ROWS:        36,
      PUPPY_SCALE: 1.0,
    };
  
    const P = CFG.PIXEL;
    const W = CFG.COLS;
    const H = CFG.ROWS;
  
    const canvas = document.getElementById('pc');
    canvas.width  = W * P;
    canvas.height = H * P;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
  
    let playing = false;
    let t = 0, raf;
  
    const C = {
      orange:  '#E8A050',
      cream:   '#F5DFB0',
      dark:    '#7A4A10',
      nose:    '#2C1206',
      eye:     '#1A0A02',
      white:   '#FFF5EC',
      collar:  '#4A8FD9',
      tag:     '#F0C030',
      tongue:  '#D94060',
      note1:   '#4A8FD9',
      note2:   '#E87A3A',
      ground:  '#8DBF7A',
      groundD: '#6A9E5A',
    };
  
    function px(x, y, color, alpha=1){
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x*P, y*P, P, P);
      ctx.globalAlpha = 1;
    }
  
    function rect(x, y, w, h, color){
      ctx.fillStyle = color;
      ctx.fillRect(x*P, y*P, w*P, h*P);
    }
  
  
    function drawIdle(ox, oy){
      const o = C.orange, cr = C.cream, dk = C.dark;
  
      rect(ox+19, oy+3, 2, 5, dk);
      px(ox+19, oy+2, o); px(ox+20, oy+2, o);
  
      rect(ox+3, oy+5, 16, 4, o);

      rect(ox+4, oy+6, 14, 3, cr);
  

      rect(ox+3, oy+5, 16, 1, C.collar);

      px(ox+10, oy+6, C.tag);
  

      rect(ox+4,  oy+9, 2, 3, dk);   
      rect(ox+8,  oy+9, 2, 3, dk);  
      rect(ox+13, oy+9, 2, 3, dk);  
      rect(ox+17, oy+9, 2, 3, dk);  

      rect(ox+3,  oy+11, 3, 1, o);
      rect(ox+7,  oy+11, 3, 1, o);
      rect(ox+12, oy+11, 3, 1, o);
      rect(ox+16, oy+11, 3, 1, o);
  
      
      rect(ox+2, oy+0, 8, 6, o);

      rect(ox+7, oy+3, 3, 3, cr);

      rect(ox+1, oy+1, 2, 4, dk);

      rect(ox+9, oy+1, 2, 4, dk);
  
      px(ox+4, oy+2, C.eye);
      px(ox+7, oy+2, C.eye);

      rect(ox+8, oy+4, 2, 1, C.nose);

      px(ox+8, oy+5, dk); px(ox+9, oy+5, dk);
    }
  
    function drawDance1(ox, oy){
      const o = C.orange, cr = C.cream, dk = C.dark;
  

      rect(ox+19, oy+1, 2, 4, dk);
      rect(ox+18, oy+0, 2, 2, dk);
      px(ox+17, oy+0, o);
  

      rect(ox+3, oy+4, 16, 4, o);
      rect(ox+4, oy+5, 14, 3, cr);
      rect(ox+3, oy+4, 16, 1, C.collar);
      px(ox+10, oy+5, C.tag);
  
     
      rect(ox+3,  oy+8,  2, 2, dk);   
      rect(ox+7,  oy+8,  2, 2, dk);   
      rect(ox+13, oy+8,  2, 3, dk);  
      rect(ox+17, oy+8,  2, 3, dk);   

      rect(ox+2,  oy+9,  3, 1, o);
      rect(ox+6,  oy+9,  3, 1, o);
      rect(ox+12, oy+10, 3, 1, o);
      rect(ox+16, oy+10, 3, 1, o);
  

      rect(ox+2, oy-1, 8, 6, o);
      rect(ox+7, oy+2, 3, 3, cr);

      rect(ox+1, oy-1, 2, 3, dk);

      rect(ox+9, oy+0, 2, 4, dk);
      px(ox+4, oy+1, C.eye);
      px(ox+7, oy+1, C.eye);
      rect(ox+8, oy+3, 2, 1, C.nose);
      
      px(ox+8, oy+4, C.tongue);
      px(ox+9, oy+5, C.tongue);
    }
  
    function drawDance2(ox, oy){
      const o = C.orange, cr = C.cream, dk = C.dark;
  

      rect(ox+19, oy+2, 2, 4, dk);
      rect(ox+20, oy+0, 2, 2, dk);
      px(ox+21, oy+0, o);
  

      rect(ox+3, oy+5, 16, 4, o);
      rect(ox+4, oy+6, 14, 3, cr);
      rect(ox+3, oy+5, 16, 1, C.collar);
      px(ox+10, oy+6, C.tag);
  
      
      rect(ox+4,  oy+9,  2, 3, dk);
      rect(ox+8,  oy+9,  2, 3, dk);
      rect(ox+13, oy+8,  2, 2, dk);  
      rect(ox+17, oy+8,  2, 2, dk);  
     
      rect(ox+3,  oy+11, 3, 1, o);
      rect(ox+7,  oy+11, 3, 1, o);
      rect(ox+12, oy+9,  3, 1, o);
      rect(ox+16, oy+9,  3, 1, o);
  
     
      rect(ox+2, oy+0, 8, 6, o);
      rect(ox+7, oy+3, 3, 3, cr);

      rect(ox+9, oy+0, 2, 3, dk);
    
      rect(ox+1, oy+1, 2, 4, dk);
      
      rect(ox+4, oy+2, 2, 1, C.eye);
      rect(ox+7, oy+2, 2, 1, C.eye);
      rect(ox+8, oy+4, 2, 1, C.nose);
   
      px(ox+8, oy+5, C.tongue);
      px(ox+7, oy+5, C.tongue);
    }
  

    let notes = [];
    let noteT = 0;
  
    function spawnNote(){
      const cx = Math.floor(W/2);
      notes.push({
        x: cx + (Math.random()>.5 ? 5 : -7) + Math.floor(Math.random()*4),
        y: Math.floor(H/2) - 2,
        vy: -(0.04 + Math.random()*0.03),
        a: 1,
        char: Math.random()>.5 ? '♪' : '♫',
        col: Math.random()>.5 ? C.note1 : C.note2
      });
    }
  
    function updateNotes(dt){
      for(let i=notes.length-1;i>=0;i--){
        const n=notes[i];
        n.y += n.vy * dt;
        n.a -= 0.0005 * dt;
        if(n.a<=0) notes.splice(i,1);
      }
    }
  
    function drawNotes(){
      notes.forEach(n=>{
        ctx.globalAlpha = Math.max(0, n.a);
        ctx.fillStyle = n.col;
        ctx.font = `bold ${P+2}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.char, n.x*P + P/2, n.y*P);
        ctx.globalAlpha = 1;
      });
    }
  
    function drawGround(){
      for(let x=0;x<W;x++){
        rect(x, H-2, 1, 1, x%2===0 ? C.ground : C.groundD);
        rect(x, H-1, 1, 1, C.groundD);
      }
    }
  
    let last = 0;
    let frame = 0;
    let frameTick = 0;
    const FRAME_DUR = 280;
  
    function loop(ts){
      const dt = ts - last;
      last = ts;
      t += dt;
  
      ctx.clearRect(0,0,canvas.width, canvas.height);

      let puppyX = Math.floor(W/2) - 11;
      let puppyY = Math.floor(H/2) - 6;
  
      if(playing){
        puppyX += Math.round(Math.sin(t * 0.0008) * 3);
        frameTick += dt;
        if(frameTick >= FRAME_DUR){ frameTick=0; frame=(frame+1)%2; }
        if(t - noteT > 600){ spawnNote(); noteT = t; }
        updateNotes(dt);
        drawNotes();
        if(frame===0) drawDance1(puppyX, puppyY);
        else          drawDance2(puppyX, puppyY);
      } else {
        frame=0; frameTick=0;
        drawIdle(puppyX, puppyY);
      }
  
      if(!playing){
        ctx.fillStyle = 'rgba(120,80,40,0.35)';
        ctx.font = `${P-1}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('press play', (W/2)*P, (H-4)*P);
      }
  
      raf = requestAnimationFrame(loop);
    }
  
    raf = requestAnimationFrame(loop);
  
    const btn  = document.getElementById('playButton');
    const btnPause  = document.getElementById('pauseButton');
  
    btn.addEventListener('click', ()=>{
      playing = true;
      
    });
    btnPause.addEventListener('click', ()=>{
      playing = false;
      if(!playing) notes = [];
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(launchPuppy);
    return; 
  }

  launchPuppy();

  
})();