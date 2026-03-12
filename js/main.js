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
