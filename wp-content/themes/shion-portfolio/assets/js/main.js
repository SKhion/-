/**
 * Shion Portfolio — Main JS
 * Responsibilities:
 *  1. Fade-in on scroll (IntersectionObserver)
 *  2. Mobile nav toggle
 *  3. Work row hover image preview
 *  4. Header scroll shadow
 */

(function () {
    'use strict';

    /* -------------------------------------------------------
       1. Fade-in on Scroll
    ------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
        );

        fadeEls.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        fadeEls.forEach((el) => el.classList.add('is-visible'));
    }

    /* -------------------------------------------------------
       2. Mobile Nav Toggle
    ------------------------------------------------------- */
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isOpen));
            primaryNav.classList.toggle('is-open', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close nav on link click
        primaryNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('is-open');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }

    /* -------------------------------------------------------
       3. Work Row — Hover Image Preview
    ------------------------------------------------------- */
    const workRows   = document.querySelectorAll('.work-row[data-hover-img]');
    const previewBox = document.querySelector('.work-hover-preview');
    const previewImg = document.getElementById('hover-preview-img');

    if (workRows.length && previewBox && previewImg) {
        // Preload images to avoid flicker
        workRows.forEach((row) => {
            const img = new Image();
            img.src = row.dataset.hoverImg;
        });

        workRows.forEach((row) => {
            row.addEventListener('mouseenter', () => {
                previewImg.src = row.dataset.hoverImg;
                previewImg.alt = row.querySelector('.work-row__name')?.textContent ?? '';
                previewBox.classList.add('is-visible');
            });

            row.addEventListener('mouseleave', () => {
                previewBox.classList.remove('is-visible');
            });
        });

        // Follow cursor vertically within the list
        const worksList = previewBox.closest('.container')?.querySelector('.works-list');
        if (worksList) {
            worksList.addEventListener('mousemove', (e) => {
                const rect   = worksList.getBoundingClientRect();
                const relY   = e.clientY - rect.top;
                const clampY = Math.max(0, Math.min(relY, rect.height));
                // Translate the preview box relative to its container
                previewBox.style.top = (rect.top + clampY) + 'px';
            });
        }
    }

    /* -------------------------------------------------------
       4. Header — scroll state (shadow / background intensity)
    ------------------------------------------------------- */
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 40) {
                header.setAttribute('data-scrolled', 'true');
            } else {
                header.removeAttribute('data-scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

})();
