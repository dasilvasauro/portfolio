document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. SEQUÊNCIA DE BOOT TIPO LINUX
       ========================================== */
    const bootScreen = document.getElementById("boot-screen");
    const bootText = document.getElementById("boot-text");
    
    // Verifica se já fez o boot nessa sessão
    if (!sessionStorage.getItem("hasBooted")) {
        const bootLines = [
            "  _____  ",
            " |  _  |",
            " | |_) |",
            " |  _ < ",
            " | |_) |",
            " |____/ ",
            "",
            "BIOS Date 04/11/02 19:13:52 Ver 03.00.02",
            "CPU: Intel Pentium Dual Core",
            "Speed : 580MHz",
            "Press DEL to run Setup",
            "Memory Testing : 1048576K OK",
            "[ OK ] Loading Web-Kernel...",
            "[ OK ] Mounting Virtual Disk Image",
            "[ OK ] Starting SPA",
            "[ OK ] Starting Links",
            "[ OK ] Loading Portfolio UI...",
            "** Welcome to Bruno's Portfolio **"
        ];

        let i = 0;
        
        // Função recursiva para "digitar" cada linha com velocidade aleatória
        function typeLine() {
            if (i < bootLines.length) {
                const p = document.createElement("div");
                p.textContent = bootLines[i];
                bootText.appendChild(p);
                i++;
                // Velocidade de digitação rápida simulando boot
                setTimeout(typeLine, Math.random() * 200 + 50);
            } else {
                // Ao terminar as linhas, aguarda um pouco e oculta a tela de boot
                setTimeout(() => {
                    bootScreen.style.display = "none";
                    sessionStorage.setItem("hasBooted", "true");
                }, 1000);
            }
        }
        
        typeLine();
    } else {
        // Se já deu boot, apenas oculta a tela imediatamente
        bootScreen.style.display = "none";
    }

    /* ==========================================
       2. SISTEMA DE NAVEGAÇÃO UNIVERSAL
       ========================================== */
    
    // Função que faz a troca de tela e atualiza a taskbar
    function changePage(targetId) {
        // 1. Esconde todas as páginas e mostra a certa
        document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
        document.getElementById(targetId).classList.add("active");

        // 2. Atualiza os botões da Taskbar
        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.classList.remove("active");
            if (btn.getAttribute("data-target") === targetId) {
                btn.classList.add("active");
            }
        });
        
        // 3. Rola a página para o topo (útil para o mobile)
        document.getElementById("app").scrollTo(0, 0);
    }

    // Aplica a função nos botões da Taskbar (Barra inferior)
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            changePage(button.getAttribute("data-target"));
        });
    });

    // Aplica a função em QUALQUER botão do site que tenha a classe 'go-to-section'
    document.querySelectorAll(".go-to-section").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Evita comportamentos estranhos do botão
            changePage(button.getAttribute("data-target"));
        });
    });

    /* ==========================================
       3. DROPDOWN DE DOWNLOAD DO CV
       ========================================== */
    const cvBtn = document.getElementById("cv-btn");
    const cvDropdown = document.getElementById("cv-dropdown");

    cvBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que o click feche na mesma hora
        cvDropdown.classList.toggle("show");
    });

    // Fecha o dropdown se clicar fora dele
    window.addEventListener("click", () => {
        if (cvDropdown.classList.contains("show")) {
            cvDropdown.classList.remove("show");
        }
    });

    /* ==========================================
       4. INTERAÇÃO DAS COMPETÊNCIAS FLUTUANTES
       ========================================== */
    const skills = document.querySelectorAll(".skill");

    skills.forEach(skill => {
        skill.addEventListener("click", () => {
            // Se for mobile, o hover não funciona bem, então tratamos no click.
            // Remove 'enlarged' de todas as outras
            skills.forEach(s => {
                if(s !== skill) s.classList.remove("enlarged");
            });
            // Alterna o tamanho na clicada
            skill.classList.toggle("enlarged");
        });
    });

    /* ==========================================
       5. INTERAÇÃO DO OVERLAY DE PROJETOS (TELA AZUL)
       ========================================== */
    const projectOverlay = document.getElementById("project-overlay");
    const btnCancel = document.getElementById("btn-cancel");
    const btnProceed = document.getElementById("btn-proceed");
    // Seleciona todos os botões que colocamos a classe 'project-link-btn'
    const projectButtons = document.querySelectorAll(".project-link-btn");
    
    let destinationUrl = ""; // Variável para guardar o link temporariamente

    // Função para abrir o overlay
    function openOverlay(url) {
        destinationUrl = url;
        // Usa 'flex' para centralizar o conteúdo, em vez de 'block'
        projectOverlay.style.display = "flex"; 
    }

    // Função para fechar o overlay
    function closeOverlay() {
        projectOverlay.style.display = "none";
        destinationUrl = "";
    }

    // Adiciona o evento de clique em cada botão de projeto
    projectButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Impede qualquer ação padrão
            const url = btn.getAttribute("data-href");
            if (url) {
                openOverlay(url);
            }
        });
    });

    // Ação do botão VOLTAR
    btnCancel.addEventListener("click", closeOverlay);

    // Ação do botão PROSSEGUIR
    btnProceed.addEventListener("click", () => {
        if (destinationUrl) {
            // Abre o link em nova aba
            window.open(destinationUrl, "_blank");
            closeOverlay();
        }
    });

    // (Opcional) Fechar com ESC e confirmar com ENTER para mais imersão retrô
    document.addEventListener("keydown", (e) => {
        if (projectOverlay.style.display === "flex") {
            if (e.key === "Escape") {
                closeOverlay();
            } else if (e.key === "Enter") {
                btnProceed.click();
            }
        }
    });

});
