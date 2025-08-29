const canvas = document.getElementById("dynamic-bg");
const ctx = canvas.getContext("2d");

// Set canvas size to full window
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Particle settings
const particles = [];
const particleCount = 80; // Number of particles
const mainColor = "#4a47a3"; // Particle color

// Particle class
class Particle {
  constructor() {
    this.reset(); // Initialize particle with random values
  }

  reset() {
    // Set random position, size, and speed
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  draw() {
    // Draw particle as a circle
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    // Move particle
    this.x += this.speedX;
    this.y += this.speedY;

    // Reset particle if it goes out of canvas
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }
}

// Create particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animation loop
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Update and draw each particle
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  // Call animate recursively
  requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Select all sections on the page
const sections = document.querySelectorAll("section");

// Listen for scroll events
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    // Get the section's position relative to the viewport
    const rect = section.getBoundingClientRect();

    // If the section is close to entering the viewport, animate it
    if (rect.top < window.innerHeight - 100) {
      section.style.opacity = 1; // Fade in
      section.style.transform = "translateY(0)"; // Move to original position
    }
  });
});

// Initial styles for all sections
sections.forEach((section) => {
  section.style.opacity = 0; // Start invisible
  section.style.transform = "translateY(50px)"; // Start slightly below
  section.style.transition = "all 0.8s ease-out"; // Smooth animation
});
// Toggle links visibility on click
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const links = document.querySelector(".links");

  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    links.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!menuToggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove("active");
    }
  });
});
