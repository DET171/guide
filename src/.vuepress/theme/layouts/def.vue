<template>
  <Layout>
    <template #page-bottom>
      <div style="text-align: center">Copyright &copy; Dusty 2021 - {{ new Date().getFullYear() }}</div>
    </template>
  </Layout>
</template>
<style>
  /* PrismJS Theme --START-- */
  @import "https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-okaidia.css";
  /* --END-- */
</style>
<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>
