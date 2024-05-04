import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const user = reactive({
    domain: "",
    email: '',
    token: '',
    user_id: '',
    username: 'username',
  })
  function set(param) {
    for (let k in param) {
      user[k] = param[k]
    }
  }

  return { user,  set }
})

export default userStore