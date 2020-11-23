<template>
  <article v-html="renderMd" />
</template>

<script>
import Prism from '~/plugins/prism'
export default {
  props: ['md'],
  mounted() {
    Prism.highlightAll()
  },
  computed: {
    renderMd() {
      return this.$md.render(this.md)
    },
  },
}
</script>

<style>
/* blockquote {
  background: var(--light);
  border-left: 0.5rem solid var(--info);
  padding: 1rem;
}
blockquote > p {
  margin: auto;
  color: darkslategrey;
} */
</style>
