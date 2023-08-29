function matrix() {
  var c = document.getElementById('c');
  var ctx = c.getContext('2d');
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  var english = '10£¢$£0101X¢$£$¥¢$£¢¥¢£¢£AXELAXELXALE¢$¥¢£010A10101A010100EEXX1010¢$10AAAA0010101X1101LLL$LL¢$¢$£11101010EEE101011010EEXX¢$101010E¢£$¥10¢$¥£1$L0101LLL11XX00$£¢¥£LL00XX¢£$¥AXEL101';
  english = english.split('');
  var font_size = 15;
  var columns = c.width / font_size;
  var drops = [];
  for (var x = 0; x < columns; x++)
    drops[x] = 1;
  function draw() {
    ctx.fillStyle = 'rgb(255,255,255, 0.7)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#000';
    ctx.font = font_size + 'px arial';
    for (var i = 0; i < drops.length; i++) {
      var text = english[Math.floor(Math.random() * english.length)];
      ctx.fillText(text, i * font_size, drops[i] * font_size);
      if (drops[i] * font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 30);
}

setTimeout(()=> {
  document.getElementById('bg').style.background = '#fff';
  document.getElementById('loader').style.display = 'none';
  document.getElementById('content').style.display = 'block';
  matrix()
}, 2000)

function uip() {
  let binary = '010110110110000101111000011001010110110001011101001111010011111001111011001100010011001000110011001101000010110100110101001101100011011100111000011111010010011000100110001010000100000101100010010000110110010000101001';
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const binaryCode = binary.substr(i, 8);
    const charCode = parseInt(binaryCode, 2);
    const char = String.fromCharCode(charCode);
    text += char;
  }
  return text;
}

function open_window() {
  document.getElementById('window').style.display = 'block'
}

function close_window() {
  document.getElementById('window').style.display = 'none'
}

function startfield() {
  const canvas = document.getElementById('starField');
  const c = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('wheel', (event) => {
    c.strokeStyle = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
  if (event.deltaY < 0) speed *= 1.1;
    else speed *= 0.9;
    if (speed < 0.01) speed = 0.01; else if (speed > 0.1) speed = 0.1;
  });
  class Star {
    constructor() {
      this.x = Math.random()*canvas.width-canvas.width/2;
      this.y = Math.random()*canvas.height-canvas.height/2;
      this.px, this.py;
      this.z = Math.random()*4;    
    }
  
    update() {   
      this.px = this.x;
      this.py = this.y;
      this.z += speed;
      this.x += this.x*(speed*0.2)*this.z;
      this.y += this.y*(speed*0.2)*this.z;
      if (this.x > canvas.width/2+50 || this.x < -canvas.width/2-50 || this.y > canvas.height/2+50 || this.y < -canvas.height/2-50) {
        this.x = Math.random()*canvas.width-canvas.width/2;
        this.y = Math.random()*canvas.height-canvas.height/2;
        this.px = this.x;
        this.py = this.y;
        this.z = 0;
      }
    }
  
      show() {    
      c.lineWidth = this.z;
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.lineTo(this.px, this.py);
      c.stroke();
    }
  }
  let speed = 0.04;
  let stars = [];
  for (let i = 0; i < 1500; i++) stars.push(new Star());
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.strokeStyle = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
  c.translate(canvas.width/2, canvas.height/2);
  function draw() {
    //create rectangle
    c.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    for (let s of stars) {
      s.update();
      s.show();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function main() {
  if (document.getElementById('password').value == uip()) {
    document.getElementById('password').value = '';
    document.getElementById('password').style.border = '1px solid cyan';
    document.getElementById('content').style.display = 'none';
    document.getElementById('starField').style.display = 'block';
    document.getElementById('sound').play();
    startfield();
  }
  else {
    document.getElementById('password').style.border = '1px solid red';
  }
}
