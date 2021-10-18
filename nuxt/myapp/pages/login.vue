<template>
  <v-container class="px-12 pt-12 d-flex justify-content-between">
    <div>
      <h1 class="text-center mb-12">Welcome</h1>
      <img src="/login.png" alt="" style="width: 32rem" />
    </div>

    <div class="card" style="width: 28rem">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="card-body">
          <h5 class="text-uppercase font-weight-bold text-center">
            Member Login
          </h5>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  type="text"
                  required
                  autofocus
                  prepend-icon="mdi-email"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                  prepend-icon="mdi-lock"
                />
              </v-col>
            </v-row>

            <div class="d-flex">
              <div class="pr-5">
                <b-form-checkbox v-model="selected"
                  >Remember Me</b-form-checkbox
                >
              </div>
              <div class="px-5" style="border-left: 1px solid lightgrey">
                <NuxtLink
                  to="#"
                  style="color: #000;"
                  class="text-decoration-none"
                  >Forgot Your Password</NuxtLink
                >
              </div>
            </div>

            <v-btn class="my-12 py-6" color="info" @click="login()" block>
              Login
            </v-btn>

            <div class="d-flex justify-content-center">
              <span>Not a member?</span>
              <NuxtLink
                to="/register"
                class="text-decoration-none ml-4 text-success"
                >Create a account</NuxtLink
              >
            </div>
          </v-container>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  mounted() {
    //this.check_login();
  },
  computed: {
    ...mapState({
      data_array: state => state.login.data_array
    })
  },
  methods: {
    ...mapActions("login", ["set_state2"]),
    login() {
      if (this.email == null) {
        Swal.fire("Email is required", "", "error");
      } else if (this.password == null) {
        Swal.fire("Password is required", "", "error");
      } else {
        axios
          .post("http://localhost:8000/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.data.data_uid.email == this.email) {
              localStorage.setItem(
                "store",
                JSON.stringify(response.data.data_uid)
              );
              location.href = "/";
              //console.log(JSON.parse(localStorage.getItem('store')))
            } else if (response.data.data_uid == "who") {
              Swal.fire("Email or Password wrong", "", "error");
            }
          });
      }
    },
    check_login() {
      if (JSON.parse(localStorage.getItem("store")) != "") {
        location.href = "/";
      } else {
      }
    }
  },
  data() {
    return {
      valid: true,

      email: null,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],

      password: null,
      passwordRules: [v => !!v || "Password is required"],
      selected: false
    };
  }
};
</script>
