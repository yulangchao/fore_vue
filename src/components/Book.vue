<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			
			<h1  style="color:white" class="mui-title">Order</h1>
		</header>
    <div v-if="change_time" class="mui-popup mui-popup-in" style="display: block;width: 100vw;
    padding: 150px 50px;">
      <div class="mui-popup-inner">
        <div class="mui-popup-title">Change Time</div>
        <div class="mui-popup-text">Only One Time For Changing Time：</div>
        <div class="mui-popup-input">					
									<datetime
                  type="datetime"
                  v-model="time"
                  input-class="time-select-confirm"
                  :format="{ year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :minute-step="30"
                  :week-start="7"
                  value-zone="America/Los_Angeles"
                  format="yyyy-MM-dd HH:mm"
                  ></datetime>
        </div>
      </div>
      <div class="mui-popup-buttons"><span class="mui-popup-button" @click="closePop">Cancel</span>
      <span class="mui-popup-button mui-popup-button-bold" @click="confirmChange">Confirm</span></div>
    </div>
    <div v-if="change_time" class="mui-popup-backdrop mui-active" style="display: block;"></div>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/service" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">Services</span>
			</router-link>
			<router-link to="/order" class="mui-tab-item mui-active">
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
		<div class="mui-content order-page">
          <mt-swipe :auto="4000" style="height:160px">
            <mt-swipe-item><img  style="width:100%;height:100%" src="http://www.17sucai.com/preview/1268063/2018-08-30/allList/images/banner-002.png"></mt-swipe-item>
          <mt-swipe-item><img  style="width:100%;height:100%" src="http://www.17sucai.com/preview/1268063/2018-08-30/allList/images/banner-004.png"></mt-swipe-item>
          </mt-swipe>
          <ul class="tab-nav">    
            <li class="tab-nav-item">
                <router-link to="/order">
                    <span>Unpaid</span>
                </router-link>
            </li>
            <li class="tab-nav-item tab-active">
                <router-link to="/order/book">
                    <span>Booked</span>
                </router-link>
            </li>
            <li class="tab-nav-item">
                <router-link to="/order/inservice" href="javascript:;">
                    <span>Serving</span>
                </router-link>
            </li>
            <li class="tab-nav-item">
                <router-link to="/order/finish" href="javascript:;">
                    <span>Finished</span>
                </router-link>
            </li>
        </ul>
		<ul class="mui-table-view">
        <template v-for="da in data">
          <li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
              <button class="mui-btn mui-btn-primary" v-if="da.order_status==3 && da.if_changed == 0" @click="changeTime(da)" style="padding: 3px 10px;top: 95px;right: 80px;">
                Change Time
              </button>
              <button class="mui-btn mui-btn-danger" style="padding: 3px 10px;top: 95px;right: 10px;" @click="cancelOrder(da)">
                Cancel
              </button>
              <h5 class="mui-pull-right">${{da.price+da.agent_fee}}</h5>
              <router-link :to="{ name: 'OrderDetail', params: { order: da}}" class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left;margin:0px;padding:5px 0px;">{{getOrderType(da.order_type)}}&nbsp;&nbsp;
                  <button class="order_status" :style="da.order_status== 3 ?'background:#64d573':'background:#ea5a12'">{{da.order_status== 3 ?"Booked":"Changed"}}</button>
                   <button v-if="da.cleaner_id== 6" class="order_status" style="background:gold">VIP</button>
                  <!-- <button v-if="da.order_status== 3" class="order_status" style="background:#64d573">Arranged</button> -->
                </h4>
                <p class='mui-ellipsis' style="text-align:left"> <span style="color:red">Scheduled Time: {{da.time}}</span></p>
                <p class='mui-ellipsis address'>{{da.address.substring(0,60)}}&nbsp;</p>
              </router-link>
            </a>
          </li>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">End Of Order</p>
        </div>
			</ul>
		</div>

	</body>
</template>

<script>
import axios from "axios";
var count = 0;
export default {
  name: "book",
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true,
      change_time: false,
      time: "",
      changed_order: null
    };
  },
  mounted() {},
  methods: {
    cancelOrder: function(da) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      let btnArray = ["No", "Yes"];
      mui.prompt("Are you sure to get refund (If canceled within 24 hours, refund half)？", "Cancel Reason", "Cancel Order", btnArray, e => {
        if (e.index == 1) {
          axios
            .post(
              "http://foreclean.tk:8000/api/cancelOrder",
              JSON.stringify({
                order_id: da.id,
                cancel_reason: e.value
              }),
              config
            )
            .then(response => {
              
              if (response.data.success == true) {
                mui.toast("Canceled the Order Successfully. Wait for Refund.");
                this.$router.push('/order/finish');
              } else {
                mui.toast("Canceled Failed! Please Try Again or Later!");
              }
            })
            .catch(error => {
              mui.toast("Canceled Failed! Please Try Again or Later!");
              
            });
          
        }
      });
    },
    closePop: function() {
      this.change_time = false;
      this.changed_order = null;
    },
    confirmChange: function() {
      console.log(new Date(this.time).getTime());
      if (
        new Date(this.time).getTime() <
        new Date().getTime() + 24 * 60 * 60 * 1000
      ) {
        mui.toast("Please change the date at least one day after today!");
        return;
      }
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios
        .post(
          "http://foreclean.tk:8000/api/changeOrderTime",
          JSON.stringify({
            order_id: this.changed_order.id,
            time: this.time.substring(0, 16).replace("T", " ")
          }),
          config
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.change_time = false;
            this.changed_order.time = this.time.substring(0, 16).replace("T", " ");
            this.changed_order.order_status = 4;
            this.changed_order = null;
            mui.toast("Changed the Time. Waiting for Response.");
          } else {
            mui.toast("Changed Failed! Please Try Again or Later!");
          }
        })
        .catch(error => {
          mui.toast("Changed Failed! Please Try Again or Later!");
          
        });
    },
    changeTime: function(da) {
      this.change_time = true;
      this.time = da.time.replace(" ", "T");
      this.changed_order = da;
    },
    loadMore: function() {
      this.busy = true;
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getOrdererList",
            JSON.stringify({
              status: [3, 4],
              offset: this.page * 10
            }),
            config
          )
          .then(response => {
            
            if (response.data.success == true) {
              this.page++;
              this.data = this.data.concat(response.data.orders);
              if (response.data.orders.length < 10) {
                this.busy = true;
                this.loading = false;
              } else {
                this.busy = false;
              }
            } else {
              mui.toast("Getting Data Failed!");
            }
          })
          .catch(error => {
            mui.toast("Getting Data Failed!");
            
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

.order_status {
  color: white;
  padding: 2px 7px;
  border-radius: 7px;
  height: 24px;
  margin-top: -5px;
}
.address {
  white-space: pre-line;
  text-align: left;
  height: 42px;
}
.mui-bar-nav ~ .mui-content {
  padding-top: 0px !important;
}
</style>
