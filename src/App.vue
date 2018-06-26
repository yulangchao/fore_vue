<template>
  <div id="app">
   
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
export default {
  name: 'app',
  mounted(){
    mui('body').on('tap','.mui-tab-item,.mui-control-item',function(){document.location.href=this.href;});
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 44px;
}

p,a,label,h1{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.mui-icon-list{
  top: 5px !important;
}
.mui-bar-nav{
  background-color: #EB482F !important;
}
.mui-title{
  color:white !important;
  font-weight: bold;
}
.mui-control-item{
  font-weight: bold;
}
.mui-bar-nav ~ .mui-content {
    padding-top: 0px !important;
}

.mui-toast-container{
    top: 1% !important
}


.mui-table-view-cell:after{
  left:0px !important;
}

.order_status{
  border:none !important
}
image[lazy=loading] {
  width: 79px;
  height: 79px;
  margin: auto;
}
.weui-cells__title{
  font-weight: bold;
}



/* 暂时 */
.mui-table-view{
  background: transparent !important;
}
.mui-table-view:after, .mui-table-view:before{
  display: none !important;
}
.mui-table-view-cell {
    border-radius: 12px;
    background: white;
    margin: 5px;
    box-shadow: 0 1px 2px rgba(12, 12, 12, 0.3);
    /* box-shadow: rosybrown; */
}
</style>
