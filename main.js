// TEXT AREA
document.addEventListener("DOMContentLoaded", function () {
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  });
});

// JQUERY (Semua Fitur Interaktif)
$(document).ready(function () {
  // TYPING EFFECT (LOOPING SETIAP 2 DETIK) ---
  var $textElement = $(".namecard p");
  if ($textElement.length) {
    var fullText = "Computer Engineering";
    var i = 0;

    function typeWriter() {
      // Jika belum selesai mengetik
      if (i < fullText.length) {
        $textElement.append(fullText.charAt(i));
        i++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(function () {
          $textElement.text("");
          i = 0;
          typeWriter();
        }, 3000);
      }
    }

    $textElement.text("");
    setTimeout(typeWriter, 500);
  }

  // FUNGSI LOGIKA ANIMASI (REVEAL)
  function checkReveal() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var triggerPoint = 100;

    $(".reveal").each(function (index) {
      var $el = $(this);
      var elementTop = $el.offset().top;
      var elementBottom = elementTop + $el.outerHeight();

      // Cek apakah elemen ada di layar
      var isVisible =
        elementTop < scrollTop + windowHeight - triggerPoint &&
        elementBottom > scrollTop + triggerPoint;

      if (isVisible) {
        // --- MUNCUL ---
        if (!$el.hasClass("active")) {
          var delay = 0;
          // delay antrian untuk skill/project
          if ($el.hasClass("skill-pill") || $el.hasClass("project-card")) {
            delay = (index % 5) * 100;
          } else if ($el.hasClass("hero-delayed")) {
            delay = 0; // Hero image delay CSS
          }

          setTimeout(function () {
            $el.addClass("active");

            // Tunggu animasi selesai lalu efek Tilt 3D
            setTimeout(function () {
              $el.addClass("tilt-ready");
            }, 800);
          }, delay);
        }
      } else {
        // Reset
        $el.removeClass("active tilt-ready");

        // Bersihkan style sisa Tilt
        $el.attr("style", "");
      }
    });
  }

  // --- SCROLL EVENT ---
  // event listener untuk menangani semua perubahan saat discroll
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();

    // Jalankan Animasi Reveal
    checkReveal();

    // Background Text Fade Out
    var $projects = $("#projects");
    if ($projects.length) {
      // Buffer: Saat scroll sudah lewat 60% layar menuju projects, background hilang
      if (scrollPos + windowHeight * 0.6 > $projects.offset().top) {
        $(".textBackground").addClass("bg-hidden");
      } else {
        $(".textBackground").removeClass("bg-hidden");
      }
    }

    // Active Navigation
    var navHeight = 150;

    // Cek mentok bawah (Contact)
    if (window.innerHeight + scrollPos >= document.body.offsetHeight - 10) {
      $(".char-slot").removeClass("active-link");
      $(".char-slot").last().addClass("active-link");
    } else {
      // Cek posisi normal
      $(".char-slot a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));

        if (refElement.length) {
          var topPos = refElement.offset().top;
          var bottomPos = topPos + refElement.outerHeight();

          if (
            scrollPos >= topPos - navHeight &&
            scrollPos < bottomPos - navHeight
          ) {
            $(".char-slot").removeClass("active-link");
            currLink.parent().addClass("active-link");
          }
        }
      });
    }
  });

  // --- Char-Slot TEXT EFFECT (Hover Menu) ---
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  $(".char-slot a").on("mouseenter", function (event) {
    let iterations = 0;
    const target = event.target;
    const originalText = target.dataset.value || target.innerText;

    if (!target.dataset.value) target.dataset.value = originalText;

    const interval = setInterval(() => {
      target.innerText = target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) return originalText[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  });

  // --- 3D TILT EFFECT (Project Cards) ---
  $(".project-card").on("mousemove", function (e) {
    // Cek: Jangan tilt kalau animasi muncul belum selesai
    if (!$(this).hasClass("tilt-ready")) return;

    const width = $(this).width();
    const height = $(this).height();
    const offset = $(this).offset();

    const xVal = e.pageX - offset.left;
    const yVal = e.pageY - offset.top;

    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);

    $(this).css({
      transform:
        "perspective(1000px) rotateX(" +
        xRotation +
        "deg) rotateY(" +
        yRotation +
        "deg) scale(1.05)",
      transition: "transform 0.1s",
    });
  });

  $(".project-card").on("mouseleave", function () {
    if (!$(this).hasClass("tilt-ready")) return;

    $(this).css({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      transition: "transform 0.5s",
    });
  });

  // --- Inisialisasi ---
  // checkReveal sekali saat load
  checkReveal();
});
