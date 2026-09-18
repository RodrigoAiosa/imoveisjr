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

  if (!mainSlot) return;

  function driveIdFromPreviewUrl(url) {
    var match = url.match(/\/file\/d\/([^/]+)\//);
    return match ? match[1] : null;
  }

  function renderDownloadButton(type, src) {
    var old = document.getElementById('media-download');
    if (old) old.remove();

    var href = null;
    if (type === 'video') {
      href = src;
    } else if (type === 'drive-video') {
      var id = driveIdFromPreviewUrl(src);
      if (id) href = 'https://drive.google.com/uc?export=download&id=' + id;
    }
    if (!href) return;

    var a = document.createElement('a');
    a.id = 'media-download';
    a.className = 'media-download';
    a.href = href;
    a.textContent = '⬇ Baixar vídeo';
    if (type === 'video') a.setAttribute('download', '');
    if (type === 'drive-video') a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    mainSlot.insertAdjacentElement('afterend', a);
  }

  // Se a página já carrega com um vídeo ativo, mostra o botão de download de imediato
  var initialActive = document.querySelector('.thumb-strip button.active');
  if (initialActive) {
    var initType = initialActive.getAttribute('data-type');
    if (initType === 'video' || initType === 'drive-video') {
      renderDownloadButton(initType, initialActive.getAttribute('data-src'));
    }
  } else if (mainSlot.querySelector('video')) {
    renderDownloadButton('video', mainSlot.querySelector('video').getAttribute('src'));
  } else if (mainSlot.querySelector('iframe')) {
    renderDownloadButton('drive-video', mainSlot.querySelector('iframe').getAttribute('src'));
  }

  if (thumbs.length === 0) return;

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      thumbs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var type = btn.getAttribute('data-type');
      var src = btn.getAttribute('data-src');

      if (type === 'video') {
        mainSlot.innerHTML = '<video src="' + src + '" controls playsinline></video>';
        renderDownloadButton('video', src);
      } else if (type === 'drive-video') {
        mainSlot.innerHTML = '<iframe src="' + src + '" width="100%" height="480" allow="autoplay" style="border:0; display:block;" allowfullscreen></iframe>';
        renderDownloadButton('drive-video', src);
      } else {
        var old = document.getElementById('media-download');
        if (old) old.remove();
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
