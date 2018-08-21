<template>
  <div id="app">
    <section>
      <h1>🍺 Make yourself some Punk Beers 🍻</h1>
      <div v-if="beers.length === 0" class="loading">Loading...</div>
      <div v-for="beer in beers" :key="beer.img" class="beer-contain">
        <div class="beer-img">
          <img :src="beer.img" height="350" />
        </div>
        <div class="beer-info">
          <h2>{{ beer.name }}</h2>
          <p class="bright">{{ beer.tagline }}</p>
          <p><span class="bright">Description:</span> {{ beer.desc }}</p>
          <p><span class="bright">Tips:</span> {{ beer.tips }}</p>
          <h3 class="bright">Food Pairings</h3>
          <ul>
            <li v-for="item in beer.food" :key="item.id">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'beer',
  data () {
    return {
      bottom: false,
      beers: []
    }
  },
  methods: {
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      console.log(scrollY + ',' + visible + ',' + pageHeight)
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    async addBeer () {
      try {
        let response = await axios.get('https://api.punkapi.com/v2/beers/random')
        let api = response.data[0]
        let apiInfo = {
          name: api.name,
          desc: api.description,
          img: api.image_url,
          tips: api.brewers_tips,
          tagline: api.tagline,
          food: api.food_pairing
        }
        this.beers.push(apiInfo)
        if (this.bottomVisible()) {
          this.addBeer()
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.addBeer()
      }
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.addBeer()
  }
}
</script>

<style scoped>
  body {
    font-family: 'Archivo Narrow', sans-serif;
    background: #ffb3ff;
  }

  h1, h2, h3, h4 {
    font-family: 'Spectral SC', serif;
  }

  h1 {
    margin-top: 40px;
    color: #000000;
    text-align: center;
  }

  .loading {
    color: #e6e6e6;
    text-align: center;
    font-size: 20px;
  }

  .display {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #app {
  @extend .display;
    flex-direction: column;
  }

  .beer-contain {
  @extend .display;
    width: 50%;
    margin: 20px 24%;
    box-shadow: 0 2px 3px 1px rgba(30, 0, 0, 0.1);
  }

  .beer-img {
  @extend .display;
    padding: 30px;
    background: #99ddff;
    border: 1px solid #88498F;
    border-right: 1px solid #f44822;
  }

  .beer-info {
    background: #5c8a8a;
    color: white;
    padding: 30px;
    border: 1px solid #88498F;
  }
  .bright {
    color: #fcd7cf;
    font-family: 'Roboto Condensed', sans-serif;
   }

  h3 {
    margin-bottom: 5px;
  }

  ul {
    margin-top: 5px;
  }

</style>
