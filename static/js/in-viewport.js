const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("inviewport");
            }, 250);
        }
    });
};

setTimeout(() => {
    if (window.IntersectionObserver) {
        const obs = new IntersectionObserver(inViewport);
        const obsOptions = {
            threshold: 1
        };
    
            const elements = document.querySelectorAll('.crates');
            for (const el of elements) {
                obs.observe(el, obsOptions);
            }
    } else {
        const elements = document.querySelectorAll('.crates');
        for (const el of elements) {
            el.classList.add("inviewport");
        }
    }
}, 50);
