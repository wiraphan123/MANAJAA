<template>
  <div>
    <h1 class="font-weight-bold"> Check In Check Out </h1>
    <v-form ref="form">
      <v-container class="d-flex justify-content-between">
        <div class="d-flex flex-column w-50">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="user.f_name"
                label="First name"
                type="text"
                append
                readonly
                prepend-icon="mdi-account-circle"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="user.l_name"
                label="Last name"
                type="text"
                required
                readonly
                prepend-icon="mdi-account-circle"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="user.email"
                label="Email"
                type="email"
                required
                readonly
                prepend-icon="mdi-email"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="user.user_role"
                label="User role"
                type="text"
                required
                readonly
                prepend-icon="mdi-briefcase"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="date"
                label="Date & Time"
                type="text"
                required
                readonly
                prepend-icon="mdi-clock-outline"
              />
            </v-col>
          </v-row>

          <div class="d-flex ">
            <b-form-radio-group
              id="radio-group-1"
              v-model="selected"
              :options="items"
              name="radio-options"
            ></b-form-radio-group>
          </div>

          <v-btn
            class="text-white px-12 py-2 my-8 align-self-end"
            color="#04a5a0"
            @click="submit()"
            large
            align="right"
          >
            Send
          </v-btn>
        </div>
        <div class="w-75 d-flex justify-content-end">
            <img src="/checkin_checkout.jpeg" class="w-75 h-75" alt="">
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      const { member_id } = this.$route.query;
      if (!member_id) {
        this.$router.replace("/");
      }
      const res = await axios.get(`http://localhost:8000/view/${member_id}`);
      this.user = res.data[0];
    },

    async submit() {
      const date = `${this.date.getFullYear()}-${this.date.getMonth() +
        1}-${this.date.getDate()}`;

      const time = this.date.toString().split(" ")[4];

      try {
        await axios.post(`http://localhost:8000/${this.selected}`, {
          date: date,
          time: time,
          uid: this.user.id
        });

        await Swal.fire(
          `${
            this.selected === "check_in" ? "Check In" : "Check Out"
          } Successful`,
          "",
          "success"
        );

        this.$router.push("/");
      } catch (e) {
        Swal.fire(
          `${
            this.selected === "check_in" ? "Check In" : "Check Out"
          } unsucess; error ${e.message}`,
          "",
          "error"
        );
      }
    }
  },
  data() {
    return {
      user: {},
      date: new Date(),
      items: ["check_in", "check_out"],
      selected: "check_in"
    };
  }
};
</script>

<style></style>
