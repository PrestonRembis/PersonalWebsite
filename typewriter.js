// Type out the home page subtitle one character at a time
const typedText = document.getElementById('typed-text');
const fullText = typedText.dataset.text;
const startDelay = 600;
const charDelay = 80;

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedText.textContent = fullText;
} else {
    let index = 0;
    function typeNext() {
        typedText.textContent = fullText.slice(0, ++index);
        if (index < fullText.length) {
            setTimeout(typeNext, charDelay);
        }
    }
    setTimeout(typeNext, startDelay);
}
