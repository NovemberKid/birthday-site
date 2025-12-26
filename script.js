// --- CLOCK ---
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('live-date').innerText = now.toLocaleDateString(undefined, options);
}
setInterval(updateClock, 1000); updateClock();

// --- STARS ---
const starCanvas = document.getElementById('star-canvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];
let starSpeedMultiplier = 1;

function initStars() {
    starCanvas.width = window.innerWidth; starCanvas.height = window.innerHeight;
    for (let i = 0; i < 200; i++) stars.push({ x: Math.random() * starCanvas.width, y: Math.random() * starCanvas.height, size: Math.random() * 2, opacity: Math.random(), speed: Math.random() * 0.05 });
}

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(s => {
        s.y += s.speed * starSpeedMultiplier;
        if (s.y > starCanvas.height) { s.y = 0; s.x = Math.random() * starCanvas.width; }
        starCtx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
        starCtx.beginPath(); starCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); starCtx.fill();
    });
    requestAnimationFrame(animateStars);
}

// --- MUSIC ---
const songs = ['assets/song-1.mp3', 'assets/song-2.mp3']; 
let songIdx = 0;
const music = document.getElementById('bg-music');
function startExperience() {
    music.src = songs[songIdx]; 
    music.play().catch(e => console.log("Click required"));
    document.getElementById('music-player').classList.remove('hidden');
    goToScene(2); 
    decorate();
}
function togglePlay() { music.paused ? music.play() : music.pause(); }
function nextSong() { songIdx = (songIdx + 1) % songs.length; music.src = songs[songIdx]; music.play(); }

// --- NAV ---
function goToScene(idx) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${idx}`).classList.add('active');
}

// --- SCENE 2 ---
function decorate() {
    const container = document.getElementById('balloon-container');
    for (let i = 0; i < 20; i++) {
        let b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 90 + 'vw';
        const hue = Math.random() * 360;
        b.style.setProperty('--color', `hsl(${hue}, 70%, 70%)`);
        b.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(b);
    }
    setTimeout(() => { goToScene(3); startCakeSequence(); }, 8000);
}

// --- SCENE 3 ---
function startCakeSequence() {
    const wrapper = document.getElementById('cake-wrapper');
    const display = document.getElementById('countdown-display');
    setTimeout(() => wrapper.classList.add('slide-in'), 500);
    setTimeout(() => {
        display.classList.remove('hidden');
        let count = 3; display.innerText = count;
        let timer = setInterval(() => {
            count--;
            if (count > 0) {
                display.innerText = count;
            } else if (count === 0) {
                clearInterval(timer);
                display.innerText = "BLOW!";
                document.getElementById('cake-msg').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('candle-flame').style.opacity = "0"; 
                    document.getElementById('cake-msg').innerText = "YAY! PARTY TIME!";
                    setTimeout(() => startMemoryLane(), 2000); 
                }, 1500);
            }
        }, 1000);
    }, 3000);
}

// --- SCENE 4 ---
function startMemoryLane() {
    goToScene(4);
    spawnNeonDoodles();
    generateMemoryItems();
}
function spawnNeonDoodles() {
    const container = document.getElementById('neon-doodles');
    for(let i=0; i<30; i++) {
        const sprite = document.createElement('div');
        sprite.style.cssText = `position:absolute; width:4px; height:4px; background:#fff; box-shadow:0 0 10px #0ff; top:${Math.random()*100}%; left:${Math.random()*100}%; border-radius:50%; animation: float 3s infinite;`;
        container.appendChild(sprite);
    }
}
function generateMemoryItems() {

    const track = document.getElementById('memory-track');



  

    const notes = [

        "1. Main Character Energy ✨",   // Matches 1.jpg

        "2. Happiness is a hug from Mom😌",     // Matches 2.jpg

        "3. Little rowwit's Fit-Check!!! 😍",      // Matches 3.jpg

        "4. Look at this cutie!",              // Matches 4.jpg

        "5. So much running ufffff 🤧",    // Matches 5.jpg

        "6. Who is this DIVA!!!💅💅",

        "7. Chaos Duo 😈",             // Matches 6.jpg        // Matches 7.jpg

        "8. This fit though 🔥",       // Matches 8.jpg

        "9. Slayyyy Queen 💅",       // Matches 9.jpg

        "10. Dayummmmmmmmmm my man....",           // Matches 10.jpg

        "11. Too glam to give a damn",   // Matches 11.jpg        // Matches 12.jpg

        "12. Us against the world",

        "13. Partner in crime",       // Matches 13.jpg

        "14. Cutest smile ever!",     // Matches 14.jpg

        "15. Happy Birthday Love ❤️"     // Matches 15.jpg

    ];




    for(let i=1; i<=15; i++) {

        const div = document.createElement('div');

        div.className = 'memory-item';

       

        

        const src = `assets/${i}.jpg`;

       

        

        const rot = (Math.random() - 0.5) * 20;

       

        

        const noteText = notes[i-1];



        div.innerHTML = `

            <img src="${src}" class="mem-pic" style="--rot:${rot}deg" onerror="this.style.display='none'">

            <div class="mem-note">${noteText}</div>

        `;

        track.appendChild(div);

    }

}

