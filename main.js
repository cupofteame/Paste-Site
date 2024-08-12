document.addEventListener('DOMContentLoaded', function() {
    const editor = document.querySelector('.editor');
    const preview = document.querySelector('.preview');
    const previewContainer = document.querySelector('.preview-container');
    const togglePreviewBtn = document.querySelector('.toggle-preview-btn');
    
    // Initialize preview as hidden
    let isPreviewVisible = false;

    editor.addEventListener('input', function() {
        // Update the preview content
        preview.textContent = editor.value;

        // Optionally set a language dynamically here, e.g., based on user input or detection
        preview.className = 'language-javascript'; // Example: hardcoded language

        // Trigger Prism.js to highlight the code
        Prism.highlightElement(preview);
    });

    document.querySelector('.save-btn').addEventListener('click', function() {
        const text = editor.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'paste.txt';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    togglePreviewBtn.addEventListener('click', function() {
        isPreviewVisible = !isPreviewVisible;
        previewContainer.style.display = isPreviewVisible ? 'block' : 'none';
        togglePreviewBtn.textContent = isPreviewVisible ? 'Hide Preview' : 'Show Preview';
    });

    // Set the button text on page load
    togglePreviewBtn.textContent = isPreviewVisible ? 'Hide Preview' : 'Show Preview';

    // Disable right-click context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // Disable common keyboard shortcuts for developer tools
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && (event.key === 'I' || event.key === 'J' || event.key === 'U')) {
            event.preventDefault();
        }
    });

    // Detect developer tools
    const devtools = {
        open: false,
        detect: function() {
            const threshold = 160;
            const isDevtoolsOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
            if (isDevtoolsOpen) {
                if (!this.open) {
                    alert('Developer tools detected!');
                    this.open = true;
                }
            } else {
                this.open = false;
            }
        }
    };
    setInterval(() => devtools.detect(), 1000);
});