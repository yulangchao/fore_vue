<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			
			<h1  style="color:white" class="mui-title">Select at Most 3 Cleaners</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/service" class="mui-tab-item mui-active">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">Services</span>
			</router-link>
			<router-link to="/order" class="mui-tab-item">
				<span class="mui-icon mui-icon-list"></span>
				<span class="mui-tab-label">Orders</span>
			</router-link>
			<router-link to="/cleaner" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">Cleaners</span>
			</router-link>
			<router-link to="/setting" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">Settings</span>
			</router-link>
		</nav>
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
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h4 class="mui-ellipsis">{{order.address}}</h4>
		                    <h5 style="font-weight:bold">Time: {{order.time.replace("T", " ").split(".")[0]}} + <span style="color:red"> {{order.hours}} Hours</span></h5>
		                    <p class="mui-h6 mui-ellipsis">
                          <button type="button" class="mui-btn mui-btn-primary">Bedroom <span class="mui-badge mui-badge-primary">{{order.bedroom}}</span></button>
                          &nbsp;<button type="button" class="mui-btn mui-btn-success">Bathroom <span class="mui-badge mui-badge-success">{{order.bathroom}}</span></button>
                          &nbsp;<button type="button" class="mui-btn mui-btn-warning">Additional <span class="mui-badge mui-badge-warning">{{order.additional.length}}</span></button>
                        </p>
		                </div>
		                <!-- <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                </div> -->
		            </div>
		        </li>
		    </ul>
		
			</div>
      <h5 class="mui-text-left">*Select at Most 3 Cleaners ({{this.cleaners.length}}/3)</h5>
			<ul class="mui-table-view">
        <template v-for="da in data">

          <div class="mui-table-view-cell mui-input-row mui-checkbox mui-media mui-left">
              <input style="top: 18px;" :id="'check' +da.id" v-model="cleaners" :value="da.id" type="checkbox" @change="selected($event,da.id);" :disabled="cleaners.indexOf(da.id)<0 && cleaners.length >=2">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%" src="http://via.placeholder.com/150x150">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="view(da)">View</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">{{da.name}}&nbsp;&nbsp;&nbsp;{{da.phone}}&nbsp;</h4>
                <p class='mui-ellipsis' style="text-align:left">City: {{da.sex == 1? "Male": "Female"}}&nbsp; ***</p>
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
  name: "selectCleaner",
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true,
      order: null,
      cleaners: [],
      cleaner: null,
      modalClass: "mui-modal"
    };
  },
  created() {
    if (!this.$route.params.order) {
      mui.toast("Please resubmit your order!");
      this.$router.push("/service");
    }
    this.order = this.$route.params.order;
  },
  mounted(){

  },
  methods: {
    view: function(da){
        this.cleaner = da;
        document.getElementById("check"+da.id).click()
        this.modalClass = "mui-modal mui-active";
        
    },
    closeModal: function(da){
        this.modalClass = "mui-modal";
        
    },
    selected: function(e, id) {
      if (e.target.checked && this.cleaners.indexOf(id) < 0) {
        this.cleaners.push(id);
      }
      if (!e.target.checked && this.cleaners.indexOf(id) > -1) {
        this.cleaners.splice(this.cleaners.indexOf(id),1);
        
      }
    },
    redirect: function() {
      this.$router.replace("hello");
    },
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getCleanerListByOrder",
            JSON.stringify({
              bedroom: this.order.bedroom,
              bathroom: this.order.bathroom,
              additional: this.order.additional
            })
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
  width: 50%;
  text-align-last: center;
  padding: 15px 50px;
}

.mui-table-view-condensed button {
  padding: 6px;
}

.view-btn{
  width: auto;
}
</style>
