<template>
  <div class="container-fluid py-4 mt-5">
    <!-- Header -->
    <div class="row align-items-center mb-4 mt-5 py-5">
      <div class="col-md-8">
        <h3 class="fw-bold mb-1 mt-5">Data Bahan Ajar</h3>
        <p class="text-muted mb-0">Kelola data inventaris bahan ajar Universitas Terbuka</p>
      </div>

      <!-- Tombol dan filter -->
      <div class="col-md-4 text-md-end mt-3 mt-md-0 d-flex flex-wrap gap-2">
        <button
          class="btn-solid theme-primary"
          data-bs-toggle="dialog"
          data-bs-target="#addData"
          @click="add"
        >
          <i class="bi bi-plus-circle me-2"></i>
          Tambah Data
        </button>

        <div class="form-field">
          <select class="form-control" v-model="upbjj">
            <option value="">UPBJJ List</option>
            <option v-for="lokasi in data.upbjjList" :key="lokasi" :value="lokasi">
              {{ lokasi }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <select v-model="Kategori" class="form-control">
            <option value="">Kategori List</option>
            <option v-for="kategori in data.kategoriList" :key="kategori" :value="kategori">
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

    <!-- Dialog tambah dan edit data -->
    <div class="dialog">
      <dialog class="dialog" id="addData">
        <div class="dialog-header">
          <h1 class="dialog-title">
            <i class="bi bi-pencil-square me-2"></i>
            Add Data
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="dialog" aria-label="Close"></button>
        </div>

        <div class="dialog-body">
          <div class="row grid grid-cols-2">
            <div class="kode col-md-6">
              <input type="text" class="form-control" id="kode" placeholder="Masukan Kode Matkul">
            </div>
            <div class="judul col-md-6">
              <input type="text" class="form-control" id="judul" placeholder="Masukan Judul Matkul">
            </div>
            <div class="kategori col-md-6">
              <input type="text" class="form-control" id="kategori" placeholder="Masukan Kategori Matkul">
            </div>
            <div class="upbjj col-md-6">
              <input type="text" class="form-control" id="upbjj" placeholder="Masukan UPBJJ Matkul">
            </div>
            <div class="lokasiRak col-md-6">
              <input type="text" class="form-control" id="lokasiRak" placeholder="Masukan Lokasi Rak">
            </div>
            <div class="harga col-md-6">
              <input type="text" class="form-control" id="harga" placeholder="Masukan Harga Matkul">
            </div>
            <div class="qty col-md-6">
              <input type="text" class="form-control" id="qty" placeholder="Masukan Qty Matkul">
            </div>
            <div class="safety col-md-6">
              <input type="text" class="form-control" id="safety" placeholder="Masukan Safety Stock">
            </div>
          </div>

          <div class="catatan col-md-6 mt-5">
            <textarea class="form-control" id="catatan" placeholder="Masukan Catatan"></textarea>
          </div>
        </div>

        <div class="dialog-footer">
          <button type="button" class="btn-solid theme-secondary" data-bs-dismiss="dialog">Close</button>
          <button type="button" class="btn-solid theme-primary" @click="addData">Save Changes</button>
        </div>
      </dialog>

      <dialog class="dialog" id="editData" v-if="dataEdit">
        <div class="dialog-header">
          <h1 class="dialog-title">Edit Data Bahan Ajar</h1>
          <button type="button" class="btn-close" data-bs-dismiss="dialog" aria-label="Close"></button>
        </div>

        <div class="dialog-body">
          <div class="row grid grid-cols-2">
            <div class="kode col-md-6">
              <input type="text" class="form-control" id="editKode" placeholder="Masukan Kode Matkul" v-model="dataEdit.kode">
            </div>
            <div class="judul col-md-6">
              <input type="text" class="form-control" id="editJudul" placeholder="Masukan Judul Matkul" v-model="dataEdit.judul">
            </div>
            <div class="kategori col-md-6">
              <input type="text" class="form-control" id="editKategori" placeholder="Masukan Kategori Matkul" v-model="dataEdit.kategori">
            </div>
            <div class="upbjj col-md-6">
              <input type="text" class="form-control" id="editUpbjj" placeholder="Masukan UPBJJ Matkul" v-model="dataEdit.upbjj">
            </div>
            <div class="lokasiRak col-md-6">
              <input type="text" class="form-control" id="editLokasiRak" placeholder="Masukan Lokasi Rak" v-model="dataEdit.lokasiRak">
            </div>
            <div class="harga col-md-6">
              <input type="text" class="form-control" id="editHarga" placeholder="Masukan Harga Matkul" v-model="dataEdit.harga">
            </div>
            <div class="qty col-md-6">
              <input type="text" class="form-control" id="editQty" placeholder="Masukan Qty Matkul" v-model="dataEdit.qty">
            </div>
            <div class="safety col-md-6">
              <input type="text" class="form-control" id="editSafety" placeholder="Masukan Safety Stock" v-model="dataEdit.safety">
            </div>
          </div>

          <div class="catatan col-md-6 mt-5">
            <textarea class="form-control" id="editCatatan" placeholder="Masukan Catatan" v-model="dataEdit.catatanHTML"></textarea>
          </div>
        </div>

        <div class="dialog-footer">
          <button type="button" class="btn-solid theme-secondary" data-bs-dismiss="dialog">Close</button>
          <button type="button" class="btn-solid theme-primary" @click="simpanEdit">Save Changes</button>
        </div>
      </dialog>
    </div>

    <!-- Tabel Bahan Ajar -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3">
        <div class="row align-items-center g-3">
          <div class="col-md-6">
            <h5 class="fw-bold mb-1">Daftar Bahan Ajar</h5>
            <small class="text-muted">Informasi persediaan bahan ajar</small>
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
              >
            </div>
          </div>
        </div>
      </div>

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
                  <span class="badge text-bg-primary">{{ item.kategori }}</span>
                </td>
                <td>{{ item.upbjj }}</td>
                <td>{{ item.lokasiRak }}</td>
                <td>{{ item.harga }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-center">{{ item.safety }}</td>
                <td><span v-html="item.catatanHTML"></span></td>
                <td>
                  <span class="badge text-bg-success">
                    <i class="bi bi-check-circle me-1"></i>
                  </span>
                </td>
                <td>
                  <button
                    class="btn-solid theme-warning"
                    data-bs-toggle="dialog"
                    data-bs-target="#editData"
                    @click="editdata(item)"
                  >
                    Edit
                  </button>
                </td>
              </tr>

              <tr v-if="stok.length === 0">
                <td colspan="12" class="text-center">
                  <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                  Data bahan ajar tidak ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-footer bg-white py-3">
        <div class="row align-items-center">
          <div class="col-md-6">
            <small class="text-muted">Menampilkan {{ stok.length }} data</small>
          </div>
          <div class="col-md-6">
            <nav class="d-flex justify-content-md-end mt-2 mt-md-0">
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
import { ref, computed } from 'vue'

const Kategori = ref('')
const cari = ref('')
const upbjj = ref('')
const dataEdit = ref(null)
const kodeAsli = ref('')

const stok = computed(() => {
  return data.stok.filter((item) => {
    const kata = cari.value.toLowerCase()
    const cocokKode = String(item.kode ?? '').toLowerCase().includes(kata)
    const cocokJudul = String(item.judul ?? '').toLowerCase().includes(kata)
    const cocokKategori = Kategori.value === '' || item.kategori === Kategori.value
    const cocokUpbjj = upbjj.value === '' || item.upbjj === upbjj.value

    return (cocokKode || cocokJudul) && cocokKategori && cocokUpbjj
  })
})

function editdata(item) {
  dataEdit.value = { ...item }
  kodeAsli.value = item.kode
}

function simpanEdit() {
  if (!dataEdit.value) return

  const index = data.stok.findIndex((item) => item.kode === kodeAsli.value)

  if (index === -1) {
    Swal.fire({
      title: 'Gagal!',
      text: 'Data tidak ditemukan!',
      icon: 'error'
    })
    return
  }

  Object.assign(data.stok[index], dataEdit.value)
  dataEdit.value = null
  kodeAsli.value = ''

  Swal.fire({
    title: 'Berhasil!',
    text: 'Data berhasil diperbarui!',
    icon: 'success'
  })
}
</script>
