<script></script>

<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <div class="movie-retail">Detail {{ $route.params.id }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail {
  padding: 16px;
}

.movie-detail h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
}

.movie-detail .featured-img {
  display: block;
  max-width: 200px;
  margin-bottom: 16px;
}

.movie-detail p {
  color: #fff;
  font-size: 18px;
  line-height: 1.4;
}
</style>