function checkRiddle() {

    const answer = document.getElementById('riddle-answer').value.toLowerCase().trim();

    if (answer === "little girl" || answer === "me") { goToScene(5); }

    else { alert("Hint:😏Bolo na!!!"); }

}



// --- SCENE 6: FINALE ---
function startFinale() {
    document.getElementById('final-inputs').style.display = 'none';
    const rocketCont = document.getElementById('rocket-container');
    rocketCont.classList.remove('hidden');
    
    // 1. POSITION ROCKET START
    let position = -700; 
    rocketCont.style.bottom = position + "px"; 
    
    // 2. ENGINE RUMBLE (2s)
    rocketCont.classList.add('engine-start');
    
    setTimeout(() => {
        // 3. SLOW LAUNCH
        starSpeedMultiplier = 30;
        
        const target = window.innerHeight / 2; // Center
        const speed = 1.5; // SLOWER SPEED
        
        function fly() {
            position += speed;
            rocketCont.style.bottom = position + "px";
            
            if (position < target) {
                requestAnimationFrame(fly);
            } else {
                // 4. REACHED CENTER -> EXPLODE
                starSpeedMultiplier = 1;
                rocketCont.style.display = 'none'; // Poof
                startFireworks(true);
                
                // 5. SHOW MENU & TEXT (Late)
                setTimeout(() => {
                    document.getElementById('final-text-container').classList.remove('hidden');
                    document.getElementById('final-options').classList.remove('hidden');
                }, 8000); // 8 Seconds later
            }
        }
        requestAnimationFrame(fly);
    }, 2000); // Wait 2s for engine rumble
}

function stayWatching() {
    
    document.getElementById('final-text-container').classList.add('hidden');
}

function startFireworks(initialBlast) {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let particles = [];
    
    function createParticles(x, y, count) {
        const colors = ['#ff0000', '#ffd700', '#ff69b4', '#ffffff', '#00ff00'];
        const color = colors[Math.floor(Math.random()*colors.length)];
        for(let i=0; i<count; i++) {
            particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20,
                alpha: 1,
                color: color,
                drag: 0.95,
                gravity: 0.1,
                decay: 0.005 + Math.random() * 0.01
            });
        }
    }
    
    if(initialBlast) { createParticles(canvas.width/2, canvas.height/2, 400); }
    setInterval(() => { createParticles(Math.random()*canvas.width, Math.random()*canvas.height*0.6, 100); }, 600);
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p,i) => {
            p.vx *= p.drag; p.vy *= p.drag; p.vy += p.gravity;
            p.x += p.vx; p.y += p.vy; p.alpha -= p.decay;
            ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
            if(p.alpha<=0) particles.splice(i,1);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

initStars(); animateStars();