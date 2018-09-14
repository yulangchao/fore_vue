<template>

  <div id="app">
      <mt-popup v-model="popupVisible2" position="top" class="mint-popup-2" style="background-color: rgba(0,0,0,.7) !important;" :modal="false">
        <p>{{msg}}</p>
      </mt-popup>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
        </router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件 -->
        </router-view>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      popupVisible2: false,
      msg: ""
    };
  },
  watch: {
    popupVisible2(val) {
      if (val) {
        setTimeout(() => {
          this.popupVisible2 = false;
        }, 5000);
      }
    }
  },
  created() {
    // if (!window.mylocation){
    //   axios.get("https://ipinfo.io").then(response => {

    //     window.mylocation = (response.data);
    //   });
    // }
    // let that = this;
    // var socket = io("http://" + "foreclean.tk" + ":2120");
    // // uid 可以为网站用户的uid，作为例子这里用session_id代替
    // var uid = JSON.parse(localStorage.getItem("user"))["firebase_token"];
    // // 当socket连接后发送登录请求
    // socket.on("connect", function() {
    //   console.log(socket);
    //   socket.emit("login", uid);
    // });
    // // 当服务端推送来消息时触发，这里简单的aler出来，用户可做成自己的展示效果
    // socket.on("new_msg", function(msg) {
    //   that.popupVisible2 = true;
    //   that.msg = msg;
    // });
  },
  mounted() {
    mui("body").on("tap", ".mui-tab-item,.mui-control-item", function() {
      document.location.href = this.href;
    });
    document.body.removeChild(document.getElementById("Loading"));
  }
};
</script>

<style lang="scss">
html{
  touch-action: manipulation;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 44px;
}

p,
a,
label,
h1 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.mui-icon-list {
  top: 5px !important;
}
.mui-bar-nav {
  background-color: #eb482fe1 !important;
}
.mui-title {
  color: white !important;
  font-weight: bold !important;
}
.mui-control-item {
  font-weight: bold !important;
}


.mui-toast-container {
  top: 1% !important;
  bottom: auto !important;
}

.mui-table-view-cell:after {
  left: 0px !important;
}

.order_status {
  border: none !important;
}
image[lazy="loading"] {
  width: 79px;
  height: 79px;
  margin: auto;
}
.weui-cells__title {
  font-weight: bold;
}

/* 暂时 */
.mui-table-view {
  background: transparent !important;
}
.mui-table-view:after,
.mui-table-view:before,
.mui-table-view-cell:after {
  display: none !important;
}
.mui-table-view-cell {
  background: white !important;
  margin-top: 6px !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
  /* box-shadow: rosybrown; */
}

.mui-modal,
body,
html,
nav,
header,
.mint-popup {
  max-width: 768px;
  margin: auto;
}
.mui-bar-nav ~ .mui-content {
  padding-top: 2px !important;
}
.mint-popup-3{
  left:0 !important;
}

html {
  background: url(./assets/2zrdI1g.jpg);
  background-size: 100vw 100vh;
}
body {
  background: #efeff4e3;
  height: -webkit-calc(100vh - 44px);
  height: -moz-calc(100vh - 44px);
  height: calc(100vh - 44px);
}
.mui-content{
  min-height: 100vh;
}
h5,
.font-bold {
  font-weight: bold;
}

.mui-icon-star-filled {
  font-size: 14px !important;
}
.mint-popup-2 {
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  backface-visibility: hidden;
}
.mint-popup-2 p {
  line-height: 50px;
  color: #fff;
}

.vdatetime .time-select {
  margin-bottom: 0px;
  border-width: 0px !important;
  padding: 0px;
  height: 23px !important;
}

.pull-right{
  float:right;
}

.pull-left{
    text-align: left;
}

.tab-nav {
    /* padding-top: 10px; */
    height: 40px;
    /* line-height: 40px; */
    /* border-radius: 80px; */
    display: block;
    position: relative;
    /* margin-bottom: 15px; */
    /* position: fixed; */
    background: #fff;
    z-index: 1;
    width: 90%;
    /* border-bottom: 10px solid #ededed; */
    margin: 0 auto;
    border-radius: 5px;
    padding-top: 8px;
    margin-top:-20px;
}
.tab-nav-item {
    height: 32px;
    /* line-height: 45px; */
    position: relative;
    text-align: center;
    color: #585858;
    font-size: 0.9rem;
    display: block;
    float: left;
    border-radius: 80px;
    /* padding: 0 15px; */
    width: 25%;
    /* padding-top: 10px; */
}
.tab-nav-item.tab-active a {
    color: #000000;
    font-weight: bold;
}

.tab-nav-item a span {
    display: block;
}
.tab-nav-item a {
    display: inherit;
    color: inherit;
    font-size: 0.85rem;
    color: #7d7d7d;
}
.tab-nav-item.tab-active:before {
    content: '';
    width: 50%;
    height: 1px;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -25%;
    z-index: 4;
    background-color: #f0250f;
    border: 1px solid #f0250f;
}
</style>
