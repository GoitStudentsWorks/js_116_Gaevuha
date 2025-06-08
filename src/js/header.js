document.addEventListener('DOMContentLoaded', () => {
  //   Menu elements
  const menuElements = {
    openBtn: document.querySelector('[data-menu-open]'),
    closeBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
    links: document.querySelectorAll('.menu-list .link-menu'),
    header: document.querySelector('.header'),
  };

  const config = {
    scrollBehavior: 'smooth',
    scrollDelay: 300,
  };

  // Open / close menu,
  const toggleMenu = isOpen => {
    menuElements.menu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.documentElement.style.scrollBehavior = isOpen
      ? 'auto'
      : config.scrollBehavior;
  };

  //   Animate scroll to target
  const smoothScrollTo = targetId => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = menuElements.header.offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: config.scrollBehavior,
    });
  };

  // Event listeners
  menuElements.openBtn.addEventListener('click', () => toggleMenu(true));
  menuElements.closeBtn.addEventListener('click', () => toggleMenu(false));

  // Handle overlay click to close menu
  menuElements.menu.addEventListener('click', e => {
    if (
      !e.target.closest('[data-menu-close]') &&
      !e.target.closest('.link-menu') &&
      !e.target.closest('.link-logo')
    ) {
      toggleMenu(false);
    }
  });

  // Menu link handling
  menuElements.links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId.startsWith('#')) return;

      e.preventDefault();

      //   If menu is open (in mobile view)
      const isMobileMenuOpen = menuElements.menu.classList.contains('is-open');

      if (isMobileMenuOpen) {
        toggleMenu(false);
        setTimeout(() => smoothScrollTo(targetId), config.scrollDelay);
      } else {
        smoothScrollTo(targetId);
      }
    });
  });

  //   Dismiss menu on desktop resize
  window.addEventListener('resize', () => {
    if (
      window.innerWidth >= 768 &&
      menuElements.menu.classList.contains('is-open')
    ) {
      toggleMenu(false);
    }
  });
});
