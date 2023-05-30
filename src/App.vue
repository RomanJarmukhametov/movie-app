<script setup>
import { RouterView } from 'vue-router'
import { useTitle } from '@vueuse/core'

const title = useTitle()

title.value = 'Movie App'
</script>

<template>
  <header class="container-fluid">
    <div class="row">
      <div class="col">
        <RouterLink to="/">
          <h1><span>Movie</span> App</h1>
        </RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

body {
  background-color: #35495e;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1rem;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  color: #fff;
  font-size: 1.75rem;
}

header h1 span {
  color: #42b883;
}

h4 {
  color: #fff;
}
</style>
