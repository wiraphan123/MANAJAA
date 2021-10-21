<template>
  <div class='container' align='center'>
    <img src="/employee.png" alt="" style="width: 30rem" />
  <div class="card">
    <div class="card-body">
      <template>
  <v-simple-table>
     <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">NO</th>
          <th class="text-left">Firstname</th>
          <th class="text-left">Lastname</th>
          <th class="text-left">Email</th>
          <th class='text-left'>User role</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in users"
          :key="index"
          @click="goToCheckIn(item)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.f_name }}</td>
          <td>{{ item.l_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.user_role }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.get_data();
  },
  methods: {
    get_data() {
      axios.get("http://localhost:8000/show").then(response => {
        this.users = response.data;
      });
    },
    goToCheckIn(item) {
      this.$router.push({
        path: "/checkin_checkout",
        query: { member_id: item.id }
      });
    }
  },
  data() {
    return {
      users: [
        {
          id: null,
          f_name: null,
          l_name: null,
          email: null,
          user_role: null
        }
      ]
    };
  }
};
</script>
