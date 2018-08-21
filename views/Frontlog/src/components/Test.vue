<template>
  <div class="test">
    <h1>Hello </h1>
    <button type="button" class="btn btn-primary">Primary</button>
    <p>{{ msg.foo }}</p>
    <span v-bind:title="message">
      Rê chuột lên đây một vài giây để xem thuộc tính `title` được bind!
    </span><br>
    <span v-if="seen">
      Thoắt ẩn thoắt hiện
    </span><br>
    <ol>
      <li v-for="todo in todos" :key="todo.text">
        {{ todo.text }}
      </li>
    </ol>
    <div class="week5">
      <p>{{ message }}</p>
      <button v-on:click="reverseMessage">Reverse Message</button>
    </div>
    <div class="week6">
      <p>{{ message }}</p>
      <input v-model="todo">
    </div>
    <div class="todotest">
      <button v-on:click="addWord()">Click</button>
    </div>
    <div class="7">
      <p>Những thứ họ mua:</p>
      <ol>
        <todo-item
        v-for="item in groceryList"
        v-bind:todo="item"
        v-bind:key="item.id">
        </todo-item>
      </ol>
    </div>
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">DAKA HAAHA</div>
    <select v-model="fontSize">
      <option disabled value="">Please select one</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
    </select>
    <div id="example-1">
      <button v-on:click="counter += 1">Đếm cừu</button>
      <p>{{ counter }} con cừu.</p>
    </div>
    <div id="example-3">
      <button v-on:click.stop="say('Konica')">Hãy nói Konica</button>
      <button v-on:click="say('Viettel')">Hãy nói theo cách của bạn</button>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
var obj = {
  foo: 'daka'
}
let todos = [
  { text: 'Học JavaScript' },
  { text: 'Học Vue' },
  { text: 'Xây dựng cái gì đó hay ho' }
]
export default {
  name: 'test',
  components: {TodoItem},
  methods: {
    reverseMessage: function () {
      this.$set()
      this.message = this.message.split(' ').reverse().join(' ')
    },
    say: function (message) {
      alert(message)
    },
    addWord: function () {
      console.log(this.todo)
      this.todos.push({
        text: this.todo
      })
      console.log(todos)
    }
  },
  data () {
    return {
      msg: obj,
      message: 'Bạn đã mở trang này vào ' + new Date().toLocaleString(),
      seen: true,
      todos: todos,
      todo: '',
      activeColor: 'red',
      fontSize: 30,
      counter: 0,
      groceryList: [
        { id: 0, text: 'Cà pháo' },
        { id: 1, text: 'Mắm tôm' },
        { id: 2, text: 'Miễn ăn được là được' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
