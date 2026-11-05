
<template>
  <div class="container-fluid py-5 mt-5">
    <!-- Header -->
    <div class="row align-items-center mb-4 pt-4">
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
              <input v-model="nomorDo" type="text" class="form-control" placeholder="Masukkan nomor DO..." @keyup.enter="noDo" />
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
            <!-- Header Informasi -->
            <div class="text-center mb-4">
              <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex p-4 mb-3">
                <i class="bi bi-box-seam fs-1"></i>
              </div>
              <h5 class="fw-bold mb-2">{{ detailDo.nomorDo }}</h5>
              <span class="badge" :class="warnaStatus(detailDo.status)">
                {{ detailDo.status }}
              </span>
            </div>
            <hr />

            <!-- Nama Mahasiswa -->
            <div class="mb-3">
              <small class="text-muted">Nama Mahasiswa</small>
              <div class="fw-semibold">{{ detailDo.nama }}</div>
            </div>

            <!-- NIM -->
            <div class="mb-3">
              <small class="text-muted">NIM</small>
              <div class="fw-semibold">{{ detailDo.nim }}</div>
            </div>

            <!-- Ekspedisi -->
            <div class="mb-3">
              <small class="text-muted">Ekspedisi</small>
              <div class="fw-semibold">
                <i class="bi bi-truck text-primary me-2"></i>
                {{ detailDo.ekspedisi }}
              </div>
            </div>

            <!-- Tanggal Pengiriman -->
            <div class="mb-3">
              <small class="text-muted">Tanggal Pengiriman</small>
              <div class="fw-semibold">{{ formatTanggal(detailDo.tanggalKirim) }}</div>
            </div>

            <!-- Kode Paket -->
            <div class="mb-3">
              <small class="text-muted">Kode Paket</small>
              <div class="fw-semibold">{{ detailDo.paket }}</div>
            </div>

            <!-- Total Pembayaran -->
            <div>
              <small class="text-muted">Total Pembayaran</small>
              <h5 class="fw-bold text-primary mb-0">{{ formatRupiah(detailDo.total) }}</h5>
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
            <small class="text-muted">Informasi perjalanan paket bahan ajar</small>
          </div>
          <div class="card-body p-4">
            <!-- Timeline -->
            <div v-for="(riwayat, index) in detailDo.perjalanan" :key="index">
              <div class="d-flex mb-4">
                <!-- Icon Timeline -->
                <div class="me-3">
                  <span class="badge rounded-circle p-3" :class="index === 0 ? 'text-bg-success' : 'text-bg-primary'">
                    <i class="fs-6" :class="index === 0 ? 'bi bi-check-lg' : 'bi bi-truck'"></i>
                  </span>
                </div>
                <!-- Informasi Riwayat -->
                <div>
                  <h6 class="fw-bold mb-1">{{ riwayat.keterangan }}</h6>
                  <small class="text-muted">
                    <i class="bi bi-calendar3 me-1"></i>
                    {{ formatWaktu(riwayat.waktu) }}
                  </small>
                </div>
              </div>
              <hr v-if="index !== detailDo.perjalanan.length - 1" />
            </div>

            <!-- Jika Riwayat Kosong -->
            <div v-if="detailDo.perjalanan.length === 0" class="text-center text-muted py-4">
              <i class="bi bi-clock-history fs-1"></i>
              <p class="mb-0 mt-2">Belum ada riwayat pengiriman.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import data from '../dataBahanAjar.json'

const nomorDo = ref('')
const detailDo = ref(null)

// Format Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka)
}

// Format Tanggal
function formatTanggal(tanggal) {
  if (!tanggal) return '-'
  return new Date(tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// Format Waktu
function formatWaktu(waktu) {
  if (!waktu) return '-'
  const tanggal = new Date(waktu.replace(' ', 'T'))
  return tanggal.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Warna Status
function warnaStatus(status) {
  switch (status) {
    case 'Selesai':
      return 'text-bg-success'
    case 'Dalam Perjalanan':
      return 'text-bg-primary'
    case 'Diproses':
      return 'text-bg-warning'
    default:
      return 'text-bg-secondary'
  }
}

// Pencarian Nomor DO
function noDo() {
  const nomor = nomorDo.value.trim().toUpperCase()
  detailDo.value = null

  if (nomor === '') {
    Swal.fire({
      title: 'Peringatan!',
      text: 'Masukkan Nomor DO terlebih dahulu.',
      icon: 'warning',
    })
    return
  }

  // Cari nomor DO dalam array tracking
  const hasil = data.tracking.find((item) => item[nomor])

  if (hasil) {
    detailDo.value = {
      nomorDo: nomor,
      ...hasil[nomor],
    }
  } else {
    Swal.fire({
      title: 'Tidak Ditemukan!',
      text: 'Nomor Delivery Order tidak tersedia.',
      icon: 'error',
    })
  }
}
</script>
