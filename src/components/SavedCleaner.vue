<template>
	<body>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon  mui-action-back mui-icon-left-nav mui-pull-left"></a>
			<h1  style="color:white" class="mui-title">Saved Cleaner</h1>
		</header>
		<div class="mui-content">

			<ul class="mui-table-view">
        <template v-for="da in data">
          <div class="mui-table-view-cell mui-input-row mui-media mui-left">
              <img class="mui-media-object mui-pull-left" style="border-radius: 100%" v-lazy="da.avatar == null ?url():da.avatar ">
              <span data-v-7e957575="" style="position: absolute; right: 10px; top: 15px;">
                <button v-if="cleaner_list.indexOf(da.id)<0" type="button"  @click="saveOrUnsave(da.id)" style="padding:2px;width:auto;top: -5px;" class="mui-btn mui-btn-warning" >Save</button>
                <button v-if="cleaner_list.indexOf(da.id)>-1" type="button" @click="saveOrUnsave(da.id)" style="padding:2px;width:auto;top: -5px;" class="mui-btn mui-btn-success" >Saved</button> 
              </span>
              <router-link :to="{ name: 'CleanerReview', params: { cleaner: da}}" type="button"  style="padding:5px;top: 50px;" class="mui-btn mui-btn-primary view-btn">View</router-link>
              <h5 class="mui-pull-right"></h5>
              <div class="mui-media-body">
                <h4 class='mui-ellipsis' style="text-align:left">{{da.name}}&nbsp;
                  <template v-for="i in da.rate">
                      <i data-index="1" style="color: goldenrod;" class="mui-icon mui-icon-star-filled"></i>
                  </template>
                </h4>
                <p class='mui-ellipsis'><span  style="float:left">{{getCityName(da.city)}}</span>&nbsp; <span style="color:red;margin-right:70px;float:right">Price: ${{da.pay_rate}}/hr</span></p>
              </div>
           
          </div>
        </template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <p v-if="busy && loading"><span class="mui-spinner"></span></p>
          <p v-if="!loading">End Of Cleaner</p>
        </div>
			</ul>
		</div>

	</body>
</template>

<script>
import axios from "axios";
import cleanerReview from "./CleanerReview.vue";
var count = 0;
export default {
  name: "cleaner",
  components: {
    cleanerReview
  },
  data() {
    return {
      busy: false,
      data: [],
      page: 0,
      loading: true,
      cleaner: null,
      modalClass: "mui-modal",
      city: 0,
      price: 0,
      cleaner_page: 0,
      cleaner_reviews: [],
      cleaner_loading: true,
      cleaner_busy: false,
      lock: false,
      cleaner_list: []
    };
  },
  created() {
    this.cleaner_list = JSON.parse(localStorage.getItem("saved_cleaners"));
  },
  methods: {
    saveOrUnsave(id) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      };
      axios
        .post(
          "http://foreclean.tk:8000/api/saveOrUnsaveCleaner",
          JSON.stringify({
            cleaner_id: id
          }),
          config
        )
        .then(response => {
          if (response.data.success == true) {
            console.log(response.data);
            if (response.data.message == "saved") {
              this.cleaner_list.push(id);
            } else {
              this.cleaner_list.splice(
                this.cleaner_list.indexOf(id),
                1
              );
              this.data.splice(
                this.cleaner_list.indexOf(id),
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
          console.log(error.response);
        });
    },
    loadMore: function() {
      this.busy = false;
      if (this.lock == false) {
        axios
          .post(
            "http://foreclean.tk:8000/api/getSavedCleanerList",
            JSON.stringify({
              cleaner_list: this.cleaner_list
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
              mui.toast("Getting Data Failed!");
            }
            this.lock = false;
          })
          .catch(error => {
            console.log(error.response);
            this.lock = false;
          });
      }
      this.lock = true;
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
