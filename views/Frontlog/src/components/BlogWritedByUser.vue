<template>
  <html>
  <head>
    <title>Future Imperfect by HTML5 UP</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
  </head>
  <body>
  <!-- Wrapper -->
  <div id="wrapper">
    <blog-nav></blog-nav>
    <div id="main">
      <div class="main-post" v-for="(post,index) in payload.posts">
        <article class="post">
          <header>
            <div class="title">
              <h2>
                <router-link :to="'/blog/'+post.id">{{post.title}}</router-link>
              </h2>
              <p class="show-tags" v-for="(tag,index) in post.tags" style="display: inline">
                #{{tag.name}}
              </p>
            </div>
            <div class="meta">
              <time class="published" :datetime="beautyDate(post.createdAt)">{{post.createdAt}}</time>
              <a :href="'/blog-home?idUser='+post.users[0].id" class="author"><span class="name">{{post.users[0].username}}</span><img
                :src="post.users[0].thumbnail" alt=""/></a>
            </div>
          </header>
          <p>{{post.abstract}}</p>
          <footer>
            <ul class="actions">
              <li>
                <router-link :to="'/blog/' + post.id" class="button big">Continue Reading</router-link>
                <a class="button big" @click="remove(post.id)">Remove</a>
                <router-link :to="'/write?idPost=' + post.id" class="button big">Update Post</router-link>
              </li>
            </ul>
          </footer>
        </article>
      </div>
      <paginate
        v-model="page"
        :pageCount="payload.pageSize"
        :click-handler="loadposts"
        :margin-pages="2"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'pagination'"></paginate>
    </div>
    <!-- Sidebar -->
    <section id="sidebar">
      <blog-intro></blog-intro>

    </section>
  </div>
  </body>
  </html>
</template>

<script>
  import skel from 'skel-framework-npm'
  import $ from 'jquery'
  import BlogNav from './BlogNav'
  import BlogIntro from './BlogIntro'
  import Paginate from 'vuejs-paginate'

  const constant = require('../../config/constant')
  const serverHost = constant.serverHost
  const axios = require('axios');
  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });
  let idUser = null;
  export default {
    components: {BlogNav, Paginate, BlogIntro},
    name: "blog-writed-by-user",
    data() {
      return {
        payload: '',
        page: 1,
        tags: [],
      }
    },
    methods: {
      async beautyDate(date) {
        let ms = Date.parse(date);
        let now = new Date(ms);
        return Promise.resolve(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear())
      },
      async loadposts() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let result = await axios(
          {
            method: 'GET',
            url: serverHost + "/users/" + idUser + "/posts",
            params: {
              page: this.page
            },
          });
        if (result.data.success) {
          this.payload = result.data.payload
          for (let i = 0; i < this.payload.posts.length; i++) {
            this.payload.posts[i].createdAt = await this.beautyDate(this.payload.posts[i].createdAt)
          }
        }
      },
      async remove(id) {
        let result = await axios(
          {
            method: 'DELEtE',
            url: serverHost + "/posts/" + id,
            headers: {
              'Authorization': 'Bearer ' + this.$localStorage.get('token')
            }
          });
        if (result.data.success) {
          await this.loadposts()
        } else {
          alert('fill token')
        }
      }
    },
    beforeMount() {
      this.$nextTick(() => {
        // intro
        this.$data.user = JSON.parse(this.$localStorage.get('user'))
        skel
          .on('+large', function () {
            console.log('zz')
            $('#intro').prependTo('#main')
          })
          .on('-large', function () {
            console.log('aa')
            $('#intro').prependTo('#sidebar')
          });
      });
    },
    async mounted() {
      try {
        idUser = JSON.parse(this.$localStorage.get('user')).id
        await this.loadposts()
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.css";
</style>
