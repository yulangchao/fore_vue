<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon  mui-action-back mui-icon-left-nav mui-pull-left"></a>
			<h1  style="color:white" class="mui-title">Order Detail</h1>
		</header>
		<div id="modal" v-if="loading" class="mui-modal mui-active" style="opacity: 0.6;">
          <span class="mui-spinner" style="    top: 50%;
        position: absolute;
        width: 40px;
        height: 40px;left: 0;
        right: 0;    margin: auto;"></span>
		</div>

		<div class="mui-content">
      <div>

		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">

            <div class="aui-flex">
                    <div class="aui-flex-add">
                        <img src="../assets/icon-add.png" alt="">
                    </div>
                    <div class="aui-flex-box">
                        <h3 class="pull-left">
                            {{order.name}}  <em>{{order.phone}}</em>
                        </h3>
                        <p  class="pull-left">{{order.address}}</p>
                    </div>
            </div>

		        <li class="mui-table-view-cell"  style="margin:0 0 10px 0 !important">

		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
                        <h5 >Order No: #{{order.order_sn}}</h5>
                        <h5 style="color:#EB482F ">Status: {{getOrderStatus(order.order_status)}}</h5>
		                    <h5 >Booked Time: {{order.time.replace("T", " ").split(".")[0]}}</h5>
                         <h5 >Total Hours:  <span style="color:red"> {{order.hours}} Hours</span></h5>
                        <h5 >Created Time: {{order.created_at}}</h5>
		                    <p class="mui-h6 mui-ellipsis">
                          <button type="button" class="mui-btn mui-btn-primary">Bedroom <span class="mui-badge mui-badge-primary">{{order.bedroom}}</span></button>
                          &nbsp;<button type="button" class="mui-btn mui-btn-success">Bathroom <span class="mui-badge mui-badge-success">{{order.bathroom}}</span></button>
                          <template v-for="additional of order.additional">
                                <div style="font-size:15px"><i class="fas fa-check-circle"></i>    {{getAdditionalName(additional)}}</div>
                          </template>
                          <div  v-if="order.notes!=''" style="font-size:15px" class="mui-h6">Other Requests: <h4 class="mui-ellipsis" style="font-size:15px !important;white-space:initial">{{order.notes}}</h4></div>
                        </p>
		                </div>
		                <!-- <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                </div> -->
		            </div>
		        </li>
		    </ul>

        <ul v-if="order.cleaner_id" class="mui-table-view" style="margin-bottom:10px;">
          <template v-if="cleaner">
            
            <div class="mui-table-view-cell mui-input-row mui-media mui-left">
                <h4 v-if="order.cleaner_id" class="font-bold pull-left"  style="color:#333; font-size:15px;margin-bottom:10px">Selected Cleaner</h4>
                <div>
                  <img class="mui-media-object mui-pull-left" style="border-radius:100%" v-lazy="cleaner.avatar==null?url() : cleaner.avatar">

                  <div class="mui-media-body">
                    <span v-if="order.order_status==6" style="position: absolute; right: 10px; top: 15px;">
                      <button v-if="cleaner_list.indexOf(order.cleaner_id)<0" type="button"  @click="saveOrUnsave(order.cleaner_id)" style="padding:2px;width:auto" class="mui-btn mui-btn-warning" >Save</button>
                      <button v-if="cleaner_list.indexOf(order.cleaner_id)>-1" type="button" @click="saveOrUnsave(order.cleaner_id)" style="padding:2px;width:auto" class="mui-btn mui-btn-success" >Saved</button> 
                    </span>
                    <h4 class='mui-ellipsis' style="text-align:left">{{cleaner.name}}&nbsp;
                      <template v-for="i in cleaner.rate">
                          <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                      </template>
                    </h4>
                    <!-- <p class='mui-ellipsis distance'>15km</p> -->
                    <p class='mui-ellipsis'><span  style="float:left">{{getCityName(cleaner.city)}}</span>&nbsp; <span style="color:red;margin-right:10px;float:right">Price: {{cleaner.pay_rate}}/hr</span></p>
                  </div>
                </div>
            </div>
          </template>
        </ul>



        <ul v-if="pendding_cleaners.length > 0" class="mui-table-view"  style="margin-bottom:10px;">
          <template v-if="pendding_cleaners.length > 0" v-for="pendding_cleaner of pendding_cleaners">
            <div class="mui-table-view-cell mui-input-row mui-media mui-left">
                <h4 v-if="pendding_cleaners.length > 0" class="font-bold pull-left"  style="color:#333; font-size:15px;margin-bottom:10px">Pending cleaners</h4>
                <img class="mui-media-object mui-pull-left" style="border-radius:100%" v-lazy="pendding_cleaner.avatar==null?url() : pendding_cleaner.avatar">
                <!-- <button type="button" class="mui-btn mui-btn-primary view-btn" @click="dialog" >Select</button> -->
                <h5 class="mui-pull-right"></h5>
                <div class="mui-media-body">
                  <h4 class='mui-ellipsis' style="text-align:left">{{pendding_cleaner.name}}&nbsp;
                    <template v-for="i in pendding_cleaner.rate">
                        <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                    </template>
                  </h4>
                  <!-- <p class='mui-ellipsis distance'>15km</p> -->
                  <p class='mui-ellipsis'><span  style="float:left">{{getCityName(pendding_cleaner.city)}}</span>&nbsp; <span style="color:red;margin-right:10px;float:right">Price: {{pendding_cleaner.pay_rate}}/hr</span></p>
                </div>
            
            </div>
          </template>
        </ul>
        <template v-if="order.price >0">
        
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed"  style="margin-bottom:10px;">
		        <li class="mui-table-view-cell">
              <h4 class="font-bold pull-left" style="color:#333; font-size:15px;margin-bottom:10px">Fee Details</h4>
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h5 class="mui-ellipsis">Service Fee <span class="pull-right">${{order.price}}.00</span></h5>
                        <h5 class="mui-ellipsis">Agent Fee <span  class="pull-right">${{order.agent_fee}}.00</span></h5>
		                    <h5 class="mui-ellipsis" style="font-weight:bold">Total Fee <span  class="pull-right">${{order.price + order.agent_fee}}.00</span></h5>
		                </div>
		                <!-- <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-h5">12:25</span>
		                </div> -->
		            </div>
		        </li>
		    </ul>
        </template>

		    <ul v-if="order.order_status == 7 ||order.order_status == 8 || order.order_status == 9" class="mui-table-view mui-table-view-striped mui-table-view-condensed"   style="margin-bottom:10px;">
		        <li class="mui-table-view-cell">
                      <h4 v-if="order.order_status == 7 || order.order_status == 8 || order.order_status == 9" class="font-bold pull-left"  style="color:#333; font-size:15px;margin-bottom:10px">Canceled Reason</h4>
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h5 class="mui-ellipsis">{{order.cancel_reason}}</h5>
                      
		                </div>
		            </div>
		        </li>
		    </ul>

		    <ul v-if="order.review_status == 1 && review" class="mui-table-view mui-table-view-striped mui-table-view-condensed"  style="margin-bottom:10px;">
		        <li class="mui-table-view-cell">
              <h4  class="font-bold pull-left" style="color:#333; font-size:15px;margin-bottom:10px" v-if="order.review_status == 1 && review" >Comment To Cleaner</h4>
		            <div class="mui-table">
                    
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h5 class="mui-ellipsis">{{review.comments}}</h5>
                        <div v-if="JSON.parse(review.images).length>0" class="weui-uploader" style="padding: 10px;">
                          <div class="weui-uploader__bd">
                              <ul class="weui-uploader__files" id="uploaderFiles">
                                <template v-for="image of JSON.parse(review.images)"> 
                                  <li  @click="showImage(image,JSON.parse(review.images))" class="weui-uploader__file" :style="'background-image:url('+image+')'"></li>
                                </template>
                              </ul>
                          </div>
                      </div>
		                </div>
		            </div>
		        </li>
		    </ul>
        
		    <ul v-if="reviewToMe.length >0 && reviewToMe" class="mui-table-view mui-table-view-striped mui-table-view-condensed"  style="padding-bottom:10px;">
		        <li class="mui-table-view-cell">
                <h4 class="font-bold pull-left" style="color:#333; font-size:15px;margin-bottom:10px" v-if="reviewToMe.length >0" >Comment To Me</h4>
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-12 mui-text-left">
		                    <h5 class="mui-ellipsis">{{reviewToMe[0].comments}}</h5>
		                </div>
		            </div>
		        </li>
		    </ul>
			</div>
		</div>
    <div class="weui-gallery" v-if="selected_image" style="display:block">
      <span class="weui-gallery__img"  @click="closeImage()" :style="'background-image: url('+selected_image+');height: 100vh;'"></span>
      <a href="javascript:" class="weui-gallery__del"   @click="PrevImage()" style="width:50px;left:0;height:100vh;position:absolute;z-index:1000">
        <i style="position:absolute;top:50vh;left:5px;    font-size: 30px;color:#eb482f" class="fas fa-chevron-circle-left"></i>
      </a>
      <a href="javascript:" class="weui-gallery__del" @click="NextImage()" style="width:50px;right:0;height:100vh;position:absolute;z-index:1000">
        <i style="position:absolute;top:50vh;right: 5px;    font-size: 30px;color:#eb482f" class="fas fa-chevron-circle-right" ></i>
      </a>
      <div class="weui-gallery__opr">

			</div>
    </div>
	</body>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

