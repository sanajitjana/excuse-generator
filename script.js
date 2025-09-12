// Global variables
let excuses = [];
let currentExcuse = "";

// Theme management
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme") || "light";

// Apply saved theme
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark");
}

// DOM elements
const generateBtn = document.getElementById("generate-btn");
const excuseDisplay = document.getElementById("excuse-display");
const excuseActions = document.getElementById("excuse-actions");
const copyBtn = document.getElementById("copy-btn");
const helpBtn = document.getElementById("help-btn");
const helpModal = document.getElementById("help-modal");
const closeModal = document.getElementById("close-modal");

// Initialize app
document.addEventListener("DOMContentLoaded", async () => {
  await loadExcuses();
  generateRandomExcuse();
  setupEventListeners();
  updateCopyrightYear();
});

// Load excuses from JSON
async function loadExcuses() {
  try {
    const response = await fetch("excuses.json");
    if (!response.ok) throw new Error("Failed to load excuses");
    excuses = await response.json();
  } catch (err) {
    console.error("Failed to load excuses:", err);
    // Fallback excuses
    excuses = [
      "My creativity is temporarily out of order.",
      "The excuse generator is having an existential crisis.",
      "All my excuses are currently being peer-reviewed.",
    ];
  }
}

// Setup event listeners
function setupEventListeners() {
  themeToggle.addEventListener("click", toggleTheme);
  generateBtn.addEventListener("click", handleGenerateExcuse);
  copyBtn.addEventListener("click", copyExcuse);
  helpBtn.addEventListener("click", showHelpModal);
  closeModal.addEventListener("click", hideHelpModal);
  helpModal.addEventListener("click", hideHelpModalOnOutsideClick);
  document.addEventListener("keydown", handleKeyboardShortcuts);
  document.addEventListener("keydown", handleModalTabNavigation);
}

// Update copyright year dynamically
function updateCopyrightYear() {
  const copyright = document.getElementById('copyright');
  copyright.innerHTML = `&copy; ${new Date().getFullYear()} Excuse Generator. All rights reserved.`;
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Add animation to theme toggle button
  themeToggle.style.transform = "scale(0.8) rotate(360deg)";
  setTimeout(() => {
    themeToggle.style.transform = "";
  }, 300);
}

// Generate random excuse (core logic)
function generateRandomExcuse() {
  if (excuses.length === 0) return;

  const randomIndex = Math.floor(Math.random() * excuses.length);
  currentExcuse = excuses[randomIndex];

  // Display the excuse
  excuseDisplay.textContent = currentExcuse;

  // Show action buttons
  excuseActions.classList.add("show");
}

// Main excuse generation
async function handleGenerateExcuse() {
  if (excuses.length === 0) return;

  // Add loading state
  generateBtn.disabled = true;
  generateBtn.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-spinner fa-spin"></i>
            <span class="btn-text">Crafting...</span>
        </span>
    `;

  // Simulate slight delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  generateRandomExcuse();

  // Reset generate button
  generateBtn.disabled = false;
  generateBtn.innerHTML = `
        <span class="btn-content">
            <i class="fas fa-magic"></i>
            <span class="btn-text">Generate Another</span>
        </span>
    `;
}

// Copy excuse to clipboard
async function copyExcuse() {
  const textToCopy = excuseDisplay.textContent;

  try {
    await navigator.clipboard.writeText(textToCopy);

    // Animation feedback
    copyBtn.style.transform = "scale(1.2)";
    setTimeout(() => {
      copyBtn.style.transform = "";
    }, 200);

    // Show toast
    showToast("Copied!");
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}


// Help modal functions
function showHelpModal() {
  helpModal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Focus the close button for accessibility
  setTimeout(() => {
    closeModal.focus();
  }, 100);
}

function hideHelpModal() {
  helpModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function hideHelpModalOnOutsideClick(e) {
  if (e.target === helpModal) {
    hideHelpModal();
  }
}

// Handle tab navigation within modal
function handleModalTabNavigation(e) {
  if (helpModal.style.display !== "block") return;

  const focusableElements = helpModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Escape to close modal
  if (e.code === "Escape" && helpModal.style.display === "block") {
    hideHelpModal();
    return;
  }

  // F1 to open help modal
  if (e.code === "F1") {
    e.preventDefault();
    showHelpModal();
    return;
  }

  // Spacebar or Enter to generate
  if (e.code === "Space" || e.code === "Enter") {
    if (e.target === document.body) {
      e.preventDefault();
      handleGenerateExcuse();
    }
  }

  // Ctrl+C to copy
  if (e.ctrlKey && e.code === "KeyC") {
    if (e.target === document.body) {
      e.preventDefault();
      copyExcuse();
    }
  }

  // Ctrl+D to toggle theme
  if (e.ctrlKey && e.code === "KeyD") {
    e.preventDefault();
    toggleTheme();
  }
}


function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Hide after 2 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    // Remove from DOM after animation
    setTimeout(() => container.removeChild(toast), 300);
  }, 2000);
}


