<template>
  <article v-html="markdown" />
</template>

<script>
export default {
  props: ['markdown'],
}
</script>

<style>
blockquote {
  background: var(--light);
  border-left: 0.5rem solid var(--info);
  padding: 1rem;
}
blockquote > p {
  margin: auto;
  color: darkslategrey;
}
</style>
