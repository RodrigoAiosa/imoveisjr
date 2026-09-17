// ===================================================================
// IMÓVEIS JR — interações: menu dropdown, menu mobile, galeria/lightbox
// ===================================================================

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initGallery();
});

function initNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Dropdown "Tipo de Imóveis"
  document.querySelectorAll('.has-dropdown > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var wasOpen = li.classList.contains('open');
      document.querySelectorAll('.nav-links > li').forEach(function (item) {
        item.classList.remove('open');
      });
      if (!wasOpen) li.classList.add('open');
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-links > li').forEach(function (item) {
      item.classList.remove('open');
    });
  });
}

function initGallery() {
  var mainSlot = document.getElementById('media-main');
  var thumbs = document.querySelectorAll('.thumb-strip button');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = document.querySelector('.lightbox-close');

  if (!mainSlot || thumbs.length === 0) return;

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      thumbs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var type = btn.getAttribute('data-type');
      var src = btn.getAttribute('data-src');

      if (type === 'video') {
        mainSlot.innerHTML = '<video src="' + src + '" controls playsinline></video>';
      } else if (type === 'drive-video') {
        mainSlot.innerHTML = '<iframe src="' + src + '" width="100%" height="480" allow="autoplay" style="border:0; display:block;" allowfullscreen></iframe>';
      } else {
        mainSlot.innerHTML = '<img src="' + src + '" alt="Foto do imóvel">';
        mainSlot.querySelector('img').addEventListener('click', function () {
          openLightbox(src);
        });
      }
    });
  });

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox) lightbox.classList.remove('open');
  });
}
