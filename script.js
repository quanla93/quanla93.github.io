// ===== Typing Effect =====
const titles = [
    'enterprise-grade systems.',
    'performance-critical backends.',
    'data-intensive platforms.',
    'production-ready solutions.',
    'systems that scale.'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTitle = document.getElementById('dynamicTitle');

function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
        dynamicTitle.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicTitle.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= dx * force * 0.01;
            this.y -= dy * force * 0.01;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

animate();

// ===== Scroll Animations (AOS) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== Stats Counter =====
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.dataset.count);
            let current = 0;
            const increment = count / 40;
            const duration = 1500;
            const stepTime = duration / 40;

            const counter = setInterval(() => {
                current += increment;
                if (current >= count) {
                    target.textContent = count;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current);
                }
            }, stepTime);

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// ===== Spring Boot Intro =====
(() => {
    const bootScreen = document.getElementById('bootScreen');
    const bootLog = document.getElementById('bootLog');
    const bootSkip = document.getElementById('bootSkip');
    if (!bootScreen || !bootLog) return;

    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const t = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const lines = [
        { delay: 120,  html: `<span class="ts">${t}.142</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> o.s.b.StartupInfoLogger      : Starting Portfolio v4.7.0 on quanla.org with PID 1 (Java 21)` },
        { delay: 240,  html: `<span class="ts">${t}.287</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> c.q.PortfolioApplication     : The following profiles are active: production` },
        { delay: 380,  html: `<span class="ts">${t}.451</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> o.s.b.w.embedded.tomcat      : Tomcat initialized with port 8080 (http)` },
        { delay: 520,  html: `<span class="ts">${t}.598</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> o.h.e.t.j.p.i.JtaPlatform    : HHH000490: Using JtaPlatformInitiator` },
        { delay: 660,  html: `<span class="ts">${t}.742</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> c.q.config.ExperienceLoader  : Loaded 4+ years of Java &middot; SQL Server tuning &middot; 100M+ records optimized` },
        { delay: 800,  html: `<span class="ts">${t}.893</span>  <span class="lvl-info">INFO</span> 1 --- <span class="src">[main]</span> o.s.b.w.embedded.tomcat      : Tomcat started on port 8080 (http) with context path '/'` },
        { delay: 940,  html: `<span class="ts">${t}.991</span>   <span class="lvl-ok">OK</span>  1 --- <span class="src">[main]</span> c.q.PortfolioApplication     : Started Portfolio in 1.213 seconds (JVM running for 1.487)` },
        { delay: 1080, html: `<span class="ts">${t}.998</span>   <span class="lvl-ok">OK</span>  1 --- <span class="src">[main]</span> c.q.PortfolioApplication     : Welcome, visitor. Press <kbd>Esc</kbd> to skip, or just scroll.` },
    ];

    const timers = [];
    lines.forEach(({ delay, html }) => {
        timers.push(setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'line';
            div.innerHTML = html;
            bootLog.appendChild(div);
        }, delay));
    });

    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        timers.forEach(clearTimeout);
        bootScreen.classList.add('done');
        document.body.classList.remove('booting');
        setTimeout(() => bootScreen.remove(), 500);
    };

    timers.push(setTimeout(finish, 1800));

    bootSkip?.addEventListener('click', finish);
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
            finish();
            document.removeEventListener('keydown', onEsc);
        }
    });
})();

// ===== Lights-off Flashlight =====
(() => {
    const mask = document.getElementById('lightsMask');
    const btn = document.getElementById('lightsToggle');
    if (!mask || !btn) return;

    const setPos = (x, y) => {
        mask.style.setProperty('--mx', x + 'px');
        mask.style.setProperty('--my', y + 'px');
    };
    setPos(window.innerWidth / 2, window.innerHeight / 2);

    window.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('lights-off')) return;
        setPos(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!document.body.classList.contains('lights-off')) return;
        const t = e.touches[0];
        if (t) setPos(t.clientX, t.clientY);
    }, { passive: true });

    const toggle = () => {
        const on = document.body.classList.toggle('lights-off');
        btn.classList.toggle('is-off', on);
        btn.querySelector('i').className = on ? 'fas fa-moon' : 'fas fa-lightbulb';
        btn.title = on ? 'Lights on (L)' : 'Lights off (L)';
    };

    btn.addEventListener('click', toggle);
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) return;
        if (e.key === 'l' || e.key === 'L') toggle();
    });
})();

