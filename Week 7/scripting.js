// DOM Elements
const themeButton = document.getElementById('theme-button');
const animatedElement = document.querySelector('.animated-element');
const pulseBtn = document.getElementById('pulse-btn');
const shakeBtn = document.getElementById('shake-btn');
const spinBtn = document.getElementById('spin-btn');
const usernameInput = document.getElementById('username');
const favoriteColorSelect = document.getElementById('favorite-color');
const notificationsCheckbox = document.getElementById('notifications');
const savePreferencesBtn = document.getElementById('save-preferences');

// Constants
const STORAGE_KEYS = {
    THEME: 'user-theme',
    USERNAME: 'user-username',
    COLOR: 'user-favorite-color',
    NOTIFICATIONS: 'user-notifications'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadUserPreferences();
    setupEventListeners();
    showWelcomeMessage();
});

// Theme Functions
function initializeTheme() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update the theme toggle button icon
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save the theme preference
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    
    // Update the theme toggle button icon with animation
    themeButton.classList.add('spin');
    setTimeout(() => {
        updateThemeIcon(newTheme);
        themeButton.classList.remove('spin');
    }, 300);
}

function updateThemeIcon(theme) {
    const icon = themeButton.querySelector('.icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Animation Functions
function applyAnimation(animationType) {
    // First remove any existing animations
    animatedElement.classList.remove('pulse', 'shake', 'spin');
    
    // Force a reflow to ensure the animation runs again
    void animatedElement.offsetWidth;
    
    // Apply the selected animation
    animatedElement.classList.add(animationType);
    
    // For shake animation, remove it after one execution
    if (animationType === 'shake') {
        setTimeout(() => {
            animatedElement.classList.remove('shake');
        }, 500);
    }
}

// LocalStorage Functions
function saveUserPreferences() {
    const username = usernameInput.value.trim();
    const favoriteColor = favoriteColorSelect.value;
    const notifications = notificationsCheckbox.checked;
    
    if (username) {
        localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    }
    
    localStorage.setItem(STORAGE_KEYS.COLOR, favoriteColor);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    
    // Visual feedback
    const saveButton = document.getElementById('save-preferences');
    const originalText = saveButton.textContent;
    
    saveButton.textContent = 'Saved!';
    saveButton.style.backgroundColor = 'green';
    
    setTimeout(() => {
        saveButton.textContent = originalText;
        saveButton.style.backgroundColor = '';
    }, 1500);
    
    // Apply favorite color to profile pic
    applyFavoriteColor(favoriteColor);
}

function loadUserPreferences() {
    const username = localStorage.getItem(STORAGE_KEYS.USERNAME);
    const favoriteColor = localStorage.getItem(STORAGE_KEYS.COLOR);
    const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) === 'true';
    
    if (username) {
        usernameInput.value = username;
    }
    
    if (favoriteColor) {
        favoriteColorSelect.value = favoriteColor;
        applyFavoriteColor(favoriteColor);
    }
    
    notificationsCheckbox.checked = notifications;
}

function applyFavoriteColor(color) {
    const profilePic = document.querySelector('.profile-pic');
    
    // Color mapping
    const colorMap = {
        'blue': '#4a6fa5',
        'green': '#47a76a',
        'purple': '#8e44ad',
        'orange': '#e67e22'
    };
    
    profilePic.style.backgroundColor = colorMap[color] || colorMap.blue;
}

function showWelcomeMessage() {
    const username = localStorage.getItem(STORAGE_KEYS.USERNAME);
    
    if (username) {
        const card = document.querySelector('.card p');
        card.textContent = `Welcome back, ${username}! Your settings are automatically saved.`;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeButton.addEventListener('click', toggleTheme);
    
    // Animation buttons
    pulseBtn.addEventListener('click', () => applyAnimation('pulse'));
    shakeBtn.addEventListener('click', () => applyAnimation('shake'));
    spinBtn.addEventListener('click', () => applyAnimation('spin'));
    
    // Save preferences
    savePreferencesBtn.addEventListener('click', saveUserPreferences);
    
    // Color change listener
    favoriteColorSelect.addEventListener('change', () => {
        applyFavoriteColor(favoriteColorSelect.value);
    });
}
