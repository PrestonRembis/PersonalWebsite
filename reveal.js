// Fade elements marked with data-reveal in as they scroll into view.
// Loaded in <head> so the .js class is set before first paint, avoiding a flash of content.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach((el) => observer.observe(el));
});
