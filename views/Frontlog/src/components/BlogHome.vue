<template>
  <!DOCTYPE HTML>
  <!--
      Future Imperfect by HTML5 UP
      html5up.net | @ajlkn
      Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
  -->
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
    <!-- Main -->
    <div id="main">
      <!-- Post -->
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
          <a class="image featured">
            <img :src="post.image" alt="" class="img-fluid"/>
          </a>
          <p>{{post.abstract}}</p>
          <footer>
            <ul class="actions">
              <li>
                <router-link :to="'/blog/'+post.id" class="button big">Continue Reading</router-link>
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
        :containerClass="'pagination'">
      </paginate>
    </div>
    <!-- Sidebar -->
    <section id="sidebar">

      <blog-intro></blog-intro>
      <!-- Mini Posts -->
      <section>
        <h3>Most Favorited Post</h3>
        <div class="mini-posts">

          <!-- Mini Post -->
          <article class="mini-post">
            <header>
              <h3><a href="#">Vitae sed condimentum</a></h3>
              <time class="published" datetime="2015-10-20">October 20, 2015</time>
              <a href="#" class="author"><img src="../images/avatar.jpg" alt=""/></a>
            </header>
          </article>

          <!-- Mini Post -->
          <article class="mini-post">
            <header>
              <h3><a href="#">Rutrum neque accumsan</a></h3>
              <time class="published" datetime="2015-10-19">October 19, 2015</time>
              <a href="#" class="author"><img src="../images/avatar.jpg" alt=""/></a>
            </header>
            <a href="#" class="image"><img src="../images/pic05.jpg" alt=""/></a>
          </article>

          <!-- Mini Post -->
          <article class="mini-post">
            <header>
              <h3><a href="#">Odio congue mattis</a></h3>
              <time class="published" datetime="2015-10-18">October 18, 2015</time>
              <a href="/blog" class="author"><img src="../images/avatar.jpg" alt=""/></a>
            </header>
            <a href="#" class="image"><img src="../images/pic06.jpg" alt=""/></a>
          </article>

          <!-- Mini Post -->
          <article class="mini-post">
            <header>
              <h3><a href="#">Enim nisl veroeros</a></h3>
              <time class="published" datetime="2015-10-17">October 17, 2015</time>
              <a href="#" class="author"><img src="../images/avatar.jpg" alt=""/></a>
            </header>
            <a href="#" class="image"><img src="../images/pic07.jpg" alt=""/></a>
          </article>

        </div>
      </section>

      <!-- Posts List -->
      <section>
        <h3><i class="fa fa-tag" aria-hidden="true"></i>Tags</h3>
        <div class="list-tags" v-for="(tag,index) in tags" style="display: inline">
          <button type="button" class="btn btn-secondary"><a :href="'/blog-home?tag='+tag.name">{{tag.name}} <span
            class="badge">{{tag.count}}</span></a></button>
        </div>
      </section>

      <!-- About -->
      <section class="blurb">
        <h2>About</h2>
        <p> To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to
          feel. That is the purpose of life.</p>
        <ul class="actions">
          <li><a href="#" class="button">Learn More</a></li>
        </ul>
      </section>

      <!-- Footer -->
      <section id="footer">
        <ul class="icons">
          <li><a href="#" class="fa-twitter"><span class="label">Twitter</span></a></li>
          <li><a href="#" class="fa-facebook"><span class="label">Facebook</span></a></li>
          <li><a href="#" class="fa-instagram"><span class="label">Instagram</span></a></li>
          <li><a href="#" class="fa-rss"><span class="label">RSS</span></a></li>
          <li><a href="#" class="fa-envelope"><span class="label">Email</span></a></li>
        </ul>
        <p class="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a
          href="http://unsplash.com">Unsplash</a>.</p>
      </section>
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
  export default {
    components: {BlogNav, Paginate, BlogIntro},
    name: 'blog-home',
    data() {
      return {
        payload: '',
        page: 1,
        tags: []
      }
    },
    methods: {
      async beautyDate(date) {
        let ms = Date.parse(date);
        let now = new Date(ms);
        return Promise.resolve(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear())
      },
      async loadposts() {
        let query = this.$route.query
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let result;
        if (_.isUndefined(query.idUser) && _.isUndefined(query.tag)) {
          result = await axios(
            {
              method: 'GET',
              url: serverHost + "/posts",
              headers: {
                'Authorization': 'Bearer ' + this.$localStorage.get('token'),
              },
              params: {
                page: this.page
              }
            });
        } else if (!_.isUndefined(query.idUser)) {
          console.log('load post with id user')
          result = await axios(
            {
              method: 'GET',
              url: serverHost + "/posts",
              params: {
                idUser: query.idUser,
                page: this.page
              }
            });
        } else if (!_.isUndefined(query.tag)) {
          console.log('load post with tag')
          result = await axios(
            {
              method: 'GET',
              url: serverHost + "/posts",
              params: {
                tag: query.tag,
                page: this.page
              }
            });
        }
        if (result.data.success) {
          this.payload = result.data.payload
          for (let i = 0; i < this.payload.posts.length; i++) {
            this.payload.posts[i].createdAt = await this.beautyDate(this.payload.posts[i].createdAt)
          }
        }
        console.log(this.payload)
      },
      async loadtags() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let result = await axios(
          {
            method: 'GET',
            url: serverHost + "/tags",
            headers: {
              'Authorization': 'Bearer ' + this.$localStorage.get('token'),
            }
          });
        if (result.data.success) {
          this.tags = result.data.payload
        }
      },
    },
    beforeMount() {
      this.$nextTick(() => {
        // intro

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
        await this.loadposts()
        await this.loadtags()
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.css";
</style>
