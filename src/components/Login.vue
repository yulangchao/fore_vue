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

      <h1 id="title_wii">WiiCleaner</h1>

      <div class="mui-input-row">
        <label>
          <i class="fas fa-user-circle" style="font-size: 20px;"></i>
        </label>
        <input type="text" class="mui-input-clear" v-model="email" placeholder="Email">
      </div>
      <div class="mui-input-row">
        <label>
          <i class="fas fa-key" style="font-size: 20px;"></i>
        </label>
        <input type="password" class="mui-input-clear" v-model="password" placeholder="Password">
      </div>

      <button v-on:click="signIn" style="width:100%;color:#ff3c7b;background:transparent;border-color: #EB482F;margin:20px auto 20px auto " class="mui-btn mui-btn-blue">Login</button>
      <p style="margin-bottom: 20px;" @click="forgetPassword">
        <a style="color:#ff3f7b">Forget Password?</a>
      </p>
      <div class="mui-row or">
        <div class="mui-col-xs-5">
          ——————
        </div>
        <div class="mui-col-xs-2">
          <span class="or">OR</span>
        </div>
        <div class="mui-col-xs-5">
          ——————

        </div>
      </div>

      <button type="button" v-on:click="signInWithGoogle" style="width:100%;margin:30px 0px 30px 0px;background:#3B5998; border-color:#3B5998" class="mui-btn mui-btn-blue"><i style="margin-right:5px;" class="fab fa-facebook-square"></i>Facebook</button>
      <router-link to="/sign-up">
        <button type="button" style="width:100%;margin:0px 0px 30px 0px;background:#fd5c63 !important;color:white" class="mui-btn">Register</button>
      </router-link>
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
    created() {},
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
                                if (response.data.success == true) {
                                    localStorage.setItem(
                                        "access_token",
                                        response.data.token
                                    );
                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(response.data.user)
                                    );
                                    localStorage.setItem(
                                        "saved_cleaners",
                                        JSON.stringify(
                                            response.data.saved_cleaners
                                        )
                                    );
                                    mui.toast("Login Successfully!");
                                    this.$router.replace("service");
                                } else {
                                    mui.toast(
                                        "Login Failed! Please Contact Us!"
                                    );
                                }
                            })
                            .catch(error => {
                                this.loading = false;
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
                e => {
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
                            if (response.data.success == true) {
                                localStorage.setItem(
                                    "access_token",
                                    response.data.token
                                );
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(response.data.user)
                                );
                                localStorage.setItem(
                                    "saved_cleaners",
                                    JSON.stringify(response.data.saved_cleaners)
                                );
                                mui.toast("Login Successfully!");
                                this.$router.replace("service");
                            } else {
                                mui.toast("Login Failed, Please Try Again!");
                            }
                        })
                        .catch(error => {
                            this.loading = false;
                            alert(error.response);
                        });
                    // ...
                })
                .catch(error => {
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
    /* background-image: url("../assets/img_cap05-600x800.jpg"); */
    /* Full height */
    background: white;
    overflow: hidden;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.or {
    color: #999;
}
#title_wii {
    margin: 80px auto 40px auto;
    color: #ff3f7b;
}

.mui-input-row {
    margin: 15px 0;
    width: 100%;
    background: white;
}

.mui-input-row input {
    border-bottom: 1px solid #999;
    border-radius: 0px;
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
