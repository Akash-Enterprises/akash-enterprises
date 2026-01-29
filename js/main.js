/* =====================================================
   Akash Enterprises - Global JavaScript (Enhanced UX)
   Features:
   - Image fade-in on load
   - Product image lightbox (click to view)
   - Keyboard & mobile friendly
   - No dependencies
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------
       IMAGE FADE-IN (PREVENT BLANK FLASH)
    --------------------------------------------- */
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        }
    });

    /* ---------------------------------------------
       LIGHTBOX FOR PRODUCT IMAGES
    --------------------------------------------- */

    // Create lightbox elements once
    const lightboxOverlay = document.createElement("div");
    lightboxOverlay.id = "lightbox-overlay";

    const lightboxImage = document.createElement("img");
    lightboxImage.id = "lightbox-image";

    lightboxOverlay.appendChild(lightboxImage);
    document.body.appendChild(lightboxOverlay);

    // Styles injected via JS to avoid CSS file dependency
    Object.assign(lightboxOverlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.85)",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "9999",
        cursor: "zoom-out",
        padding: "1rem"
    });

    Object.assign(lightboxImage.style, {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        background: "#fff",
        borderRadius: "8px"
    });

    // Open lightbox
    document.addEventListener("click", function (e) {
        const target = e.target;

        // Only trigger for product gallery images
        if (target.tagName === "IMG" && target.closest(".product-gallery")) {
            lightboxImage.src = target.src;
            lightboxOverlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    });

    // Close on click outside image
    lightboxOverlay.addEventListener("click", function () {
        closeLightbox();
    });

    // Close on ESC key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightboxOverlay.style.display === "flex") {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightboxOverlay.style.display = "none";
        lightboxImage.src = "";
        document.body.style.overflow = "";
    }

});
