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
		<div class="mui-content">
        <div style="padding: 10px 10px;">
				<div id="segmentedControl" class="mui-segmented-control">
                    <router-link to="/order" class="mui-control-item">Unpaid</router-link> 
					<router-link to="/order/book" class="mui-control-item">Booked</router-link>  
                    <router-link to="/order/inservice" class="mui-control-item mui-active">Serving</router-link>
					<router-link to="/order/finish" class="mui-control-item">Finished</router-link>
				</div>
		</div>
		<ul class="mui-table-view">
        <template v-for="da in data">
          <li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
              <h5 class="mui-pull-right">${{da.price+da.agent_fee}}</h5>
              <router-link :to="{ name: 'OrderDetail', params: { order: da}}" class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left;margin:0px;padding:5px 0px;">{{getOrderType(da.order_type)}}&nbsp;&nbsp;
                  <button class="order_status" style="background:#64d573">In Service</button>
                  <button v-if="da.cleaner_id== 6" class="order_status" style="background:gold">VIP</button>
                  <!-- <button v-if="da.order_status== 3" class="order_status" style="background:#64d573">Arranged</button> -->
                </h4>
                <p class='mui-ellipsis' style="text-align:left"><i class="fas fa-phone"></i>:{{da.phone}}  <span style="color:red"><i class="fas fa-clock"></i>:{{da.time}}</span></p>
                <p class='mui-ellipsis address'>{{da.address.substring(0,60)}}&nbsp;</p>
              </router-link>
            </a>
          </li>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">No More Order</p>
        </div>
			</ul>
		</div>

	</body>
</template>

<script>
import axios from "axios";
var count = 0;
export default {
  name: "inService",
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true
    };
  },
  mounted() {},
  methods: {
    redirect: function() {
      this.$router.replace("hello");
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
              status: [5],
              offset: this.page * 10
            }),
            config
          )
          .then(response => {
            console.log(response);
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

.order_status {
  color: white;
  padding: 2px 7px;
  border-radius: 7px;
  height: 24px;
  margin-top: -5px;
}
.address{
  white-space: pre-line;
    text-align: left;
        height: 42px;
}
</style>
