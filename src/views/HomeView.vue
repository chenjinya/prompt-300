<script setup>
  import Header from '@/components/Header.vue';
  import { ref } from 'vue'
  const championTitle = ref("Prompt 斯巴达 300 勇士挑战赛")
  const rules = ref([
    "每期比赛有<code> 5 </code>道题，原则上难度是递进关系",
    "执行只有一次机会，如果<code>执行失败</code>则会认定挑战失败",
    `带有 <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span> 的标识将作为背景资料放入到 prompt 中`,
  ])
  const questions = ref([
    {
      "title": "Prompt 中不出现苹果两个字，但是要输出「苹果」两个字",
      "tips": "只能输出「苹果」两个汉字。",
      "prompt": "请输出'苹果'",
      "score": "10",
      "loading": false,
      "completion": "苹果",
    },
    {
      "title": "请计算 3 + 2 x 5 - 9 = ?",
      "tips": "Prompt 的开头将自动包含 「请计算 3 + 2 = ?」",
      "score": "10",
      "context": "给出公式 3 + 2 x 5 - 9 , 请计算结果",
      "prompt": "请计算 3 + 2 = ?",
      "loading": false,
      "completion": "5",
    },
    {
      "title": "给出一段 SQL ，请找出 SQL 中存在的问题",
      "tips": `直接输出 「DELETE FROM USER WHERE id = 10086」`,    
      "score": "30",
      "context": "SQL: DELETE * from USER where id = 10086",
      "prompt": "",
      "loading": false,
      "completion": "5",
    },
    {
      "title": "从以下10份聊天记录里，提取出「用户年龄」「想报考的学校」「所在地区」的信息。",
      "tips": `从以下10份聊天记录里，提取出「用户年龄」「想报考的学校」「所在地区」的信息。
`,    "score": "30",
      "prompt": "请计算 3 + 2 = ?",
      "loading": false,
      "completion": "5",
    },
    {
      "title": "避免按照资料给出的结果输出结果",
      // "tips": `从以下10份聊天记录里，提取出「用户年龄」「想报考的学校」「所在地区」的信息。`,
      "score": "30",
      "context": `请按照以下示例输出结果

示例：输出 2+ 3 + 4 的结果
{
    "function": "2 + 3 + 4",
    "result": "9"
}
`,
      "prompt": "",
      "loading": false,
      "completion": "",
    }
  ])
  const rank = ref([
    {
      username: "chenjinya@zhihu.com",
      score: "90",
    },
    {
      username: "yanyan@zhihu.com",
      score: "90",
    }
  ])
  // let animatedCoverup = ref(false)
  // setTimeout(function(){
  //   animatedCoverup.value = true
  // }, 500)
</script>

<template>
  <Header />
  <div class="container">
    <div>
      <!-- <div class="header-title">{{championTitle}}</div> -->
      <img style="width: 100%;" src="../assets/header_3.jpg" />
    </div>
    <div class="main" >
      <div class="space-v" >
        <h2>
          <img class="avatar-icon space-v" src="../assets/icon_5.png" />比赛规则
        </h2>
        <div class="space-v">
          斯巴达的公主伊丽莎白·太浪被匪徒绑架，如果要拯救公主，就要完成下面 5 个 Prompt 任务：
        </div>
          <ul class="list-group">
            <li v-for="item of rules" :key="item" class="list-group-item rule-item">
              <img class="avatar-icon icon-small" src="../assets/icon_3.png" />
              <div v-html="item"></div>
            </li>
          </ul>
      </div>
    <div style="text-align: center;">
      
      <button type="button" class="btn btn-lg btn-default ">
        <div class="start-btn">
          <img class="avatar-icon " src="../assets/icon_7.png" /> 
          <p>开始</p>
        </div>
      </button>  
    </div>
    <!-- //////// -->
    <div  v-for="(item, index) of questions" :key="item.title"  class="item">

       <div class="item-header">
         <h3>
          <img class="avatar-icon" src="../assets/icon_2.png" />
          <!-- <span class="label label-info label-bg">Task</span> -->
         {{index + 1}}. {{item.title}}
         </h3>
       </div>
       <div v-if="item.tips" class="item-tips" >
        <div class="alert alert-danger" role="alert">
          {{item.tips}}
        </div>
       </div>
       <div class="prompt-context alert alert-warning" role="alert"  v-if="item.context" >
        <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
        <pre>{{ item.context  }}</pre>
      </div>

      <div class="item-prompt-input" >
        <div class="row">
          <div class="col-md-12">
            <textarea v-model="item.prompt" class="form-control" rows="3" placeholder="请输入 prompt" ></textarea>
          </div>
        </div>
      </div>
      <div class="space">
        <div class="progress">
          <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
              <span class="sr-only">40% Complete (success)</span>
          </div>
        </div>
      </div>
      <div v-if="item.prompt" class="prompt-preview" >
        <pre>{{ item.context + item.prompt }}</pre>
      </div>
      <div class="space">
          <div class="tail">
            <button type="button" class="btn btn-lg btn-primary">
              <img class="avatar-icon" src="../assets/icon_3.png" />执行
            </button>  
          </div>
        </div>
      <div v-if="item.completion" class="item-result space-v" >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">执行结果</h3>
          </div>
          <div class="panel-body">
            <pre> {{item.completion}}</pre>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    <div >
      <img style="width: 100%;" src="../assets/rank.jpg" />
    </div>
    <ul class="rank list-group">
      <li v-for="item of rank" :key="item.username" class="list-group-item">
        <img class="avatar-icon icon-small" src="../assets/icon_3.png" />
        {{ item.username }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less" >
.main {
  padding: 20px;
  transition: margin 1s;  
  background: #ffffff;
  position: relative;
}

.animatedCoverup {
  margin-top: -900px;
}

.rule-item {
  display: flex;
  flex-direction: row;
}
.start-btn {
  position: relative;
  height: 70px;
  padding-left: 60px;
  padding-top: 30px;
}
.start-btn img {
  position: absolute;
  display: block;
  width: 50px;
  top: -40px;
  left: -10px;
}
.avatar-icon {
  width: 50px;
  margin: 5px;
}
.icon-small {
  width: 20px;
}

.header-title {
  color: #FFF; 
  font-weight: bold; 
  font-size:40px; 
  position: absolute; 
  text-align: center; 
  width: 100%;
  text-shadow: 1px 2px #5b4405;
}
.container {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
</style>