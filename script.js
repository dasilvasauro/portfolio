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

document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.navbar-icons a');
    const sections = document.querySelectorAll('section');

    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

        });
    });
});






document.addEventListener('DOMContentLoaded', function() {
  const lines = document.querySelectorAll('.typing-line');
  const speeds = [40, 30, 35, 25]; // Characters per second
  const lineDelays = [0, 1800, 4500, 7000]; // Start times in ms
  let currentActiveLine = null;

  // Initialize lines
  lines.forEach((line, index) => {
    const text = line.dataset.text;
    line.textContent = '';
    line.style.width = '0';
    
    // Mobile adaptation for the long line
    if (window.innerWidth < 768 && index === 1) {
      line.style.whiteSpace = 'normal';
      line.style.height = '0';
    }
  });

  // Animate each line
  lines.forEach((line, index) => {
    setTimeout(() => {
      // Remove active class from previous line
      if (currentActiveLine) {
        currentActiveLine.classList.remove('active');
      }
      
      // Set current active line
      currentActiveLine = line;
      line.classList.add('active');
      
      const text = line.dataset.text;
      const duration = (text.length / speeds[index]) * 1000;
      
      // Desktop animation
      if (window.innerWidth >= 768 || index !== 1) {
        line.style.transition = `width ${duration}ms steps(${text.length}, end)`;
        line.style.width = `${text.length}ch`;
        line.textContent = text;
      }
      // Mobile special handling for long line
      else {
        line.style.transition = `
          width ${duration}ms ease,
          height ${duration}ms ease,
          opacity 300ms ease
        `;
        line.style.width = '100%';
        line.style.height = 'auto';
        line.textContent = text;
      }
      
      // Remove cursor after animation completes
      setTimeout(() => {
        document.querySelectorAll('.typing-line').forEach(l => {
        l.classList.remove('active');
        l.style.animation = 'none';   
        });

        currentActiveLine = line;
        line.classList.add('active');

        line.classList.remove('active');
      }, duration);
      
    }, lineDelays[index]);
    
    setTimeout(() => {
      // Show cursor after line animation
      document.querySelectorAll('.typing-line').forEach(l => {
        l.classList.remove('active');
        l.style.animation = 'none';
      });
    }, lineDelays[lineDelays.length - 1] + 2000);

});
});