<template>
  <div>
    <h1>
      {{ $route.meta.title }}
    </h1>
    <p>
      {{ $route.meta.description }}
    </p>
    <p v-if="$route.meta.instructions">
      <strong>Instructions: </strong>
      {{ $route.meta.instructions }}
    </p>
    <p v-if="$route.meta.explanation">
      <strong>Explanation: </strong>
      {{ $route.meta.explanation }}
    </p>
    <p>
      <router-link :to="{ name: 'home' }">
        Back to Samples List
      </router-link>
    </p>
    <hr />
    <router-view />
  </div>
</template>
