<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			
			<h1  style="color:white" class="mui-title">Serving Order</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/service" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">Services</span>
			</router-link>
			<router-link to="/order" class="mui-tab-item">
				<span class="mui-icon mui-icon-list"></span>
				<span class="mui-tab-label">Orders</span>
			</router-link>
			<router-link to="/cleaner" class="mui-tab-item mui-active">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">Cleaners</span>
			</router-link>
			<router-link to="/setting" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">Settings</span>
			</router-link>
		</nav>
    <!-- modal -->
    <div id="modal" :class="modalClass" v-if="cleaner != null">
				<header class="mui-bar mui-bar-nav">
					<a class="mui-icon mui-icon-close mui-pull-right" @click="closeModal"></a>
					<h1 class="mui-title">{{cleaner.name}}</h1>
				</header>
				<div class="mui-content" style="height: 100%;">
					<p class="mui-content-padded">The contents of my modal go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
				</div>
		</div>
		<div class="mui-content">
      <div>
				<div class="">
        <select style="float:left;" class="mui-btn mui-btn-block">
					<option value="item-1">item-1</option>
					<option value="item-2">item-2</option>
					<option value="item-3">item-3</option>
					<option value="item-4">item-4</option>
					<option value="item-5">item-5</option>
				</select>
        <select style="" class="mui-btn mui-btn-block">
					<option value="item-1">item-1</option>
					<option value="item-2">item-2</option>
					<option value="item-3">item-3</option>
					<option value="item-4">item-4</option>
					<option value="item-5">item-5</option>
				</select>
				</div>
			</div>
			<ul class="mui-table-view">
        <template v-for="da in data">
          <div class="mui-table-view-cell mui-input-row mui-media mui-left">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%" :src="'http://foreclean.tk:8000/storage/' + da.avatar">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="view(da)">View</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">{{da.name}}&nbsp;&nbsp;&nbsp;{{da.phone}}&nbsp;</h4>
                <p class='mui-ellipsis' style="text-align:left">City: {{da.city}}&nbsp; Rate: {{da.rate}}</p>
              </div>
           
          </div>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">No More Data</p>
        </div>
			</ul>
		</div>

	</body>
</template>

<script>
import axios from "axios";
var count = 0;
export default {
  name: "cleaner",
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true,
      cleaner: null,
      modalClass: "mui-modal"
    };
  },
  mounted() {
  },
  methods: {
    view: function(da) {
      this.cleaner = da;
      this.modalClass = "mui-modal mui-active";
    },
    closeModal: function(da) {
      this.modalClass = "mui-modal";
    },
    redirect: function() {
      // this.$router.replace("hello");
    },
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getCleanerList",
            JSON.stringify({"bedroom":"1","bathroom":"2","additional":"1"})
          )
          .then(response => {
            console.log(response);
            if (response.data.success == true) {
              this.page++;
              this.data = this.data.concat(response.data.cleaners);
              if (response.data.cleaners.length < 10) {
                this.busy = true;
                this.loading = false;
              } else {
                this.busy = false;
              }
            } else {
              mui.toast("数据获取失败");
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }, 0);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mui-content {
  padding-top: 0px;
}

.mui-btn-block {
    display: inline;
    padding: 15px auto;
    width:50%; 
    text-align-last: center; 
    padding: 15px 50px;
    margin-bottom: 0px;
}

.view-btn {
  width: auto;
}
</style>
