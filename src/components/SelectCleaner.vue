<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			<router-link :to="{ name: 'ServiceForm', params: { order_type: order.order_type, order: order}}" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1  style="color:white" class="mui-title">Select at Most 3 Cleaners</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
        <a class="weui-btn weui-btn_primary"  type="submit" id="showTooltips" @click="createOrder">Create Order</a>
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
                          &nbsp;<button type="button" class="mui-btn mui-btn-warning">Others <span class="mui-badge mui-badge-warning">{{order.additional.length}}</span></button>
                        </p>
		                </div>
		                <!-- <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                </div> -->
		            </div>
		        </li>
		    </ul>
		
			</div>
      <h5 class="mui-text-left">*Select Our Premium Cleaners</h5>
			<ul class="mui-table-view">
        <template>
          <div class="mui-table-view-cell mui-input-row mui-media mui-left">
              <img class="mui-media-object mui-pull-left" style="border-radius: 2px" src="http://foreclean.tk:8000/storage/files/May2018/9OFHyqBtWwZqbebh4e9V.png">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="dialog" >Select</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">Fore&nbsp;
                  <template v-for="i in 5">
                      <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                  </template>
                </h4>
                <p class='mui-ellipsis distance'>15km</p>
                <p class='mui-ellipsis'><span  style="float:left">Richmond</span>&nbsp; <span style="color:red;margin-right:60px;float:right">Price: 30/hr</span></p>
              </div>
           
          </div>
        </template>
			</ul>
      <h5 class="mui-text-left">*Select at Most 3 Cleaners ({{this.cleaners.length}}/3)</h5>
			<ul class="mui-table-view" style="margin-bottom: 50px;">
        <template v-for="da in data">

          <div class="mui-table-view-cell mui-input-row mui-checkbox mui-media mui-left">
              <input style="left: 0px; width: 48px;height: 72px;padding: 20px 10px;top: 0px;" :id="'check' +da.id" v-model="cleaners" :value="da.id" type="checkbox" @change="selected($event,da.id);" :disabled="cleaners.indexOf(da.id)<0 && cleaners.length >=3">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%" :src="url() + da.avatar">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="view(da)">View</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">{{da.name}}&nbsp;
                  <template v-for="i in da.rate">
                      <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                  </template>
                </h4>
                <p class='mui-ellipsis distance'>15km</p>
                <p class='mui-ellipsis'><span  style="float:left">{{getCityName(da.city)}}</span>&nbsp; <span style="color:red;margin-right:50px;float:right">Price: 15/hr</span></p>
              </div>
           
          </div>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">No More Cleaners</p>
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
  mounted() {
    //重置后退键
    let backButton = e => {
      e.preventDefault();
      if (this.order) {
        this.$router.push({
          name: "ServiceForm",
          params: { order_type: this.order.order_type, order: this.order }
        });

        window.removeEventListener("popstate", backButton);
      }
    };
    window.addEventListener("popstate", backButton);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", () => {
      console.log("deleted");
    });
  },
  methods: {
    dialog: function() {
				var btnArray = ['No', 'Confirm'];
				mui.confirm('You selected the ', 'Hello MUI', btnArray, (e) => {
					if (e.index == 1) {
						mui.toast("done");
					} else {
						mui.toast("not done");
					}
				})
    },
    createOrder: function(){
      let start_time = this.order.time.split("T")[1];
      let hr = new Date(this.order.time.replace("T", " ")).getHours();
      let min = new Date(this.order.time.replace("T", " ")).getMinutes();
      let total_min = hr * 60 + min*1 + this.order.hours * 60;
      console.log(total_min);
      let end_time = this.getTimeFromMinutes(total_min);
      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getCleanerListByOrder",
            JSON.stringify({
              name: this.order.name,
              phone: this.order.phone,
              address: this.order.address,
              bedroom: this.order.bedroom,
              bathroom: this.order.bathroom,
              additional: this.order.additional,
              hours: this.order.hours,
              time: this.order.time.replace("T", " "),
              start_time: start_time,
              end_time: end_time,
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
    },
    view: function(da) {
      this.cleaner = da;
      document.getElementById("check" + da.id).click();
      this.modalClass = "mui-modal mui-active";
    },
    closeModal: function(da) {
      this.modalClass = "mui-modal";
    },
    selected: function(e, id) {
      if (e.target.checked && this.cleaners.indexOf(id) < 0) {
        this.cleaners.push(id);
      }
      if (!e.target.checked && this.cleaners.indexOf(id) > -1) {
        this.cleaners.splice(this.cleaners.indexOf(id), 1);
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
              hours: this.order.hours,
              time: this.order.time.replace("T", " "),
              day: new Date(this.order.time.replace("T", " ")).getDay(),
              hr: new Date(this.order.time.replace("T", " ")).getHours(),
              min: new Date(this.order.time.replace("T", " ")).getMinutes(),
              offset: this.page * 10
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
.mui-table-view-cell.mui-checkbox.mui-left {
    padding-left: 48px;
}
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
.mui-icon-star-filled {
  font-size: 12px !important;
}
.mui-table-view-condensed button {
  padding: 6px;
}

.view-btn {
  width: auto;
  top: 50px;
  padding: 6px;
}

.weui-btn {
  border-radius: 0px;
}
.mui-bar-tab {
  height: 46px;
}

.distance {
  position: absolute;
  top: 10px;
  right: 15px;
}

.mui-table-view-cell:after {
    left: 0px;
}
</style>
