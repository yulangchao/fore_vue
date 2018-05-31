<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    mui('body').on('tap','.mui-tab-item,.mui-control-item',function(){document.location.href=this.href;});
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 44px;
}
.mui-icon-list{
  top: 5px !important;
}
.mui-bar-nav{
  background: #EB482F;
}
.mui-title{
  color:white
}
.mui-bar-nav ~ .mui-content {
    padding-top: 0px;
}

.mui-toast-container{
    top: 1% !important
}
</style>
