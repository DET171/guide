<template>
  <Layout>
    <template #sidebar-top>
      <details class="sbtop" style="cursor: pointer;">
        Theme:
        <button type="button" style="background-color: #00cc30;" class="btn" @click="c('#00cc30', '#00de34')"></button>
        <button type="button" style="background-color: #0f73ff;" class="btn" @click="c('#0064f0', '#0f73ff')"></button>
      </details>
    </template>
    <template #page-bottom>
      <div style="text-align: center">Copyright &copy; Dusty 2021 - {{ new Date().getFullYear() }}</div>
    </template>
  </Layout>
</template>
<style lang="ssss">
  /* PrismJS Theme --START-- */
  @import "https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-okaidia.css";
  /* --END-- */
  .sbtop {
    margin: 10px;
  }
  .btn{
   /* border: 1px solid #ddd;
   background-color: #f0f0f0; */
   padding: 4px 12px;
   border: none;
   height: 10px;
   width: 10px;
  }

</style>
<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import AOS from 'aos'

export default {
  components: {
    Layout,
  },
  methods: {
    c: (b, bl) => {
      const root = document.documentElement;
      root.style.setProperty('--c-brand', b);
      root.style.setProperty('--c-brand-light', bl);
    },
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
