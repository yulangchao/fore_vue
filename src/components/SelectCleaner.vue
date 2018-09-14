<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			<router-link :to="{ name: 'ServiceForm', params: { order_type: order.order_type, order: order}}" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1  style="color:white" class="mui-title">Select at Most 3 Cleaners</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
        <a class="weui-btn weui-btn_primary"  type="submit" id="showTooltips" @click="createOrder">Create Order</a>
		</nav>
		<div id="modal1" v-if="loading_spin" class="mui-modal mui-active" style="opacity: 0.6;">
          <span class="mui-spinner" style="    top: 50%;
        position: absolute;
        width: 40px;
        height: 40px;left: 0;
        right: 0;    margin: auto;"></span>
		</div>

    <!-- <div id="modal" :class="modalClass" v-if="cleaner != null">
				<header class="mui-bar mui-bar-nav">
					<a class="mui-icon mui-icon-close mui-pull-right" @click="closeModal"></a>
					<h1 class="mui-title">{{cleaner.name}}</h1>
				</header>
				<div class="mui-content" style="height: 100%;overflow: scroll;">
            <ul v-if="cleaner" class="mui-table-view mui-table-view-chevron" style="margin-top:0px">
              <li class="mui-table-view-cell mui-media">
                <a class="" href="#account">
                  <img class="mui-media-object mui-pull-left head-img"  style="border-radius: 100%" id="head-img" :src="cleaner.avatar == null ?url() :  cleaner.avatar">
                  <div class="mui-media-body" style="text-align:left">
                    <h4>{{cleaner.name}}              
                      <template v-for="i in cleaner.rate">
                            <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                      </template>
                      
                    </h4>

                    <p class='mui-ellipsis'>{{getCityName(cleaner.city)}}
                      <span style="position:absolute;right:10px">Total Orders: {{cleaner.pay_rate}}</span>
                      <span style="position:absolute;right:10px;top:15px">Pay Rate: ${{cleaner.pay_rate}}/hr</span>
                    </p>
                    <p class='mui-ellipsis'>Lang:{{cleaner.languages}}
                      <span style="position:absolute;right:10px">Work Years: {{cleaner.work_years}}</span>
                    </p>
                  </div>
                  <div class="mui-media-body" style="text-align:left">
                    <h5 class="font-bold">Skills</h5>
                    <div class="mui-row">             
                      <template v-for="i in 6">
                          <div class="mui-col-xs-6"> - {{i}}</div>
                      </template>
                      
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <h5>Recent 10 Comments</h5>
            <ul class="mui-table-view">
              <template v-for="review in cleaner_review">
                <div class="mui-table-view-cell mui-input-row mui-media mui-left">
                    <img class="mui-media-object mui-pull-left" style="border-radius: 100%;width:42px;" v-lazy="review.avatar==null?url() : review.avatar">
                    <h5 class="mui-pull-right"></h5>
                    <div class="mui-media-body">
                      <p class="mui-pull-right">{{review.created_at.split(" ")[0]}}</p>
                      <h4 class='mui-ellipsis' style="text-align:left">{{review.name}}&nbsp;
                        
                      </h4>
                      <p style="text-align: left">
                      <template v-for="i in review.rate">
                            <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                      </template>
                      </p>
                      <p class='mui-ellipsis' style="text-align: left;white-space: pre-line;word-wrap: break-word;">{{review.comments}}</p>
                    </div>
                
                </div>
              </template>
            </ul>
				</div>
		</div> -->
		<div class="mui-content">
      <div>
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h4 class="mui-ellipsis" style="white-space: initial;">{{order.address}}</h4>
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
      <h5 class="">*Select Our Premium Cleaners</h5>
			<ul class="mui-table-view">
        <template>
          <div v-bind:style="cleaner_list.indexOf(6)>-1?'background: #f5e8ce !important':''" class="mui-table-view-cell mui-input-row mui-media mui-left">
              <img class="mui-media-object mui-pull-left" style="border-radius: 2px" src="http://foreclean.tk:8000/storage/files/May2018/9OFHyqBtWwZqbebh4e9V.png">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="dialog" >Select</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body" @click="view(premium_cleaner)">
                <h4 class='mui-ellipsis' style="text-align:left">Fore&nbsp;
                  <template v-for="i in 5">
                      <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                  </template>
                </h4>
                <p class='mui-ellipsis distance'></p>
                <p class='mui-ellipsis'><span  style="float:left">Richmond</span>&nbsp; <span style="color:red;margin-right:60px;float:right">Price: 30/hr</span></p>
              </div>
           
          </div>
        </template>
			</ul>
      <h5 class="">*Select at Most 3 Cleaners ({{this.cleaners.length}}/3)</h5>
			<ul class="mui-table-view" style="margin-bottom: 50px;">
        <template v-for="da in data">

          <div v-bind:style="cleaner_list.indexOf(da.id)>-1?'background: #f5e8ce !important':''" class="mui-table-view-cell mui-input-row mui-checkbox mui-media mui-left">
              <input style="left: 0px; width: 48px;height: 72px;padding: 20px 10px;top: 0px;" :id="'check' +da.id" v-model="cleaners" :value="da.id" type="checkbox" @change="selected($event,da.id);" :disabled="cleaners.indexOf(da.id)<0 && cleaners.length >=3">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%" v-lazy="da.avatar==null?url() : da.avatar">
              <button type="button" class="mui-btn mui-btn-primary view-btn" @click="view(da)">View</button>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">{{da.name}}&nbsp;
                  <template v-for="i in da.rate">
                      <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                  </template>
                </h4>
                <p class='mui-ellipsis distance'>{{da.distance.toFixed(2)}}km</p>
                <p class='mui-ellipsis'><span  style="float:left">{{getCityName(da.city)}}</span>&nbsp; <span style="color:red;margin-right:50px;float:right">Price: {{da.pay_rate}}/hr</span></p>
              </div>
           
          </div>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">End Of Cleaners</p>
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
      loading_spin: false,
      data: [],
      page: 0,
      loading: true,
      order: null,
      cleaners: [],
      cleaner: null,
      modalClass: "mui-modal",
      cleaner_review: [],
      premium_cleaner: {
        id: 6,
        name: "Fore",
        sex: 1,
        city: 1,
        rate: 5,
        avatar: this.url_prefix() + "files/May2018/9OFHyqBtWwZqbebh4e9V.png",
        pay_rate: 30
      },
      cleaner_list: []
    };
  },
  created() {
    if (!this.$route.params.order) {
      mui.toast("Please resubmit your order!");
      this.$router.push("/service");
    }
    this.order = this.$route.params.order;
    this.cleaner_list = JSON.parse(localStorage.getItem('saved_cleaners'));
  },
  mounted() {
    //重置后退键
    // let backButton = e => {
    //   e.preventDefault();
    //   if (this.order) {
    //     this.$router.push({
    //       name: "ServiceForm",
    //       params: { order_type: this.order.order_type, order: this.order }
    //     });
    //     window.removeEventListener("popstate", backButton);
    //   }
    // };
    // window.addEventListener("popstate", backButton);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", () => {
      
    });
  },
  methods: {
    dialog: function() {
      var btnArray = ["No", "Confirm"];
      mui.confirm("You selected the ", "Fore", btnArray, e => {
        if (e.index == 1) {
          let d = new Date(Date.parse(this.order.time + "Z"));
          let start_time = this.order.time.split("T")[1].substr(0, 5);
          let hr = new Date(
            Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
          ).getHours();
          let min = new Date(
            Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
          ).getMinutes();
          let total_min = hr * 60 + min * 1 + this.order.hours * 60;

          let end_time = this.getTimeFromMinutes(total_min);
          let config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token")
            }
          };
          this.loading_spin = true;
          axios
            .post(
              "http://foreclean.tk:8000/api/createOrder",
              JSON.stringify({
                order_type: this.order.order_type,
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
                selected_cleaners: [-1],
                city: this.order.city,
                notes: this.order.notes
              }),
              config
            )
            .then(response => {
              
              if (response.data.success == true) {
                mui.toast("Created order and wait for responses from cleaners!");
                this.$router.push("/order");
              } else {
                mui.toast("Created failed, Please Contact us or try later!");
              }
              this.loading_spin = false;
            })
            .catch(error => {
              mui.toast("Created failed, Please Contact us or try later!");
              this.loading_spin = false;
              
            });
        } else {
        }
      });
    },
    createOrder: function() {
      if (this.cleaners.length == 0) {
        mui.toast("Please select at least 1 cleaner!");
        return;
      }
      let d = new Date(Date.parse(this.order.time + "Z"));
      let start_time = this.order.time.split("T")[1].substr(0, 5);
      let hr = new Date(
        Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
      ).getHours();
      let min = new Date(
        Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
      ).getMinutes();
      let total_min = hr * 60 + min * 1 + this.order.hours * 60;

      let end_time = this.getTimeFromMinutes(total_min);
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      this.loading_spin = true;
      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/createOrder",
            JSON.stringify({
              order_type: this.order.order_type,
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
              selected_cleaners: this.cleaners,
              city: this.order.city,
              notes: this.order.notes
            }),
            config
          )
          .then(response => {
            
            if (response.data.success == true) {
              mui.toast("Created order and wait for responses from cleaners!");
              this.$router.push("/order");
            } else {
              mui.toast("Created failed, Please Contact us or try later!");
            }
            this.loading_spin = false;
          })
          .catch(error => {
            mui.toast("Created failed, Please Contact us or try later!");
            this.loading_spin = false;
            
          });
      }, 0);
    },
    view: function(da) {
      this.$router.push({
        name: "CleanerReview",
        params: { nav : 'select', cleaner_id: da.id, order:this.order }
      });
      // this.cleaner = da;
      // this.loadReview();
      // if (da.id != 6) {
      //   document.getElementById("check" + da.id).click();
      // }
      // this.modalClass = "mui-modal mui-active";
    },
    closeModal: function(da) {
      this.cleaner_review = [];
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
    loadReview: function() {
      
      axios
        .post(
          "http://foreclean.tk:8000/api/getReviewForCleaner",
          JSON.stringify({
            cleaner_id: this.cleaner.id,
            offset: 0
          })
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.cleaner_review = this.cleaner_review.concat(
              response.data.reviews
            );
          } else {
            mui.toast("Getting Data Failed!");
          }
        })
        .catch(error => {
          
        });
    },
    loadMore: function() {
      this.busy = true;
      let d = new Date(Date.parse(this.order.time + "Z"));

      let data = {
        hours: this.order.hours,
        time: this.order.time.replace("T", " "),
        day: new Date(
          Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
        ).getDay(),
        hr: new Date(
          Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
        ).getHours(),
        min: new Date(
          Date.parse(this.order.time + "Z") + d.getTimezoneOffset() * 60000
        ).getMinutes(),
        offset: this.page * 10,
        position: this.order.position
      };

      if (data.day == 0){
        data.day = 7;
      }
      
      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getCleanerListByOrder",
            JSON.stringify(data)
          )
          .then(response => {
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
              mui.toast("Getting Data Failed!");
            }
          })
          .catch(error => {
            
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
  padding: 6px !important;
}

.mui-table-view-cell > .mui-btn {
  width: auto !important;
  top: 50px !important;
  padding: 6px !important;
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

.mui-bar-nav ~ .mui-content {
  padding-bottom: 60px !important;
}

:not(.mui-android) .mui-modal .mui-content {
  margin-top: 44px !important;
}
.mui-android .mui-modal .mui-content {
  margin-top: 0px !important;
}
</style>
