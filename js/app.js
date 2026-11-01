"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Mocha", kategori: "Kopi", harga: 22000, stok: 0, deskripsi: "Perpaduan espresso & coklat yang pas" },
  { nama: "Americano", kategori: "Kopi", harga: 15000, diskonPersen: 20, stok: 10, deskripsi: "Kopi hitam klasik" },
  { nama: "Coffe Latte", kategori: "Kopi", harga: 20000, stok: 12, deskripsi: "Espresso dengan susu creamy yang lembut" },
  { nama: "Paket Seduh", kategori: "Bundling", harga: 82000, stok: 3, deskripsi: "Paket hemat siap seduh di rumah" },
];
console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok == 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Minum di tempat";
    case "Bundling":
      return "Paket seduh rumahan/harian";
    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

  let infoHarga = `<p class="price">${formatRupiah.format(produk.harga)}</p>`;

  if (produk.diskonPersen && produk.diskonPersen > 0){
    const besarPotongan = (produk.harga * produk.diskonPersen) / 100;
    const hargaDiskon = Math.round(produk.harga - besarPotongan);

  infoHarga = `
        <p class="price-normal"><del>${formatRupiah.format(produk.harga)}</del> (${produk.diskonPersen}%)</p>
        <p class="price-promo">${formatRupiah.format(hargaDiskon)}</p>
    `;
  }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="deskripsi">${produk.deskripsi}</p>
        ${infoHarga}
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);