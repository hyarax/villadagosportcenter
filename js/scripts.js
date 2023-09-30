/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// Mendapatkan elemen-elemen yang diperlukan
const jenisTiketElement = document.getElementById("jenisTiket");
const jumlahTiketElement = document.getElementById("jumlahTiket");
const totalElement = document.getElementById("total");

// Membuat event listener untuk perubahan pada jenis tiket atau jumlah tiket
jenisTiketElement.addEventListener("change", updateTotal);
jumlahTiketElement.addEventListener("input", updateTotal);

// Fungsi untuk menghitung dan memperbarui total harga
function updateTotal() {
  const jenisTiket = jenisTiketElement.value;
  const jumlahTiketValue = parseInt(jumlahTiketElement.value);

  // Memeriksa apakah jumlah tiket adalah angka yang valid
  if (!isNaN(jumlahTiketValue)) {
    let harga;

    if (jenisTiket === "regular-weekday") {
      harga = 20000;
    } else if (jenisTiket === "regular-weekend") {
      harga = 25000;
    }

    const total = harga * jumlahTiketValue;

    totalElement.value = total.toLocaleString();
  } else {
    // Jika jumlah tiket bukan angka yang valid, tampilkan pesan kesalahan atau kosongkan kolom total
    totalElement.value = "";
  }
}

// Memanggil fungsi updateTotal saat halaman pertama kali dimuat
updateTotal();

// Function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// WhatsApp format
function kirimWhatsApp() {
  const dateNow = new Date();

  const year = dateNow.getFullYear().toString();
  const month = (dateNow.getMonth() + 1).toString().padStart(2, "0");
  const day = dateNow.getDate().toString().padStart(2, "0");

  const formattedDate = year + month + day;

  // Generate a unique transaction ID
  const randomString = generateRandomString(4); // Change the length as needed

  const nomorTransaksi = formattedDate + randomString;

  // Set the generated transaction ID to the input field
  document.getElementById("nomorTransaksi").value = nomorTransaksi;

  // Mengambil nilai dari elemen-elemen form
  var nama = document.getElementById("nama").value;
  var noTelepon = document.getElementById("noTelepon").value;
  var jenisTiket = document.getElementById("jenisTiket").value;
  var jumlahTiket = document.getElementById("jumlahTiket").value;
  var tanggalKedatangan = document.getElementById("tanggalKedatangan").value;

  var total = document.getElementById("total").value;

  // Menggabungkan nilai-nilai ke dalam pesan WhatsApp
  var submit =
    "Halo, saya ingin memesan tiket sebagai berikut:" +
    "\nNomor Transaksi: " +
    nomorTransaksi +
    "\nNama: " +
    nama +
    "\nNo Telepon: " +
    noTelepon +
    "\nJenis Tiket: " +
    jenisTiket +
    "\nJumlah Tiket: " +
    jumlahTiket +
    "\nTanggal Kedatangan: " +
    tanggalKedatangan +
    "\nTotal: " +
    total;

  // Membuat URL WhatsApp dengan pesan yang telah diformat
  var urlWhatsApp =
    "https://wa.me/6282298371729?text=" + encodeURIComponent(submit);

  // Membuka tautan WhatsApp dalam tab baru
  window.open(urlWhatsApp, "_blank");
}
