<template>
  <html>
  <head>
    <title>Future Imperfect by HTML5 UP</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
  </head>
  <body>
  <div id="wrapper">
    <blog-nav></blog-nav>
    <form>
      <div class="form-group">
        <label class="control-label">Title:</label>
        <input class="form-control" id="title" required v-model="post.title">
      </div>
      <div class="form-group">
        <label class="control-label">Abstract:</label>
        <textarea class="form-control" id="abstract" required v-model="post.abstract"></textarea>
      </div>
      <div v-for="(tag,index) in post.tags">
        <div class="form-group form-inline">
          <label class="control-label">Tag:</label>
          <input class="form-control" style="width: 200px" :id="'tag'+index" v-model="post.tags[index]" required>
          <i class="fa fa-plus-circle fa-2x" aria-hidden="true" v-on:click="addNewInput"></i>
          <i class="fa fa-window-close fa-2x" aria-hidden="true" v-on:click="deleteInput(index)"></i>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Image:</label>
        <input class="form-control" id="image" v-on:change="onFileSelected" type="file" ref="fileInput" required>
      </div>
      <div class="form-group">
        <label>Body:</label>
        <froala :tag="'textarea'" :config="config" v-model="post.body" id="body"></froala>
      </div>
      <button class="btn btn-success btn-lg pull-right " type="button" v-on:click="onUpload()">Finish</button>
    </form>
  </div>
  </body>
  </html>
</template>

<script>
  import Form from "bootstrap-vue/es/components/form/form";
  import VueFroala from 'vue-froala-wysiwyg';
  import BlogNav from './BlogNav'
  import $ from 'jquery'
  const FormData = require('form-data');
  const axios = require('axios');
  const constant = require('../../config/constant')
  let serverHost = constant.serverHost
  let changeImage = false
  export default {
    components: {Form, BlogNav},
    name: "blog-write",
    data() {
      return {
        post: {
          title: 'hello',
          image: null,
          abstract: 'hello',
          body: 'Edit Your Content Here',
          tags: ['']
        },
        postBlogUrl: serverHost + '/posts',
        config: {
          height: '300',
          imageUploadParam: 'file',
          imageUploadURL: serverHost + '/images',
          imageUploadMethod: 'POST',
          imageUploadRemoteUrls: true,
          imageMaxSize: 10 * 1024 * 1024,
          imageMove: true,
          imagePaste: true,
          fontFamilySelection: true,
          events: {
            'froalaEditor.initialized': function () {
            },
            'froalaEditor.image.uploaded': function (e, editor, response) {
            },
            'froalaEditor.image.error': function (e, editor, error, response) {
              console.log(error)
            },
            'froalaEditor.image.inserted': function (e, editor, $img, response) {
              console.log(response)
            }
          }
        },
      }
    },
    methods: {
      onFileSelected(event) {
        console.log(_.isUndefined(event.target.files[0]))
        if (!_.isUndefined(event.target.files[0])) {
          this.post.image = event.target.files[0]
          changeImage = true
        }
      },
      async changeTag(index) {
        console.log(this.tags)
      },
      async onUpload() {
        try {
          let idPost;
          console.log(this.tags)
          const fd = new FormData();
          let result;
          if (_.isUndefined(this.$route.query.idPost)) {
            if (this.post.image !== null) {
              fd.append('image', this.post.image, this.post.image.name)
              console.log(this.$localStorage.get('token'))
              result = await axios(
                {
                  method: 'POST',
                  url: this.postBlogUrl,
                  headers: {
                    'Authorization': 'Bearer ' + this.$localStorage.get('token'),
                    'Content-Type': 'multipart/form-data'
                  },
                  data: fd,
                  params: {
                    title: this.post.title,
                    abstract: this.post.abstract,
                    body: this.post.body,
                    tags: this.post.tags,
                  }
                });
              idPost = result.data.payload[0].id
            }
            else
              alert('Image not found')
          }
          else {
            idPost = this.$route.query.idPost
            if (changeImage) {
              fd.append('image', this.post.image, this.post.image.name)
            }
            result = await axios(
              {
                method: 'PUT',
                url: this.postBlogUrl + "/" + this.$route.query.idPost,
                headers: {
                  'Authorization': 'Bearer ' + this.$localStorage.get('token'),
                  'Content-Type': 'multipart/form-data'
                },
                data: fd,
                params: {
                  title: this.post.title,
                  abstract: this.post.abstract,
                  body: this.post.body,
                  tags: this.post.tags,
                  changeImage : changeImage
                }
              });
          }
          console.log(result)
          if (result.data.success) {
            window.location.replace('/blog/' + idPost)
          }
        } catch (err) {
          console.log(err)
        }
      },
      addNewInput: function () {
        this.post.tags.push('Tags' + Date.now())
      },
      deleteInput: function (index) {
        if (this.post.tags.length > 1) {
          this.post.tags.splice(index, 1)
        }
      }
    },
    beforeMount() {
      this.$nextTick(async () => {
        if (!_.isUndefined(this.$route.query.idPost)) {
          let result = await axios(
            {
              method: 'GET',
              url: serverHost + "/posts/" + this.$route.query.idPost
            });
          console.log(result)
          if (result.data.success) {
            this.post.title = result.data.payload.title
            this.post.body = result.data.payload.body
            this.post.abstract = result.data.payload.abstract
            let tick = _.map(result.data.payload.tags, 'name')
            this.post.tags.splice(0, 1)
            for(let i = 0; i< tick.length; i++){
              this.post.tags.push(tick[i])
            }
          }
        }
      });
    }
  }
</script>

<style scoped>
  @import "../assets/css/form.css";
  @import "../assets/css/main.css";
</style>
