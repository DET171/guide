<template>
  <Layout>
    <template #sidebar-top>
      <img class="sbtop" alt="eris@latest" src="https://img.shields.io/npm/v/eris/latest?label=eris">
    </template>
    <template #page-bottom>
      <div style="text-align: center">Copyright &copy; Dusty 2021 - {{ new Date().getFullYear() }}</div>
    </template>
  </Layout>
</template>
<style lang="scss">
  /* PrismJS Theme --START-- */
  @import "https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-okaidia.css";
  /* --END-- */
  .sbtop {
    position: relative;
    top: 17px;
    left: 55px;
  }
</style>
<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import AOS from 'aos'

export default {
  components: {
    Layout,
  },
  mounted() {
    setTimeout(() => {
      var content = document.getElementsByClassName("theme-default-content")[0];
        console.log(content);
        var el = content.getElementsByTagName("P");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
        var el = content.getElementsByTagName("DIV");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
        var el = content.getElementsByTagName("H1");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
        var el = content.getElementsByTagName("UL");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
        var el = content.getElementsByTagName("OL");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
        var el = content.getElementsByTagName("H2");
        for (var i = 0; i < el.length; i++) {
          el[i].setAttribute("data-aos", "fade-up")
        }
      AOS.init({
        duration: 1000
      })
    }, 1000)
  },
  updated() {
    console.log('Updated!');
    setTimeout(() => {
      var content = document.getElementsByClassName("theme-default-content")[0];
		    console.log(content);
		    var el = content.getElementsByTagName("P");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
		    var el = content.getElementsByTagName("DIV");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
		    var el = content.getElementsByTagName("H1");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
				var el = content.getElementsByTagName("UL");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
				var el = content.getElementsByTagName("OL");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
		    var el = content.getElementsByTagName("H2");
		    for (var i = 0; i < el.length; i++) {
		      el[i].setAttribute("data-aos", "fade-up")
		    }
      AOS.init({
        duration: 1000
      })
    }, 1000)
  },
}
</script>
