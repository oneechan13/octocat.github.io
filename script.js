const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Gallery script
document.addEventListener("DOMContentLoaded", () => {
  const mainImg = document.getElementById("current");
  const thumbs = Array.from(document.querySelectorAll(".thumbnails img"));
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const currentIndexEl = document.getElementById("current-index");
  const totalImagesEl = document.getElementById("total-images");
  const modalCurrentIndexEl = document.getElementById("modal-current-index");
  const modalTotalImagesEl = document.getElementById("modal-total-images");

  if (!mainImg || thumbs.length === 0) {
    console.warn("Gallery: missing #current image or thumbnails.");
    return;
  }

  const images = thumbs.map((img) => img.getAttribute("src"));
  let currentIndex = 0;

  // Set total images count
  totalImagesEl.textContent = images.length;
  modalTotalImagesEl.textContent = images.length;

  function setActiveThumb() {
    thumbs.forEach((t, idx) => {
      t.classList.toggle("active", idx === currentIndex);
      t.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
    });
  }

  function updateImage() {
    mainImg.style.opacity = "0";
    const tmp = new Image();
    tmp.onload = () => {
      mainImg.src = images[currentIndex];
      mainImg.alt = `Property image ${currentIndex + 1}`;
      setActiveThumb();
      currentIndexEl.textContent = currentIndex + 1;

      requestAnimationFrame(() => {
        mainImg.style.opacity = "1";
      });
    };
    tmp.src = images[currentIndex];
  }

  function updateModalImage() {
    modalImage.src = images[currentIndex];
    modalImage.alt = `Fullscreen property view ${currentIndex + 1}`;
    modalCurrentIndexEl.textContent = currentIndex + 1;
  }

  window.setImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    updateImage();
    if (modal.classList.contains("show")) {
      updateModalImage();
    }
  };

  window.prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
    if (modal.classList.contains("show")) {
      updateModalImage();
    }
  };

  window.nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
    if (modal.classList.contains("show")) {
      updateModalImage();
    }
  };

  window.modalPrevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
    updateModalImage();
  };

  window.modalNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
    updateModalImage();
  };

  window.openModal = () => {
    modalImage.src = images[currentIndex];
    modalCurrentIndexEl.textContent = currentIndex + 1;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  window.closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  };

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => window.setImage(idx));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") window.prevImage();
    if (e.key === "ArrowRight") window.nextImage();
    if (e.key === "Escape") window.closeModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Initialize on load
  setActiveThumb();
  mainImg.style.opacity = "1";
});
//end of gallery script

// contact tab script
// JavaScript to ensure tabs work properly
document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Show the first tab by default
  document.querySelector(".tab-btn").classList.add("active");
  document.querySelector(".tab-content").classList.add("active");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to your server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }
});
// end contact tab
