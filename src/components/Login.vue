<template>
<body>
		<header class="mui-bar mui-bar-nav">
			<h1 style="color:white" class="mui-title">Login</h1>
		</header>
		<div class="mui-content mui-text-center" style="background: transparent;color:white;margin:0 50px;">

			<img style="width:100%;margin:60px 0px 30px 0px" src="https://static.wixstatic.com/media/1da006_55b6d2136ae945e58b7b3c614253450b~mv2.png/v1/fill/w_258,h_64,al_c/1da006_55b6d2136ae945e58b7b3c614253450b~mv2.png">

	

		
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-person"></span></label>
							<input type="text" class="mui-input-clear" v-model="email" placeholder="带清除按钮的输入框">
						</div>
						<div class="mui-input-row">
							<label><span class="mui-icon mui-icon-locked"></span></label>
							<input type="password" class="mui-input-clear" v-model="password" placeholder="带清除按钮的输入框">
						</div>
						<button   v-on:click="signIn" style="width:100%;color:white;background:#EB482F;border-color: #EB482F;" class="mui-btn mui-btn-blue">Login</button>

			<router-link to="/sign-up"><button type="button" style="width:100%;margin:30px 0px 30px 0px" class="mui-btn mui-btn-blue">Register</button></router-link>
	    OR
      <button type="button" v-on:click="signInWithGoogle" style="width:100%;margin:30px 0px 30px 0px" class="mui-btn mui-btn-blue">Google</button>
			<p></p>
		</div>
</body>
</template>

<script>
import firebase from "firebase";
import "vue-awesome-mui/mui/dist/js/mui.js";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user.uid);
            mui.toast("Login Successfully!");
            this.$router.replace("service");
          },
          err => {
            mui.toast("Oops. " + err.message);
          }
        );
    },
    signInWithGoogle: function() {
      // let provider = new firebase.auth.FacebookAuthProvider();
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user; 
          console.log(user.uid);
          mui.toast("Login Successfully!");
          this.$router.replace("service");
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  }
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
body {
  background-image: url("https://public47.com/wp-content/uploads/2016/03/img_cap05-600x800.jpg");
  /* Full height */
  height: 100vh;
  overflow: hidden;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.mui-input-row {
  margin: 10px 0;
  width: 100%;
}

.mui-input-row input {
  border-bottom: 1px solid white !important;
  width: 80% !important;
}

.mui-input-row label {
  width: 20%;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: white;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white;
  opacity: 1;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
}

::placeholder {
  /* Most modern browsers support this now. */
  color: white;
}
</style>
