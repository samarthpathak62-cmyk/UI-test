document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Event Listeners
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            switchTab(targetId);
        });
    });
    document.querySelectorAll('[data-target]').forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            switchTab(targetId);
        });
    });
    document.getElementById('bell-icon').addEventListener('click', handleBell);
    document.getElementById('attach-file-btn').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });
    document.getElementById('file-input').addEventListener('change', (e) => handleFile(e.target));
    document.getElementById('send-msg-btn').addEventListener('click', sendMsg);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMsg();
    });

    // Image Gen Specific
    document.getElementById('attach-image-btn').addEventListener('click', () => {
        document.getElementById('image-file-input').click();
    });
    document.getElementById('image-file-input').addEventListener('change', (e) => handleImageFile(e.target));
    document.getElementById('generate-image-btn').addEventListener('click', generateImage);

    // Profile Settings
    document.getElementById('theme-select').addEventListener('change', (e) => updateTheme(e.target.value));
    document.getElementById('save-settings-btn').addEventListener('click', () => alert('Settings saved successfully!'));

    document.querySelectorAll('.explore-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const imageName = e.currentTarget.dataset.imageName;
            viewImage(imageName);
        });
    });

    // Initial theme setup (if saved in localStorage, otherwise default)
    const savedTheme = localStorage.getItem('appTheme') || 'blue';
    updateTheme(savedTheme);
    document.getElementById('theme-select').value = savedTheme;
});

// Function to switch between views
function switchTab(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navs = document.querySelectorAll('.nav-item');
    if (id === 'home') navs[0].classList.add('active');
    else if (id === 'chat') navs[1].classList.add('active');
    else if (id === 'tools') navs[2].classList.add('active');
    else if (id === 'me') navs[3].classList.add('active');
    else if (id === 'imggen') { // Special handling for Image Gen, it doesn't have a direct nav item
        // Ensure no nav item is active if we land here from home card
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    }
}

// Handles Bell icon click
function handleBell() {
    alert("No Notification Are Here");
}

// Handles file attachment in chat
function handleFile(input) {
    const file = input.files[0];
    if (file) {
        const chatBox = document.getElementById('chatBox');
        const msg = document.createElement('div');
        msg.className = 'bubble user';
        msg.innerHTML = `<i data-lucide="file" style="width:14px; vertical-align:middle"></i> Attached: ${file.name}`;
        chatBox.appendChild(msg);
        lucide.createIcons(); // Re-render lucide icons for new elements

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'bubble bot';
            botMsg.innerText = `I'm Received your File`;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}

// Sends chat message
function sendMsg() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    if (!input.value.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'bubble user';
    userMsg.innerText = input.value.trim();
    chatBox.appendChild(userMsg);
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bubble bot';
        botMsg.innerText = "Thinking...";
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

// Handles file attachment for image generation
function handleImageFile(input) {
    const file = input.files[0];
    if (file) {
        alert(`Image selected for generation: ${file.name}`);
        // Here you would typically upload the image to a server or process it
    }
}

// Triggers image generation
function generateImage() {
    const prompt = document.getElementById('imagePrompt').value.trim();
    if (!prompt) {
        alert("Please Write a prompt to generate image!");
        return;
    }
    alert(`Generating image for prompt: "${prompt}"`);
    // Here you would send the prompt to an image generation API
}

// Views community images
function viewImage(name) {
    alert("Community Image '" + name + "' full view Open in Few Seconds !");
}

// Updates the app theme
function updateTheme(color) {
    const r = document.documentElement;
    let accentColor, neonBorder, glowColor;

    if (color === 'pink') {
        accentColor = '#FF0080';
        neonBorder = 'linear-gradient(135deg, #FF0080, #7928CA)';
        glowColor = 'rgba(255, 0, 128, 0.3)';
    } else if (color === 'green') {
        accentColor = '#00FF87';
        neonBorder = 'linear-gradient(135deg, #00FF87, #60EFFF)';
        glowColor = 'rgba(0, 255, 135, 0.3)';
    } else { // Default to blue
        accentColor = '#00D2FF';
        neonBorder = 'linear-gradient(135deg, #00D2FF, #3a7bd5)';
        glowColor = 'rgba(0, 210, 255, 0.3)';
    }

    r.style.setProperty('--accent', accentColor);
    r.style.setProperty('--neon-border', neonBorder);
    r.style.setProperty('--glow', glowColor);

    // Save theme preference
    localStorage.setItem('appTheme', color);

    // Re-render Lucide icons to update their color if needed
    lucide.createIcons(); 
    
    // Update the select box value if called from outside its change event
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect && themeSelect.value !== color) {
        themeSelect.value = color;
    }
}
