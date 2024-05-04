import axios from 'axios';
import {useRouter} from 'vue-router'

// DOC: http://www.axios-js.com/zh-cn/docs/

const instance = axios.create({
  // baseURL: 'http://sblt.bubianli.com',
  timeout: 60000,
  // headers: {'X-Custom-Header': 'foobar'}
});


const processError = (origin: any): boolean =>{
 
  const rsp = origin.response ? origin.response : origin
  if (typeof rsp.data  == 'string') {
    console.error({
      message: `${rsp.status} ${rsp.statusText}`,
      description: rsp.data
    })
    return true
  }
  if (rsp && rsp.data && rsp.data.error) {
    const _d = rsp.data
    console.error({
      message: _d.error.code,
      description: _d.error.message
    })
    return true
  } else if (rsp.message) {
    console.error({
      message: "Unexpect Error",
      description: rsp.message
    })
    return true
  } 
  return false
}
export default {
  get: async (path:string, query: any = {}) => {
    return new Promise((resolve, reject) => {
      const router = useRouter()
      instance.get(
        path, {
            params: query
        }
      ).then(rsp => {
        if (rsp.status == 401) {
          router.push({
              path: "/"
          })
          return
        }
        processError(rsp)
        resolve(rsp.data)
      }).catch(err => {
        processError(err)
        reject(err)
      })
          
    })
  },
  originPost: (path:string, body:any) => {
    return new Promise((resolve, reject) => {
      instance.post(
        path, body
      ).then(rsp => {
        resolve(rsp)
      }).catch(err => {
        reject(err)
      })
          
    })
  },

  post: (path: string, body: any = {}, successTip = "") => {
    return new Promise((resolve, reject) => {
      instance.post(
        path, body
      ).then(rsp => {
        if (!processError(rsp) && successTip != "") {
            console.log({
            message: successTip,
          })
        }
        resolve(rsp.data)
      }).catch(err => {
        processError(err)
        reject(err)
      })
          
    })
  },
  put: (path: string, body: any = {},  successTip = "") => {
    return new Promise((resolve, reject) => {
      const router = useRouter()
      instance.put(
        path, body
      ).then(rsp => {
        if (!processError(rsp) && successTip != "") {
            console.log({
            message: successTip,
          })
        }
        resolve(rsp.data)
      }).catch(err => {
        processError(err)
        reject(err)
      })
          
    })
  },
  delete: async (path:string, query: any = {},  successTip = "") => {
    return new Promise((resolve, reject) => {
      const router = useRouter()
      instance.delete(
        path, {
            params: query
        }
      ).then(rsp => {
        if (!processError(rsp) && successTip != "") {
            console.log({
            message: successTip,
          })
        }
        resolve(rsp.data)
      }).catch(err => {
        processError(err)
        reject(err)
      })
          
    })
  },
  upload: (path: string, file: File, successTip = "上传成功") => {
    const forms = new FormData()
    const configs = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    forms.append('file', file)

    return new Promise((resolve, reject) => {
      const router = useRouter()
      instance.post(
        path, 
        forms,
        configs
      ).then(rsp => {
        if (!processError(rsp)) {
            console.log({
            message: successTip,
          })
        }
        resolve(rsp.data)
      }).catch(err => {
        processError(err)
        reject(err)
      })    
    })
  }
}