// ===== Terminal =====
(() => {
    const term = document.getElementById('terminal');
    const openBtn = document.getElementById('terminalOpenBtn');
    const closeBtn = document.getElementById('terminalClose');
    const body = document.getElementById('terminalBody');
    const output = document.getElementById('terminalOutput');
    const input = document.getElementById('terminalInput');
    if (!term || !input) return;

    const print = (html, cls = '') => {
        const div = document.createElement('div');
        div.className = 't-line ' + cls;
        div.innerHTML = html;
        output.appendChild(div);
        body.scrollTop = body.scrollHeight;
    };

    const echo = (cmd) => {
        const div = document.createElement('div');
        div.className = 't-line t-echo';
        div.innerHTML = `<span class="terminal-prompt">guest@quanla.org:~$</span><span>${escapeHtml(cmd)}</span>`;
        output.appendChild(div);
    };

    const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

    const open = () => {
        document.body.classList.add('terminal-open');
        term.setAttribute('aria-hidden', 'false');
        setTimeout(() => input.focus(), 60);
    };
    const close = () => {
        document.body.classList.remove('terminal-open');
        term.setAttribute('aria-hidden', 'true');
        input.blur();
    };

    const FS = {
        'about.md':       () => print(`Le Anh Quan &mdash; Java Backend Developer (Middle) &amp; Project Lead @ BHSoft.<br>4+ years building enterprise systems for clients across Europe &amp; Asia.<br>Specialty: <span class="t-accent">SQL Server tuning, large-scale data processing, performance engineering</span>.`),
        'skills.txt':     () => print(`<span class="t-cmd">core</span>        Java &middot; Spring Boot &middot; Spring Security &middot; JPA/Hibernate &middot; Vaadin\n<span class="t-cmd">data</span>        SQL Server &middot; PostgreSQL &middot; MySQL &middot; Redis &middot; Kafka\n<span class="t-cmd">perf</span>        partitioning &middot; covering indexes &middot; stored procs &middot; query plan tuning\n<span class="t-cmd">infra</span>       Docker &middot; Proxmox VE &middot; KVM/LXC &middot; Tailscale &middot; Prometheus &middot; Grafana\n<span class="t-cmd">auth</span>        OAuth2 / OIDC &middot; Keycloak &middot; JWT`),
        'experience.log': () => print(`<span class="t-ok">[KMA]</span>     stored proc rewrite: inventory-take 50M rows, 30min &rarr; 5-10min (~75% faster)\n<span class="t-ok">[KMA]</span>     stock-event reports on 50M+ rows: +50% faster via partitioning + covering indexes\n<span class="t-ok">[KMA]</span>     per-cycle in-memory cache; eliminated repeated DB round-trips on hot paths\n<span class="t-ok">[ARPV]</span>    LIFO/FIFO classification engine (ISO 22628:2002), ~20% throughput gain\n<span class="t-ok">[ARPV]</span>    legacy Java EE &rarr; Spring Boot migration via REST APIs`),
        'contact.vcf':    () => print(`<span class="t-cmd">email   </span> <a href="mailto:quanla.work@gmail.com" class="t-accent">quanla.work@gmail.com</a>\n<span class="t-cmd">phone   </span> +84 357 531 557\n<span class="t-cmd">linkedin</span> <a href="https://linkedin.com/in/quanla-work" target="_blank" class="t-accent">linkedin.com/in/quanla-work</a>\n<span class="t-cmd">github  </span> <a href="https://github.com/quanla93" target="_blank" class="t-accent">github.com/quanla93</a>\n<span class="t-cmd">location</span> Ha Noi, Viet Nam`),
        'homelab.conf':   () => print(`# Personal homelab\nhost      = Proxmox VE\nvirt      = KVM &middot; LXC\nmesh      = Tailscale\nmonitor   = Prometheus + Grafana\nstatus    = <span class="t-ok">healthy</span>  &nbsp; uptime: 73 days`),
    };

    const PROJECTS = {
        'KMA':     'Enterprise inventory & menu management. Lead a 3-engineer sub-team. Optimized stored procs over 50M-row tables; print path streams chunked PDF/Excel.',
        'ARPV':    'European vehicle recycling compliance (ISO 22628:2002). LIFO/FIFO classification engine, Spring Boot + Keycloak.',
        'DUCCIO':  'B2B tailoring & supply chain. Dual stack: Java/Spring Boot + C#/ASP.NET. Article management module.',
        'homelab': 'Self-hosted Proxmox cluster running this very portfolio. Tailscale mesh, Prometheus + Grafana monitoring.',
    };

    const commands = {
        help: () => print(
`Available commands:
  <span class="t-cmd">whoami</span>           who is this guy
  <span class="t-cmd">ls</span> [path]        list files / directories
  <span class="t-cmd">cat</span> &lt;file&gt;      print a file
  <span class="t-cmd">date</span>             current date
  <span class="t-cmd">echo</span> &lt;text&gt;     repeat text
  <span class="t-cmd">pwd</span>              print working dir
  <span class="t-cmd">sudo hire-me</span>     ...just try it
  <span class="t-cmd">clear</span>            clear screen  (<span class="t-key">Ctrl+L</span>)
  <span class="t-cmd">exit</span>             close terminal (<span class="t-key">Esc</span>)`),
        whoami: () => print(`<span class="t-accent">Le Anh Quan</span> &mdash; Java Backend Developer (Middle) &amp; Project Lead @ BHSoft, Ha Noi.`),
        pwd:    () => print('/home/guest'),
        date:   () => print(new Date().toString()),
        ls: (args) => {
            const path = (args[0] || '').replace(/\/$/, '');
            if (!path) {
                print(`<span class="t-dir">projects/</span>  about.md  skills.txt  experience.log  contact.vcf  homelab.conf`);
            } else if (path === 'projects') {
                print(`<span class="t-dir">KMA/</span>  <span class="t-dir">ARPV/</span>  <span class="t-dir">DUCCIO/</span>  <span class="t-dir">homelab/</span>`);
            } else {
                print(`ls: cannot access '${escapeHtml(path)}': No such directory`, 't-err');
            }
        },
        cat: (args) => {
            const f = args[0];
            if (!f) { print(`cat: missing operand. Try <span class="t-cmd">ls</span> to see files.`, 't-err'); return; }
            if (FS[f]) { FS[f](); return; }
            const m = f.match(/^projects\/([A-Za-z]+)\/?$/);
            if (m && PROJECTS[m[1]]) { print(PROJECTS[m[1]]); return; }
            print(`cat: ${escapeHtml(f)}: No such file or directory`, 't-err');
        },
        echo: (args) => print(escapeHtml(args.join(' '))),
        clear: () => { output.innerHTML = ''; },
        exit: () => close(),
        sudo: (args) => {
            if (args[0] === 'hire-me') {
                print(`[sudo] password for guest: <span class="t-muted">***************</span>`);
                setTimeout(() => print(`<span class="t-ok">Authentication successful.</span> Opening mail client...`), 400);
                setTimeout(() => { window.location.href = 'mailto:quanla.work@gmail.com?subject=Let%27s%20work%20together'; }, 1100);
            } else {
                print(`sudo: ${escapeHtml(args.join(' ') || '?')}: command not found`, 't-err');
            }
        },
    };

    const history = [];
    let histIdx = -1;

    const run = (raw) => {
        const line = raw.trim();
        echo(raw);
        if (!line) return;
        history.push(line); histIdx = history.length;
        const parts = line.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        if (commands[cmd]) commands[cmd](args);
        else print(`bash: ${escapeHtml(cmd)}: command not found. Try <span class="t-cmd">help</span>.`, 't-err');
        body.scrollTop = body.scrollHeight;
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            run(val);
        } else if (e.key === 'ArrowUp') {
            if (history.length && histIdx > 0) { histIdx--; input.value = history[histIdx]; }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
            else { histIdx = history.length; input.value = ''; }
            e.preventDefault();
        } else if (e.key === 'l' && e.ctrlKey) {
            output.innerHTML = '';
            e.preventDefault();
        }
    });

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    term.addEventListener('click', (e) => { if (e.target === term) close(); });

    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) {
            if (e.key === 'Escape' && document.body.classList.contains('terminal-open')) close();
            return;
        }
        if (e.key === '`' || e.key === '~') { e.preventDefault(); open(); }
        if (e.key === 'Escape' && document.body.classList.contains('terminal-open')) close();
    });
})();

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #06b6d4)';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
