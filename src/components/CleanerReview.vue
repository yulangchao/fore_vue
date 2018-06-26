<template>
	<body>
		<header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 style="color:white" class="mui-title">{{cleaner.name}}'s Comments</h1>
		</header>
    <div class="weui-gallery" v-if="selected_image" style="display:block">
      <span class="weui-gallery__img"  @click="closeImage()" :style="'background-image: url('+selected_image+')'"></span>
      <div class="weui-gallery__opr">
						<a href="javascript:" class="weui-gallery__del"   @click="PrevImage()" style="width:50%;float:left">
              <i class="fas fa-chevron-circle-left"></i>
						</a>
            <a href="javascript:" class="weui-gallery__del" @click="NextImage()" style="width:50%;float:left">
              <i style="fonts"class="fas fa-chevron-circle-right" ></i>
						</a>
			</div>
    </div>
		<div class="mui-content" style="margin-bottom:50px;">
      <ul v-if="cleaner" class="mui-table-view mui-table-view-chevron" style="margin-top:0px">
        <li class="mui-table-view-cell mui-media">
          <a class="" href="#account">
            <img class="mui-media-object mui-pull-left head-img" id="head-img" v-lazy="cleaner.avatar == null ?url() : cleaner.avatar ">
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
            </div>
          </a>
        </li>
      </ul>
      <h5>Comments</h5>
			<ul class="mui-table-view">
        <template v-for="review in data">
          <div class="mui-table-view-cell mui-input-row mui-media mui-left">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%;width:79px" v-lazy="review.avatar == null ? url() :review.avatar ">
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
        </template>
        
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">No More Reviews</p>
        </div>
			</ul>
		</div>

	</body>
</template>

<script>
import axios from "axios";
var count = 0;
export default {
  name: "cleanerReview",
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true,
      cleaner: null,
      selected_image: null,
      ga_images:[]
    };
  },
  created() {
    if (!this.$route.params.cleaner) {
      this.$router.push("/cleaner");
    }
    this.cleaner = this.$route.params.cleaner;

  },
  methods: {
    NextImage: function() {
      let index = this.ga_images.indexOf(this.selected_image);
      if (index < this.ga_images.length-1){
        this.selected_image = this.ga_images[index+1];
      }
    },
    PrevImage: function() {
      let index = this.ga_images.indexOf(this.selected_image);
      if (index > 0 ){
        this.selected_image = this.ga_images[index-1];
      }
    },
    showImage: function(selected_image,ga_images) {
      this.selected_image = selected_image;
      this.ga_images = ga_images;
      document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2");
    },
    closeImage: function() {
      this.selected_image = null;
      this.ga_images = [];
      document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no");
    },
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        axios
          .post(
            "http://foreclean.tk:8000/api/getReviewForCleaner",
            JSON.stringify({
              cleaner_id: this.cleaner.id,
              offset: this.page * 10
            })
          )
          .then(response => {
            console.log(response);
            if (response.data.success == true) {
              this.page++;
              this.data = this.data.concat(response.data.reviews);
              if (response.data.reviews.length < 10) {
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
.mui-icon-star-filled {
  font-size: 14px !important;
}
.mui-btn-block {
  display: inline;
  padding: 15px auto;
  width: 50%;
  text-align-last: center !important;
  text-align: center !important;
  padding: 15px 50px;
  margin-bottom: 0px;
}

.view-btn {
  width: auto !important;
}
.mui-android .mui-modal .mui-bar {
  position: absolute !important;
}
</style>
