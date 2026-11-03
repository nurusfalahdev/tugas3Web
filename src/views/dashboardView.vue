<template>
  <div class="container-fluid py-4 mt-5">
    <!-- Header -->
    <div class="row align-items-center mb-4 mt-5 py-5">
      <div class="col-md-8">
        <h3 class="fw-bold mb-1 mt-5">Data Bahan Ajar</h3>
        <p class="text-muted mb-0">Kelola data inventaris bahan ajar Universitas Terbuka</p>
      </div>

      -
      <div class="col-md-4 text-md-end mt-3 mt-md-0 d-flex flex-wrap gap-2">
        <button class="btn-solid theme-primary" commandfor="invokerDialog" command="show-modal">
          <i class="bi bi-plus-circle me-2"></i>
          Tambah Data
        </button>
        <!-- upbjj list -->
        <div class="form-field">
          <select class="form-control" id="exampleFormControlSelect2" v-model="upbjj">
            <option value="">Upbjj List</option>
            <option v-for="upbjj in data.upbjjList" :value="upbjj" :key="upbjj">{{ upbjj }}</option>
          </select>
        </div>

        <div class="form-field">
          <select v-model="Kategori" class="form-control" id="exampleFormControlSelect2">
            <option value="">Kategori list</option>
            <option :value="kategori" v-for="kategori in data.kategoriList" :key="kategori">
              {{ kategori }}
            </option>
          </select>
        </div>

        <button
          class="btn-solid theme-secondary"
          @click="
            cari = '';
            Kategori = '';
            upbjj = '';
          "
        >
          <i class="bi bi-arrow-counterclockwise me-1"></i>
          Reset
        </button>
      </div>
    </div>

    <!-- modal dialog -->
    <dialog class="dialog" id="invokerDialog">
      <div class="dialog-header">
        <h1 class="dialog-title">Invoker Commands</h1>
        <button
          type="button"
          class="btn-close"
          commandfor="invokerDialog"
          command="close"
          aria-label="Close"
        ></button>
      </div>
      <div class="dialog-body">
        <p>
          This dialog opens with <code>command="show-modal"</code> and closes with
          <code>command="close"</code>. No Bootstrap JavaScript is involved.
        </p>
      </div>
      <div class="dialog-footer">
        <button
          type="button"
          class="btn-solid theme-secondary"
          commandfor="invokerDialog"
          command="close"
        >
          Close
        </button>
      </div>
    </dialog>

    <!-- Tabel Bahan Ajar -->
    <div class="card border-0 shadow-sm">
      <!-- Card Header -->
      <div class="card-header bg-white py-3">
        <div class="row align-items-center g-3">
          <div class="col-md-6">
            <h5 class="fw-bold mb-1">Daftar Bahan Ajar</h5>
            <small class="text-muted"> Informasi persediaan bahan ajar </small>
          </div>

          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="cari"
                type="text"
                class="form-control"
                placeholder="Cari kode atau judul bahan ajar..."
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle mb-0">
            <thead class="table-primary">
              <tr>
                <th class="text-center">No</th>
                <th>Kode</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>UPBJJ</th>
                <th>Lokasi Rak</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Safety</th>
                <th>Catatan HTML</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in stok" :key="item.kode">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="fw-semibold text-primary">{{ item.kode }}</td>
                <td>{{ item.judul }}</td>
                <td>
                  <span class="badge text-bg-primary"> {{ item.kategori }} </span>
                </td>
                <td>{{ item.upbjj }}</td>
                <td>{{ item.lokasiRak }}</td>
                <td>{{ item.harga }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-center">{{ item.safety }}</td>
                <td>{{ item.catatanHTML }}</td>
                <td>
                  <span class="badge text-bg-success">
                    <i class="bi bi-check-circle me-1"></i>
                  </span>
                </td>
                <td>
                  <button class="btn-solid theme-warning">Edit</button>
                </td>
              </tr>

              <tr v-if="stok.length == 0">
                <td colspan="11" class="text-center">
                  <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                  Data bahan ajar tidak ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="card-footer bg-white py-3">
        <div class="row align-items-center">
          <div class="col-md-6">
            <small class="text-muted"> Menampilkan 2 dari 120 data </small>
          </div>

          <div class="col-md-6">
            <nav class="d-flex justify-content-md-end mt-2 mt-md-0">
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled">
                  <a class="page-link" href="#"> Previous </a>
                </li>

                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#"> Next </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '../dataBahanAjar.json'
import { ref, computed, reactive } from 'vue'

const Kategori = ref('')
const cari = ref('')
const upbjj = ref('')

const stok = computed(() => {
  return data.stok.filter((item) => {
    const kata = cari.value.toLowerCase()

    const cocok =
      String(item.kode ?? '')
        .toLowerCase()
        .includes(kata) ||
      String(item.judul ?? '')
        .toLowerCase()
        .includes(kata)
    const cocokkategori = Kategori.value === '' || item.kategori === Kategori.value
    const cocokUpbjj = upbjj.value === '' || item.upbjj === upbjj.value
    return cocok && cocokkategori && cocokUpbjj
  })
})
</script>
