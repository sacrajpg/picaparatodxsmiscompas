document.addEventListener('DOMContentLoaded', function() {
    const galleryPreviews = document.querySelectorAll('.gallery-preview');
    const backButtons = document.querySelectorAll('.back-button');

    galleryPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            const galleryId = preview.getAttribute('data-gallery');
            const gallery = document.getElementById(galleryId);
            if (gallery) {
                preview.style.display = 'none';
                gallery.style.display = 'grid';
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryId = button.getAttribute('data-gallery');
            const gallery = document.getElementById(galleryId);
            const preview = document.querySelector(`.gallery-preview[data-gallery="${galleryId}"]`);
            if (gallery && preview) {
                gallery.style.display = 'none';
                preview.style.display = 'flex';
            }
        });
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let currentGalleryItems = [];

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            currentGalleryItems = [...item.closest('.gallery').querySelectorAll('.gallery-item')];
            currentImageIndex = index;
            openLightbox(item.href);
        });
    });

    function openLightbox(imageSrc) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.innerHTML = `
            <div class="lightbox-content" style="position: relative; display: flex; justify-content: center; align-items: center;">
                <button class="lightbox-prev" style="position: absolute; left: 10px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&#8249;</button>
                <img src="${imageSrc}" class="lightbox-image" style="max-width: 90%; max-height: 90%; object-fit: contain;">
                <button class="lightbox-next" style="position: absolute; right: 10px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&#8250;</button>
                <button class="lightbox-close" style="position: fixed; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeButton = lightbox.querySelector('.lightbox-close');
        const nextButton = lightbox.querySelector('.lightbox-next');
        const prevButton = lightbox.querySelector('.lightbox-prev');
        const lightboxImage = lightbox.querySelector('.lightbox-image');

        closeButton.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentGalleryItems.length;
            lightboxImage.src = currentGalleryItems[currentImageIndex].href;
        });

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
            lightboxImage.src = currentGalleryItems[currentImageIndex].href;
        });
    }
});
