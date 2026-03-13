/* =====================================================
   Akash Enterprises - Global JavaScript v2.0
   - Image fade-in (CLS-safe)
   - Hamburger mobile nav toggle
   - Product image lightbox (CSS-class driven)
   - Keyboard & mobile friendly
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* --------------------------------------------------
       IMAGE FADE-IN
    -------------------------------------------------- */
    document.querySelectorAll("img").forEach(function(img) {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", function() { img.classList.add("loaded"); });
        }
    });

    /* --------------------------------------------------
       HAMBURGER MOBILE NAV
    -------------------------------------------------- */
    var toggle = document.querySelector(".nav-toggle");
    var nav    = document.querySelector(".main-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", function() {
            var isOpen = nav.classList.toggle("open");
            toggle.classList.toggle("open", isOpen);
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close nav when a link is clicked (single-page nav jumps)
        nav.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
                nav.classList.remove("open");
                toggle.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* --------------------------------------------------
       LIGHTBOX FOR PRODUCT IMAGES
       (styles live in style.css — no JS injection)
    -------------------------------------------------- */
    var overlay = document.createElement("div");
    overlay.id  = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");

    var lightboxImg = document.createElement("img");
    lightboxImg.id  = "lightbox-image";
    lightboxImg.alt = "Enlarged product image";

    overlay.appendChild(lightboxImg);
    document.body.appendChild(overlay);

    // Open lightbox on product gallery images
    document.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG" && e.target.closest(".product-gallery")) {
            lightboxImg.src = e.target.src;
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });

    // Close on overlay click
    overlay.addEventListener("click", closeLightbox);

    // Close on ESC
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
        overlay.classList.remove("active");
        lightboxImg.src = "";
        document.body.style.overflow = "";
    }

});

/* =========================================================
   CAROUSEL — touch/drag + button + dot navigation
   Works for both homepage category carousel and
   category page product carousels.
========================================================= */
(function () {
    function initCarousel(wrap) {
        const viewport = wrap.querySelector('.carousel-viewport');
        const track    = wrap.querySelector('.carousel-track');
        const prevBtn  = wrap.querySelector('.carousel-btn--prev');
        const nextBtn  = wrap.querySelector('.carousel-btn--next');
        const dotsWrap = wrap.parentElement.querySelector('.carousel-dots');

        if (!track) return;

        const cards      = Array.from(track.children);
        const total      = cards.length;
        let current      = 0;
        let startX       = 0;
        let isDragging   = false;
        let dragDelta    = 0;

        /* ── compute how many cards are visible ── */
        function visibleCount() {
            const vw = viewport.offsetWidth;
            const cw = cards[0] ? cards[0].offsetWidth : vw;
            return Math.round(vw / cw) || 1;
        }

        /* ── max slide index ── */
        function maxIndex() {
            return Math.max(0, total - visibleCount());
        }

        /* ── slide to position ── */
        function slideTo(idx) {
            current = Math.max(0, Math.min(idx, maxIndex()));
            const gap  = parseFloat(getComputedStyle(track).gap) || 20;
            const cw   = cards[0] ? cards[0].offsetWidth + gap : 0;
            track.style.transform = `translateX(-${current * cw}px)`;
            updateUI();
        }

        /* ── update buttons + dots ── */
        function updateUI() {
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current >= maxIndex();
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        /* ── build dots ── */
        const dots = [];
        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            const count = maxIndex() + 1;
            for (let i = 0; i < count; i++) {
                const d = document.createElement('button');
                d.className = 'carousel-dot';
                d.setAttribute('aria-label', 'Slide ' + (i + 1));
                d.addEventListener('click', () => slideTo(i));
                dotsWrap.appendChild(d);
                dots.push(d);
            }
        }

        /* ── button clicks ── */
        if (prevBtn) prevBtn.addEventListener('click', () => slideTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => slideTo(current + 1));

        /* ── touch / mouse drag ── */
        function onDragStart(e) {
            isDragging = true;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            track.style.transition = 'none';
        }
        function onDragMove(e) {
            if (!isDragging) return;
            dragDelta = (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX) - startX;
        }
        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = '';
            const threshold = 50;
            if (dragDelta < -threshold)      slideTo(current + 1);
            else if (dragDelta > threshold)  slideTo(current - 1);
            else                             slideTo(current);
            dragDelta = 0;
        }

        track.addEventListener('mousedown',  onDragStart);
        track.addEventListener('mousemove',  onDragMove);
        track.addEventListener('mouseup',    onDragEnd);
        track.addEventListener('mouseleave', onDragEnd);
        track.addEventListener('touchstart', onDragStart, { passive: true });
        track.addEventListener('touchmove',  onDragMove,  { passive: true });
        track.addEventListener('touchend',   onDragEnd);

        /* ── prevent link click during drag ── */
        track.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', e => {
                if (Math.abs(dragDelta) > 10) e.preventDefault();
            });
        });

        /* ── recalc on resize ── */
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => slideTo(current), 150);
        });

        slideTo(0);
    }

    /* Init all carousels on the page */
    document.querySelectorAll('.carousel-wrap').forEach(wrap => initCarousel(wrap));
})();
