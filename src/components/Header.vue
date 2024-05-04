<script setup>
import { computed } from 'vue'

import Login from './Login.vue';
import useUserStore from '../stores/user'
import request from '@/utils/request'

const userStore = useUserStore()
function initalLogin(){
  request.get('/api/users/auth', {}).then((ret) => {
    ret.data && userStore.set(ret.data)
  }).catch((err) => {
    console.error(err)
  })
}
initalLogin()
const islogin = computed(() => {
  return userStore.user.user_id > 0
})
console.log(userStore)
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header">
    <div class="slogan" >
      PROMPT HERO 提示词英雄挑战赛🎉
    </div>
    <div class="tools">
      <Login  v-if="!islogin"/>
      <div v-else class="username">挑战者: {{ userStore.user.username }}</div>
    </div>
  </div>
</template>

<style scoped>
.header {
  /* height: 30px; */
  line-height:  30px;
  
  display: flex;
  flex-direction: row;
  padding: 20px;
}
.slogan {
  color: #FFF;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 1px 2px #000;
  flex: 1;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.username {
  line-height:  40px;;
  font-size: 20px;
  color: #FFF;
  padding: 0 10px;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
