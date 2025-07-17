document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar-icons a').forEach(icon => {
        const img = icon.querySelector('img');
        // Create bubble element
        const bubble = document.createElement('span');
        bubble.className = 'nav-bubble';
        bubble.style.position = 'absolute';
        bubble.style.padding = '6px 14px';
        //bubble.style.background = '#222';
        //bubble.style.color = '#fff';
        bubble.style.borderRadius = '8px';
        bubble.style.fontSize = '0.95em';
        bubble.style.whiteSpace = 'nowrap';
        bubble.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        bubble.style.transition = 'opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)';
        bubble.style.opacity = '0';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '10';

        // Set bubble text based on icon
        const alt = img.alt;
        let text = '';
        if (alt === 'Icon' && img.src.includes('home')) text = 'Início';
        else if (alt === 'Icon' && img.src.includes('projects')) text = 'Projetos';
        else if (alt === 'Icon' && img.src.includes('aboutme')) text = 'Sobre mim';
        else if (alt === 'Icon' && img.src.includes('contact')) text = 'Contato';
        bubble.textContent = text;

        icon.style.position = 'relative';
        icon.appendChild(bubble);

        img.addEventListener('mouseenter', () => {
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(12px)';
            bubble.style.left = '50%';
            bubble.style.top = '44px';
            bubble.style.transform += ' translateX(-50%)';
        });

        img.addEventListener('mouseleave', () => {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateY(0)';
        });
    });
});