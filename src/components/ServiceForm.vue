<template>

  <div class="">
		<header class="mui-bar mui-bar-nav">
			<router-link to="/service" class="mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">{{title}}</h1>
			
		</header>
		<div class="mui-content">
			<form action="/createOrder" id="orderform" method="post" accept-charset="UTF-8">
				<div class="weui-cells__title">Basic Info</div>
				<div class="weui-cells weui-cells_form">
					<div class="weui-cell">
						<div class="weui-cell__hd"><label class="weui-label">Name</label></div>
						<div class="weui-cell__bd">
							<input class="weui-input" type="text" v-model="name" placeholder="Name" />
						</div>
					</div>
					<div class="weui-cell">
						<div class="weui-cell__hd"><label class="weui-label">Phone</label></div>
						<div class="weui-cell__bd">
							<input class="weui-input" type="number" v-model="phone" pattern="[0-9]*" placeholder="Phone Number" required/>
						</div>
					</div>

					<div class="weui-cell">
						<div class="weui-cell__hd"><label for="" class="weui-label">Time</label></div>
						<div class="weui-cell__bd">
							<input class="weui-input" type="datetime-local" v-model="time"  placeholder="Time" />
						</div>
					</div>
					<!-- <div class="weui-cell weui-cell_select weui-cell_select-after">
						<div class="weui-cell__hd">
							<label for="" class="weui-label">City</label>
						</div>
						<div class="weui-cell__bd">
							<select class="weui-select" v-model="city">
								<option value="1">Vancouver</option>
								<option value="2">Richmond</option>
							</select>
						</div>
					</div> -->

					<div class="weui-cell">
						<div class="weui-cell__bd">
							<input class="weui-input" v-model="address" type="text" id="customer_address"/>
						</div>
					</div>
				</div>
				<div class="weui-cells__title">Beds and Baths</div>

				<div class="weui-cells">
					<div class="mui-input-row">
						<label>Bed Rooms</label>
						<div class="mui-numbox">
							<button class="mui-btn mui-btn-numbox-minus" type="button" @click="bedroom<=0 ? 0 :bedroom--">-</button>
							<input class="mui-input-numbox" type="number" v-model="bedroom" />
							<button class="mui-btn mui-btn-numbox-plus" type="button" @click="bedroom++">+</button>
						</div>
					</div>
					<div class="mui-input-row">
						<label>Bath Rooms</label>
						<div class="mui-numbox">
							<button class="mui-btn mui-btn-numbox-minus" type="button" @click="bathroom<=0 ? 0 :bathroom--">-</button>
							<input class="mui-input-numbox" type="number" v-model="bathroom" placeholder="0" />
							<button class="mui-btn mui-btn-numbox-plus" type="button" @click="bathroom++">+</button>
						</div>
                    </div>
                    <div class="weui-cells weui-cells_checkbox">
                            <div class="mui-input-row mui-checkbox ">
                                <label>Checkbox1</label>
                                <input v-model="additional" type="checkbox" value=1>
                            </div>
                            <div class="mui-input-row mui-checkbox ">
                                <label>Checkbox2</label>
                                <input v-model="additional" type="checkbox" value=2>
                            </div>
                            <div class="mui-input-row mui-checkbox ">
                                <label>Checkbox3</label>
                                <input v-model="additional" type="checkbox" value=3>
                            </div>                           
														<div class="mui-input-row mui-checkbox ">
                                <label>Checkbox4</label>
                                <input v-model="additional" type="checkbox" value=4>
                            </div>
                        </div>
				</div>



			</form>
		</div>
		<nav class="mui-bar mui-bar-tab">
				
					<a class="weui-btn weui-btn_primary" @click="createOrder" type="submit" id="showTooltips">Create Order</a>
				
		</nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "serviceForm",
  data: function() {
    return {
      title: "",
      name: "rik",
      phone: "6047195215",
      time: "",
      city: "",
      bedroom: 1,
      bathroom: 0,
      address: "",
      additional: [],
      position: null
    };
  },
  mounted() {
    if (!this.$route.query.order_type) {
      this.$router.push("/service");
    }

    // if (this.$route.params.order) {
    //   console.log(this.$route.params.order);
    // }

    let weui = document.createElement("script");
    weui.setAttribute(
      "src",
      "https://res.wx.qq.com/open/libs/weuijs/1.1.3/weui.min.js"
    );
    document.head.appendChild(weui);
    let weuicss = document.createElement("link");
    weuicss.setAttribute(
      "href",
      "https://res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css"
    );
    weuicss.setAttribute("rel", "stylesheet");
    document.head.appendChild(weuicss);
    this.initAutocomplete();
    if (this.$route.query.order_type == 1) {
      this.title = "AIRBNB CLEANING";
    } else if (this.$route.query.order_type == 2) {
      this.title = "HOUSE CLEANING";
    } else {
      this.title = "HOUSE CLEANING";
    }
  },
  methods: {
    createOrder: function() {

      let details = {
        order_type: this.$route.query.order_type,
        name: this.name,
        phone: this.phone,
        time: this.time,
        city: this.city,
        address: this.address,
        bedroom: this.bedroom,
        bathroom: this.bathroom,
        additional: this.additional,
        hours: 3,
        position: this.position
      };

      if (!this.name) {
        mui.toast("Name is needed!");
        return;
      }
      if (!this.phone) {
        mui.toast("Phone is needed!");
        return;
      }
      if (!this.time) {
        mui.toast("Time is needed!");
        return;
      }
      if (!this.city) {
        mui.toast("Please enter the correct address.");
        return;
      }
      if (!this.address) {
        mui.toast("Address is needed!");
        return;
      }
      console.log(details);
      this.$router.push({ name: "SelectCleaner", params: { order: details } });
    },
    initAutocomplete: function() {
      var cityBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.006663, -123.30771),
        new google.maps.LatLng(49.395186, -122.187598)
      );
      // Create the search box and link it to the UI element.

      var input = document.getElementById("customer_address");
      var options = {
        bounds: cityBounds,
        componentRestrictions: {
          country: "ca"
        }
      };

      var searchBox = new google.maps.places.Autocomplete(input, options);

      // [START region_getplaces]
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      google.maps.event.addListener(searchBox, "place_changed", () => {
        var place = searchBox.getPlace();
        this.address = place.formatted_address;
        this.position = {lat:place.geometry.location.lat(),lng: place.geometry.location.lng()};
        this.city = place.vicinity;

        console.log(this.position);
        console.log(place);
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
input,
select {
  height: auto !important;
  margin: 0 !important;
  border: none !important;
  padding: 1px !important;
}

.mui-numbox input {
  height: 33px !important;
}

.mui-content {
  margin-bottom: 40px;
}

.weui-btn {
  border-radius: 0px;
}
.mui-bar-tab {
  height: 46px;
}
.weui-cells__title {
  margin-top: 0px;
}
</style>
