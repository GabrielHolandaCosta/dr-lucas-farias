document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let scrollTimeout;
    const headerThreshold = 50; // Quantidade de pixels para rolar antes de mostrar o header

    // Função para atualizar a seção ativa e o link da navbar
    const updateActiveSection = () => {
        let currentActiveSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Verifica se o meio da seção está visível na viewport
            if (window.scrollY >= sectionTop - window.innerHeight / 2 && window.scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
                currentActiveSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActiveSectionId)) {
                link.classList.add('active');
            }
        });

        // Ativar animações da seção atual
        sections.forEach(section => {
            if (section.id === currentActiveSectionId) {
                section.classList.add('active');
            } else {
                // Opcional: remover a classe 'active' de seções não visíveis para resetar animações
                // section.classList.remove('active');
            }
        });

        // Mostrar/Esconder header
        if (window.scrollY > headerThreshold) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    };

    // Adiciona o smooth scroll e atualiza a classe 'active'
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }

            // Atualiza o link ativo imediatamente após o clique
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Listener para o evento de scroll
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveSection, 100); // Debounce para otimizar
    });

    // Executa no carregamento inicial para definir a seção ativa e animar a primeira
    updateActiveSection();
});