import { Card, createToken } from "vue-stripe-elements-plus";

var count = 0;
export default {
  name: "orderDetail",
  components: { Card },
  data() {
    return {
      order: null,
      cleaner: null,
      loading: false,
      pendding_cleaners: [],
      review: null,
      selected_image: null,
      ga_images: [],
      cleaner_list: [],
      reviewToMe: []
    };
  },
  created() {
    this.cleaner_list = JSON.parse(localStorage.getItem("saved_cleaners"));
    if (!this.$route.params.order) {
      this.$router.push("/order");
    }
    this.order = this.$route.params.order;
  },
  mounted() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };
    if (this.order.order_status != 1) {
      axios
        .post(
          "http://foreclean.tk:8000/api/getCleanerList",
          JSON.stringify({ cleaner_id: this.order.cleaner_id })
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.cleaner = response.data.cleaners[0];
          } else {
            mui.toast(response.data.error);
          }
        })
        .catch(error => {
          
        });
    } else {
      axios
        .post(
          "http://foreclean.tk:8000/api/getResponseList",
          JSON.stringify({ order_id: this.order.id }),
          config
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.pendding_cleaners = response.data.cleaners;
          } else {
            mui.toast(response.data.error);
          }
        })
        .catch(error => {
          
        });
    }

    if (this.order.review_status == 1) {
      axios
        .post(
          "http://foreclean.tk:8000/api/getReviewForOrder",
          JSON.stringify({ order_id: this.order.id }),
          config
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.review = response.data.review;
          } else {
            mui.toast(response.data.error);
          }
        })
        .catch(error => {
          
        });
    }
    if (this.order.order_status >5) {
      axios
        .post(
          "http://foreclean.tk:8000/api/getReviewForClientwithOrder",
          JSON.stringify({ order_id: this.order.id }),
          config
        )
        .then(response => {
          
          if (response.data.success == true) {
            this.reviewToMe = response.data.reviews;
          } else {
            mui.toast(response.data.error);
          }
        })
        .catch(error => {
          
        });
    }
  },
  methods: {
    NextImage: function() {
      let index = this.ga_images.indexOf(this.selected_image);
      if (index < this.ga_images.length - 1) {
        this.selected_image = this.ga_images[index + 1];
      }
    },
    PrevImage: function() {
      let index = this.ga_images.indexOf(this.selected_image);
      if (index > 0) {
        this.selected_image = this.ga_images[index - 1];
      }
    },
    showImage: function(selected_image, ga_images) {
      this.selected_image = selected_image;
      this.ga_images = ga_images;
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
          "content",
          "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2"
        );
    },
    closeImage: function() {
      this.selected_image = null;
      this.ga_images = [];
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
          "content",
          "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        );
    },
    saveOrUnsave() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios
        .post(
          "http://foreclean.tk:8000/api/saveOrUnsaveCleaner",
          JSON.stringify({
            cleaner_id: this.order.cleaner_id
          }),
          config
        )
        .then(response => {
          if (response.data.success == true) {
            
            if (response.data.message == "saved") {
              this.cleaner_list.push(this.order.cleaner_id);
            } else {
              this.cleaner_list.splice(
                this.cleaner_list.indexOf(this.order.cleaner_id),
                1
              );
            }
            localStorage.setItem(
              "saved_cleaners",
              JSON.stringify(this.cleaner_list)
            );
          } else {
            mui.toast(response.data.error);
          }
        })
        .catch(error => {
          
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mui-content {
  padding-top: 0px;
}
.stripe-card {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a !important;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.stripe-card.complete {
  border-color: green;
}


.mui-table-view-cell {
    border-radius: 0px !important;
    background: white !important;
    margin: 0px !important;
    box-shadow: none !important;
}

.aui-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 15px;
    position: relative;
    background: white;
    margin-bottom: 10px;
}
.aui-flex-add img {
    width: 100%;
    height: auto;
    display: block;
    border: none;
}

.aui-flex-add {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.aui-flex-box {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    font-size: 13px;
    color: #333;

    /* width: 100%; */
}
.aui-flex-box p {
    font-size: 12px;
    color: #999;
    padding: 5px 0;
            line-height: 17px;
            margin-bottom: 0px;
}
h5{
    font-size: 12px;
    color: #999;
    font-weight: 300;
}
.aui-flex-box h3 em {
    font-size: 14px;
    color: #999;
    font-style: normal;
    font-weight: normal;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;    margin-inline-end: 0px;
    font-weight: bold;
    margin:0;
    padding:0;
} 
</style>
