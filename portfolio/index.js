const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("nav-links");
        const navLinksA = document.querySelectorAll(".nav-link"); // Select by class for more flexibility
        const sections = document.querySelectorAll('section');
        const downloadResumeBtnTop = document.getElementById("downloadResumeBtn");
        const downloadResumeBtnBottom = document.getElementById("downloadResumeBtnBottom");
        const scrollTopBtn = document.querySelector('.scroll-top-btn');

        // Toggle Hamburger Menu
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active"); // Also toggle hamburger icon animation
        });

        // Close mobile menu on link click and smooth scroll
        navLinksA.forEach(link => {
            link.addEventListener("click", function(e) {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    hamburger.classList.remove("active");
                }
                // Optional: Smooth scroll handled by CSS scroll-behavior: smooth;
                // If you need more control or polyfill for older browsers, you'd add e.preventDefault();
                // and a custom scroll function here.
            });
        });

        // Resume Download Functionality
        const resumeDownloadURL = "https://drive.google.com/uc?export=download&id=YOUR_RESUME_FILE_ID"; // IMPORTANT: Replace with your actual Google Drive File ID or direct link

        downloadResumeBtnTop.addEventListener("click", () => {
            window.open(resumeDownloadURL, "_blank");
        });

        downloadResumeBtnBottom.addEventListener("click", () => {
            window.open(resumeDownloadURL, "_blank");
        });

        // Section Fade-in on Scroll (Intersection Observer)
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Optional: stop observing once it's visible
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: remove 'show' class if it goes out of view
                    // entry.target.classList.remove('show');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Active Nav Link on Scroll
        const header = document.querySelector('header'); // Use header height for offset
        const navHeight = document.querySelector('nav').offsetHeight; // Get dynamic nav height

        window.addEventListener('scroll', () => {
            let currentSection = '';
            const scrollY = window.scrollY + navHeight + 10; // Add some offset for smoother highlight transition

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinksA.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSection)) {
                    link.classList.add('active');
                }
            });

            // Handle hero section separately for initial load/top of page
            if (window.scrollY === 0) {
                navLinksA.forEach(link => link.classList.remove('active'));
                // You could optionally highlight 'About Me' or no link if preferred at top
            }
        });

        // Scroll to Top Button Functionality
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Set initial active nav link on page load if hash exists
        document.addEventListener('DOMContentLoaded', () => {
            if (window.location.hash) {
                const targetId = window.location.hash.substring(1);
                navLinksA.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            } else {
                // If no hash, activate "About" or the first link by default
                const firstNavLink = document.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.classList.add('active');
                }
            }
        });
// Smooth scroll for contact links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // adjust for nav height
        behavior: 'smooth'
      });
    }
  });
});

// Download resume buttons (top and bottom)
const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #downloadResumeBtnBottom');
downloadBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Resume file URL (replace with your actual resume file URL)
    const resumeURL = 'assets/RamaVenkata_Manikanta_Sairam_Kattunga_Resume.pdf';

    // Create an invisible link and click to download
    const a = document.createElement('a');
    a.href = resumeURL;
    a.download = 'RamaVenkata_Manikanta_Sairam_Kattunga_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Button feedback
    btn.textContent = 'Downloading...';
    setTimeout(() => {
      btn.textContent = 'Download Resume';
    }, 2000);
  });
});

// tsParticles background
tsParticles.load("hero-bg", {
  fullScreen: { enable: false },
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: ["#00e6d0", "#fff", "#0ff", "#39f"] },
    shape: {
      type: ["char", "circle"],
      character: [
        { value: ["{", "}", "<", ">", "/", ";", ":", "=", "(", ")", "[", "]", "λ", "π", "Σ", "∑", "∫", "ƒ", "Ω", "β", "α"], font: "Fira Mono", style: "", weight: "bold" }
      ]
    },
    opacity: { value: 0.7, random: true },
    size: { value: 18, random: { enable: true, minimumValue: 10 } },
    move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "out" } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, resize: true },
    modes: { repulse: { distance: 80, duration: 0.4 } }
  },
  detectRetina: true,
  background: { color: "transparent" }
});

// Interactive skill groups
document.querySelectorAll('.skill-group').forEach(group => {
  group.addEventListener('click', function(e) {
    // Collapse others
    document.querySelectorAll('.skill-group').forEach(g => {
      if (g !== group) g.classList.remove('active');
    });
    // Toggle this group
    group.classList.toggle('active');
  });
  group.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      group.click();
    }
  });
});

// Scroll to top button
const scrollBtn = document.querySelector('.scroll-top-btn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Download Resume buttons
document.getElementById('downloadResumeBtn').onclick = function() {
  window.open('path/to/your_resume.pdf', '_blank');
};
document.getElementById('downloadResumeBtnBottom').onclick = function() {
  window.open('path/to/your_resume.pdf', '_blank');
};

// Contact form (add EmailJS or your preferred handler here)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! (Integrate EmailJS or backend for real sending)');
  this.reset();
});

// Reveal sections on scroll
const sections = document.querySelectorAll('section');
const revealSection = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('show');
    }
  });
};
window.addEventListener('scroll', revealSection);
window.addEventListener('DOMContentLoaded', revealSection);