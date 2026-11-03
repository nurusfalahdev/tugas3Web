<template>
  <nav class="navbar bg-1 fg-2 navbar-dark bg-primary fixed-top" data-bs-theme="light">
    <a class="navbar-brand fs-lg" href="#">Sitta Praktik 3</a>
    <ul class="nav justify-content-center container">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <i class="bi bi-house-door-fill"></i>
          Dashboard</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/td" class="nav-link">
          <i class="bi bi-bag-fill"></i>
          Tracking DO</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/id" class="nav-link">
          <i class="bi bi-file-plus-fill"></i>
          Input Do
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup></script>
