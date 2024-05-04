<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { computed, reactive, ref } from 'vue'
import request from '@/utils/request'
import useUserStore from '../stores/user'
let state = reactive({
  btn: {
    sendVcodeText: "发送验证码",
    login: '登录',
  },
  form: {
    loading: false,
    emailSent: false,
    email: '',
    vcode: '',
    tip: ''
  }
})
const userStore = useUserStore()

function onSendEmail(){
  userStore.set({
    "username": "jinyachen"
  })
  return
  console.log(state, state.value, state.form)

  state.form.loading = true
  state.btn.sendVcodeText = '验证码发送中...'
  request.post('/api/login', {
    email: state.form.email,
    source: "prompt_hero"
  }).then((ret) => {
    state.form.loading = false
    if (ret.success) {
      state.form.tip = "验证码已发送到邮箱，请查收"
    }
    state.form.emailSent = true
  }).catch((err) => {
    console.error(err)
    state.btn.sendVcodeText = err
    state.form.loading = false
  })
  
}

function onLogin(){
  console.log(state, state.value, state.form)

  state.form.loading = true
  state.btn.login = '登录中...'
  request.post('/api/verify', {
    email: state.form.email,
    vcode: state.form.vcode,
  }).then((ret) => {
    state.form.loading = false
    if (ret.data) {
      state.form.tip = "已登录"
      userStore.set(ret.data)
    }
  }).catch((err) => {
    console.error(err)
    state.btn.sendVcodeText = err
    state.form.loading = false
  })
  
}

</script>
<style scoped>
.theme-btn {
  background-color: #d0a815;
  border-color: #b7870c;
  color: #FFF;
}
</style>
<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="theme-btn btn btn-lg" data-toggle="modal" data-target="#myModal">
      Login
    </button>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">邮箱登录</h4>
          </div>
          <div class="modal-body">
            <div  class="alert alert-success" role="alert" v-if="state.tip" >{{ state.tip }}</div>
            <div class="form-group">
              <label for="exampleInputEmail1">邮箱 Email address</label>
              <input v-model="state.form.email" :disabled="state.form.emailSent" type="email" class="form-control"  placeholder="Email">
            </div>
            <div v-if="state.form.emailSent" class="form-group">
              <label for="exampleInputPassword1">验证码 Verify code</label>
              <input  v-model="state.form.vcode"  class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button  :disabled="state.form.loading" v-if="!state.form.emailSent" @click="onSendEmail" class="btn theme-btn">{{ state.btn.sendVcodeText }}</button>
            <button  :disabled="state.form.loading" v-else @click="onLogin" class="btn theme-btn">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
