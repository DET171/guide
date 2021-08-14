<template>
  <Layout>
    <template #page-bottom>
      <div>Copyright &copy; Dusty 2021 - {{ new Date().getFullYear() }}</div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>
