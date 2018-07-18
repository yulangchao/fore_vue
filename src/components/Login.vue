<template>
<body>
		<header class="mui-bar mui-bar-nav">
			<h1 style="color:white" class="mui-title">Login</h1>
		</header>
		<div id="modal" v-if="loading" class="mui-modal mui-active" style="opacity: 0.6;">
          <span class="mui-spinner" style="    top: 50%;
        position: absolute;
        width: 40px;
        height: 40px;left: 0;
        right: 0;    margin: auto;"></span>
		</div>
		<div class="mui-content mui-text-center" style="background: transparent;color:white;margin:0 50px;">

			<img style="width:100%;margin:60px 0px 30px 0px" src="../assets/logo1.png">

	

		
      <div class="mui-input-row">
        <label><i class="fas fa-user-circle" style="font-size: 20px;"></i></label>
        <input type="text" class="mui-input-clear" v-model="email" placeholder="Email">
      </div>
      <div class="mui-input-row">
        <label><i class="fas fa-key" style="font-size: 20px;"></i></label>
        <input type="password" class="mui-input-clear" v-model="password" placeholder="Password">
      </div>
      <p style="color:#0c0cec" @click="forgetPassword"><a>Forget Password?</a></p>
      <button   v-on:click="signIn" style="width:100%;color:white;background:#EB482F;border-color: #EB482F;" class="mui-btn mui-btn-blue">Login</button>

			<router-link to="/sign-up"><button type="button" style="width:100%;margin:30px 0px 30px 0px" class="mui-btn mui-btn-blue">Register</button></router-link>
	    OR
      <button type="button" v-on:click="signInWithGoogle" style="width:100%;margin:30px 0px 30px 0px;background:#3B5998; border-color:#3B5998" class="mui-btn mui-btn-blue">Facebook</button>
			<p></p>
		</div>
</body>
</template>

<script>
import firebase from "firebase";
import "vue-awesome-mui/mui/dist/js/mui.js";
import axios from "axios";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    signIn: function() {
      this.loading = true;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            axios
              .post(
                "http://foreclean.tk:8000/api/getAccessCode",
                JSON.stringify({
                  name: user.displayName,
                  phone: user.phoneNumber,
                  email: user.email,
                  uid: user.uid,
                  source: 2
                })
              )
              .then(response => {
                console.log(response);
                if (response.data.success == true) {
                  console.log(response);
                  localStorage.setItem("access_token", response.data.token);
                  localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                  );
                  mui.toast("Login Successfully!");
                  this.$router.replace("service");
                } else {
                  mui.toast("注册失败，请稍后再试");
                }
              })
              .catch(error => {
                this.loading = false;
                console.log(error.response);
              });
          },
          err => {
            this.loading = false;
            mui.toast("Oops. " + err.message);
          }
        );
    },
    forgetPassword: function() {
      var btnArray = ["Cancel", "Send"];
      mui.prompt(
        "Please Enter Your Email：",
        "Email",
        "Forget Password",
        btnArray,
        (e) => {
          if (e.index == 1) {
            firebase
              .auth()
              .sendPasswordResetEmail(e.value)
              .then(function() {
                // Password reset email sent.
              })
              .catch(function(error) {
                // Error occurred. Inspect error.code.
              });
          } else {

          }
        }
      );
    },
    signInWithGoogle: function() {
      let provider = new firebase.auth.FacebookAuthProvider();
      // let provider = new firebase.auth.GoogleAuthProvider();
      this.loading = true;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          axios
            .post(
              "http://foreclean.tk:8000/api/getAccessCode",
              JSON.stringify({
                name: user.displayName,
                phone: user.phoneNumber,
                email: user.email,
                uid: user.uid,
                source: 3
              })
            )
            .then(response => {
              console.log(response);
              if (response.data.success == true) {
                console.log(response);
                localStorage.setItem("access_token", response.data.token);
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
                mui.toast("Login Successfully!");
                this.$router.replace("service");
              } else {
                mui.toast("注册失败，请稍后再试");
              }
            })
            .catch(error => {
              this.loading = false;
              alert(error.response);
              console.log(error.response);
            });
          // ...
        })
        .catch((error) => {
          this.loading = false;
          alert(error);
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
  background-image: url("../assets/img_cap05-600x800.jpg");
  /* Full height */

  overflow: hidden;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.mui-input-row {
  margin: 15px 0;
  width: 100%;
  background: white;
  border-radius: 20px;
}
.mui-input-row i {
  color: black;
}
.mui-input-row input {
  color: black;
  width: 80% !important;
}

.mui-input-row label {
  width: 20%;
}
</style>
