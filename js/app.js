"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Mocha", kategori: "Kopi", harga: 22000, stok: 0, unggulan: false },
  { nama: "Americano", kategori: "Kopi", harga: 15000, stok: 10, unggulan: false },
  { nama: "Coffe Latte", kategori: "Kopi", harga: 20000, stok: 12, unggulan: true },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 82000, stok: 3, unggulan: false },
];
console.table(produkUmkm);

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}
console.log(formatRupiah(85000));

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const badgeUnggulan = produk.unggulan == true
    ? `<span class="product-badge">Produk Unggulan</span>`
    : "";

  return `
    <article class="js-product-card">
      ${badgeUnggulan}
      <h3>${produk.nama}</h3>
      <p class="category-note">${labelKategori(produk.kategori)}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});
console.table(produkUmkm);

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);