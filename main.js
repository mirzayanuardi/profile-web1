// Fitur Auto Resize untuk Textarea Pesan
// Script ini otomatis mendeteksi semua elemen textarea di halaman
document.addEventListener("DOMContentLoaded", function () {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      // 1. Reset tinggi dulu (penting jika user menghapus teks)
      this.style.height = "auto";
      // 2. Set tinggi baru sesuai konten di dalamnya
      this.style.height = this.scrollHeight + "px";
    });
  });
});
