<template>
  <div class="container-fluid py-5 mt-5">
    <!-- Header -->
    <div class="row align-items-center mb-4 pt-4 py-5 mt-5">
      <div class="col-md-8">
        <h3 class="fw-bold mb-1">
          <i class="bi bi-truck text-primary me-2"></i>
          Tracking Order
        </h3>
        <p class="text-muted mb-0">Pelacakan pengiriman bahan ajar Universitas Terbuka</p>
      </div>

      <div class="col-md-4 text-md-end mt-3 mt-md-0">
        <button class="btn btn-primary">
          <i class="bi bi-file-earmark-plus me-2"></i>
          Input DO
        </button>
      </div>
    </div>

    <!-- Pencarian DO -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-3">Cari Nomor Delivery Order</h5>

        <div class="row g-3">
          <div class="col-md-9">
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="nomorDo"
                type="text"
                class="form-control"
                placeholder="Masukkan nomor DO..."
              />
            </div>
          </div>

          <div class="col-md-3 d-grid">
            <button class="btn btn-primary" @click="noDo">
              <i class="bi bi-search me-2"></i>
              Lacak Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Informasi DO -->
    <div class="row g-4 mb-4" v-if="detailDo">
      <!-- Detail Pesanan -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white py-3">
            <h5 class="fw-bold mb-0">Informasi Pesanan</h5>
          </div>

          <div class="card-body">
            <div class="text-center mb-4">
              <div
                class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex p-4 mb-3"
              >
                <i class="bi bi-box-seam fs-1"></i>
              </div>

              <h5 class="fw-bold mb-2">DO2025-0001</h5>

              <span class="badge text-bg-primary"> Dalam Perjalanan </span>
            </div>

            <hr />

            <div class="mb-3">
              <small class="text-muted">Nama Mahasiswa</small>
              <div class="fw-semibold">Rina Wulandari</div>
            </div>

            <div class="mb-3">
              <small class="text-muted">NIM</small>
              <div class="fw-semibold">123456789</div>
            </div>

            <div class="mb-3">
              <small class="text-muted">Ekspedisi</small>
              <div class="fw-semibold">
                <i class="bi bi-truck text-primary me-2"></i>
                JNE
              </div>
            </div>

            <div class="mb-3">
              <small class="text-muted">Tanggal Pengiriman</small>
              <div class="fw-semibold">25 Agustus 2025</div>
            </div>

            <div class="mb-3">
              <small class="text-muted">Kode Paket</small>
              <div class="fw-semibold">PAKET-UT-001</div>
            </div>

            <div>
              <small class="text-muted">Total Pembayaran</small>
              <h5 class="fw-bold text-primary mb-0">Rp120.000</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Riwayat Pengiriman -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white py-3">
            <h5 class="fw-bold mb-1">
              <i class="bi bi-clock-history text-primary me-2"></i>
              Riwayat Pengiriman
            </h5>
            <small class="text-muted"> Informasi perjalanan paket bahan ajar </small>
          </div>

          <div class="card-body p-4">
            <!-- Timeline 1 -->
            <div class="d-flex mb-4">
              <div class="me-3">
                <span class="badge rounded-circle text-bg-success p-3">
                  <i class="bi bi-check-lg fs-6"></i>
                </span>
              </div>

              <div>
                <h6 class="fw-bold mb-1">Pesanan Sedang Dikirim</h6>
                <small class="text-muted"> 27 Agustus 2025 - 08:30 </small>
                <p class="mb-0 mt-2">
                  <i class="bi bi-geo-alt text-primary me-1"></i>
                  Jakarta Selatan
                </p>
                <small class="text-muted">
                  Paket sedang dalam perjalanan menuju alamat tujuan.
                </small>
              </div>
            </div>

            <hr />

            <!-- Timeline 2 -->
            <div class="d-flex mb-4">
              <div class="me-3">
                <span class="badge rounded-circle text-bg-primary p-3">
                  <i class="bi bi-truck fs-6"></i>
                </span>
              </div>

              <div>
                <h6 class="fw-bold mb-1">Paket Keluar dari Gudang</h6>
                <small class="text-muted"> 26 Agustus 2025 - 15:00 </small>
                <p class="mb-0 mt-2">
                  <i class="bi bi-geo-alt text-primary me-1"></i>
                  Tangerang Selatan
                </p>
                <small class="text-muted"> Paket telah meninggalkan gudang pengiriman. </small>
              </div>
            </div>

            <hr />

            <!-- Timeline 3 -->
            <div class="d-flex">
              <div class="me-3">
                <span class="badge rounded-circle text-bg-primary p-3">
                  <i class="bi bi-box-seam fs-6"></i>
                </span>
              </div>

              <div>
                <h6 class="fw-bold mb-1">Pesanan Diproses</h6>
                <small class="text-muted"> 25 Agustus 2025 - 10:00 </small>
                <p class="mb-0 mt-2">
                  <i class="bi bi-geo-alt text-primary me-1"></i>
                  UPBJJ Jakarta
                </p>
                <small class="text-muted">
                  Paket telah dikemas dan diserahkan kepada ekspedisi.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '../dataBahanAjar.json'

const nomorDo = ref('')
const detailDo = ref(null)

function noDo() {
  const nomor = nomorDo.value.trim().toLowerCase()

  detailDo.value = ''

  if (nomor == '') {
    Swal.fire({
      title: 'Warning',
      text: 'Masukan Nomor Do',
      icon: 'error',
    })
    return
  }

  if (data.tracking && data.tracking[nomor]) {
    detailDo.value = {
      nomorDo: nomor,
      ...data.tracking[nomor],
    }
  } else {
    Swal.fire({
      title: 'Peringatan!',
      text: 'Data Tidak Ditemukan.',
      icon: 'error',
    })
  }
}
</script>
