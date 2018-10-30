<template>
  <body class="single">
  <!-- Wrapper -->
  <div id="wrapper">

    <!-- Main -->
    <div id="main">
      <blog-nav></blog-nav>
      <!-- Post -->
      <article class="post">
        <header>
          <meta property="fb:app_id" :content="2068549080101958" />
          <meta property="og:url" :content="baseUrl" />
          <meta property="og:type" content="article"/>
          <meta property="og:title" :content="title"/>
          <meta property="og:description" :content="abstract"/>
          <meta property="og:image" :content="image"/>
          <div class="title">
            <h2><a href="#">{{title}}</a></h2>
            <p class="show-tags" v-for="(tag,index) in tags" style="display: inline">
              #{{tag.name}}
            </p>
          </div>
          <div class="meta">
            <time class="published" :datetime="createdAt">{{createdAt}}</time>
            <a href="#" class="author"><span class="name">{{user.username}}</span><img :src='user.thumbnail'
                                                                                       alt=""/></a>
          </div>
        </header>
        <span class="image featured"><img :src='image' alt=""/></span>
        <froalaView v-model="body"></froalaView>
        <footer>
          <ul class="stats">
            <li><a href="#">General</a></li>
            <li><a class="icon fa-heart" @click="fav">{{countFav}}</a></li>
            <li><a href="#" class="icon fa-comment">0</a></li>
          </ul>
        </footer>
      </article>

    </div>

    <!-- Footer -->
    <section id="footer">
      <social-sharing :url='baseUrl' :title="title" :description="abstract" :image="image" inline-template
                      class="icons">
        <div>
          <network network="facebook">
            <i class="fa fa-fw fa-facebook"></i>
          </network>
          <network network="googleplus">
            <i class="fa fa-fw fa-google-plus"></i>
          </network>
          <network network="linkedin">
            <i class="fa fa-fw fa-linkedin"></i>
          </network>
          <network network="reddit">
            <i class="fa fa-fw fa-reddit"></i>
          </network>
        </div>
      </social-sharing>
    </section>
  </div>
  </body>
</template>

<script>
  import axios from 'axios'
  import BlogNav from './BlogNav'
  import SocialSharing from 'vue-social-sharing'
  import VueFroala from 'vue-froala-wysiwyg';

  let serverHost = process.env.ROOT_API
  export default {
    components: {BlogNav, SocialSharing},
    name: 'blog',
    data() {
      return {
        title: null,
        image: null,
        body: null,
        tags: [],
        user: null,
        countFav: null,
        createdAt: null,
        abstract: null,
        baseUrl: ''
      }
    },
    methods: {
      async beautyDate(date) {
        let ms = Date.parse(date);
        let now = new Date(ms);
        return Promise.resolve(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear())
      },
      async fav() {
        if (this.$localStorage.get('token') !== null) {
          let result = await axios(
            {
              method: 'POST',
              url: serverHost + "/favorites",
              headers: {
                'Authorization': 'Bearer ' + this.$localStorage.get('token'),
              },
              params: {
                postId: this.$route.params.id
              }
            });
          if (result.data.payload.status === 'created') {
            this.countFav++
          } else if (result.data.payload.status === 'exist') {
            this.countFav--
            let resultDelete = await axios({
              method: 'DELETE',
              url: serverHost + "/favorites/" + result.data.payload.fav.id,
              headers: {
                'Authorization': 'Bearer ' + this.$localStorage.get('token'),
              },
            })
          }
        }
      },
    },
    async beforeMount() {
      try {
        this.baseUrl = window.location.href
        console.log(this.baseUrl)
        console.log(this.$route.params.id);
        let result = await
          axios(
            {
              method: 'GET',
              url: serverHost + "/posts/" + this.$route.params.id
            });
        if (result.data.success) {
          this.image = result.data.payload.image
          this.title = result.data.payload.title
          this.body = result.data.payload.body
          this.tags = result.data.payload.tags
          this.countFav = result.data.payload.countFav
          this.user = result.data.payload.users[0]
          this.abstract = result.data.payload.abstract
          this.createdAt = await this.beautyDate(result.data.payload.createdAt)
          console.log(this.createdAt)
        }
      } catch (e) {
        this.errors.push(e)
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.css";

</style>
