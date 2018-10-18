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
              <router-link :to="'/blog-home?idUser='+post.users[0].id" class="author"><span class="name">{{post.users[0].username}}</span><img
                :src="post.users[0].thumbnail" alt=""/></router-link>
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
          <article class="mini-post" v-for="(post,index) in miniPayload">
            <header>
              <h3>
                <router-link :to="'/blog/'+post.id">{{post.title}}</router-link>
              </h3>
              <time class="published">{{post.createdAt}}</time>
              <a :href="'/blog-home?idUser='+post.users[0].id" class="author"><img :src="post.users[0].thumbnail"
                                                                                   alt=""/></a>
            </header>
            <router-link :to="'/blog/'+post.id" class="image"><img :src="post.image" alt=""/></router-link>
          </article>

        </div>
      </section>

      <section>
        <h3><i class="fa fa-tag" aria-hidden="true"></i>Tags</h3>
        <div class="list-tags" v-for="(tag,index) in tags" style="display: inline">
          <!--<button type="button" class="btn btn-secondary"><a :href="'/blog-home?tag='+tag.name">{{tag.name}} <span-->
          <!--class="badge">{{tag.count}}</span></a></button>-->
          <button type="button" class="btn btn-secondary">
            <router-link :to="'/blog-home?tag='+tag.name">{{tag.name}} <span
              class="badge">{{tag.count}}</span></router-link>
          </button>
        </div>
      </section>

      <!-- Quotes -->
      <section class="blurb">
        <h2>Quotes</h2>
          <p>{{quote}} </p>
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
  import {TweenLite,TimelineMax} from 'gsap/TweenMax'
  const serverHost = process.env.ROOT_API
  const axios = require('axios');
  const quotes = ['Good, better, best. Never let it rest. Til your good is better and your better is best', 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', 'To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to\n' +
  '          feel. That is the purpose of life.', 'The best preparation for tomorrow is doing your best today.', 'My life motto is \'Do my best, so that I can\'t blame myself for anything.']
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
        env: process.env.ROOT_API,
        payload: '',
        miniPayload: '',
        page: 1,
        tags: [],
        quote: quotes[0],
        picker: 0
      }
    },
    methods: {
      async beautyDate(date) {
        let ms = Date.parse(date);
        let now = new Date(ms);
        return Promise.resolve(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear())
      },
      fetchEventsList: function () {
        if(this.picker < 5){
          this.picker ++;
        }else {
          this.picker = 0;
        }
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
              params: {
                page: this.page
              }
            });
        } else if (!_.isUndefined(query.idUser)) {
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
            url: serverHost + "/tags"
          });
        if (result.data.success) {
          this.tags = result.data.payload
        }
      },
      async loadMiniPost() {
        let result = await axios({
          method: 'GET',
          url: serverHost + "/favorites/posts?section=1"
        });
        if (result.data.success) {
          this.miniPayload = result.data.payload
          for (let i = 0; i < this.miniPayload.length; i++) {
            this.miniPayload[i].createdAt = await this.beautyDate(this.miniPayload[i].createdAt)
            console.log(this.miniPayload.posts)
          }
        }
      }
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
        await this.loadMiniPost()
        setInterval(this.fetchEventsList, 5000)
      } catch (e) {
        console.log(e)
      }
    },
    watch: {
      async '$route.query'() {
        await this.loadposts()
      },
      async 'picker'() {
        // TimelineMax.to(this.$data, 1, {x: 200, opacity: 1,quote: quotes[picker]}).to(this.$data, 1, {x:400, opacity:0, ease: Power2.easeIn});
        this.quote= quotes[this.picker]
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.css";
</style>
