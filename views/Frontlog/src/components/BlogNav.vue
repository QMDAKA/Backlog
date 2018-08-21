<template>
  <!-- Header -->
  <div id="nav">
    <header id="header">
      <h1>
        <a href="/blog-home">Home</a>
      </h1>
      <nav class="links">
        <ul>
          <li v-if="checkUser()">
            <router-link to="/write">Write Post</router-link>
          </li>
          <li v-if="checkUser()">
            <router-link to="/user/favorited-post">Favorited Post</router-link>
          </li>
          <li><a href="#">Dev In Japorn</a></li>
          <li><a href="#">Stories</a></li>
          <li><a href="#">About me</a></li>
        </ul>
      </nav>
      <nav class="main">
        <ul>
          <li class="search">
            <a class="fa-search" href="#search">Search</a>
            <form id="search" method="get" action="#">
              <input type="text" name="query" placeholder="Search"/>
            </form>
          </li>
          <li v-if="checkUser()">
            <div class="dropdown show">
              <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user faicon"><span> {{ user.username}}</span></i>
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <router-link class="dropdown-item" to="#"><i class="fa fa-user fa-fw"></i>Profile</router-link>
                <router-link class="dropdown-item" to="/user/my-post"><i class="fa fa-file-text fa-fw"></i>Your Post</router-link>
                <router-link class="dropdown-item" to="/user/favorited-post"><i class="fa fa-heart fa-fw"></i>Favorited Post</router-link>
                <a class="dropdown-item" :href="logout" v-on:click="removeStorage"><i class="fa fa-sign-out fa-fw"></i>Logout</a>
              </div>
            </div>
          </li>
          <li v-else>
            <a class="fa-sign-in" data-toggle="modal" data-target="login-modal" v-on:click="showModal">SignIn</a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="modal fade-center" id="login-modal" role="dialog" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body text-center">
            <button type="button" class="btn btn-danger login">
              <a v-bind:href="authenticate"><i class="fa fa-google-plus" aria-hidden="true"> Sign in with
                google </i></a>
            </button>
            <button type="button" class="btn btn-primary login">
              <i class="fa fa-facebook" aria-hidden="true"> Sign in with facebook</i>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
    <!-- Menu -->
    <section id="menu">

      <!-- Search -->
      <section>
        <form class="search" method="get" action="#">
          <input type="text" name="query" placeholder="Search"/>
        </form>
      </section>


    </section>
  </div>
</template>

<script>
  const _ = require('lodash');
  const $ = require('jquery');
  const axios = require('axios');
  const constant = require('../../config/constant')
  let serverHost = constant.serverHost
  let currentUser;
  export default {
    name: "blog-nav",
    data() {
      return {
        user: null,
        host: serverHost,
        authenticate: serverHost + "/auth/authenticate",
        logout: serverHost+ "/auth/logout"
      }
    },
    methods: {
      checkUser: function () {
        if (this.$data.user != null) {
          return true;
        } else {
          return false;
        }
      },
      showModal: function () {
        $('#login-modal').modal('show');
      },
      removeStorage: function () {
        this.$localStorage.remove('token');
        this.$localStorage.remove('user');

      }
    },
    async created() {
      if(this.$localStorage.get('token') === null ){
        if(!_.isUndefined(this.$route.query.token)) {
          this.$localStorage.set('token', this.$route.query.token)
          let result = await axios.get(serverHost + '/users/me', {
            headers: {
              'Authorization': 'Bearer ' + this.$localStorage.get('token')
            }
          });
          this.$data.user = result.data.payload[0];
          this.$localStorage.set('user', JSON.stringify(result.data.payload[0]))
        }
      }else {
        this.$data.user = JSON.parse(this.$localStorage.get('user'))
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.css";
  @import "../assets/css/nav.css";
</style>
