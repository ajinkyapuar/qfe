<template>
  <v-app row>
    <v-container>
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="username"
          name="username"
          :class="{ 'is-invalid': submitted && !username }"
          label="Username"
        ></v-text-field>
        <div v-show="submitted && username==''" class="invalid-feedback">Username is required</div>

        <v-text-field
          :type="'password'"
          v-model="password"
          name="password"
          label="Password"
          :class="{ 'is-invalid': submitted && !password }"
        ></v-text-field>
        <div v-show="submitted && password==''" class="invalid-feedback">Password is required</div>

        <v-btn color="primary" :type="'submit'" :disabled="status.loggingIn">Login</v-btn>
        <img
          v-show="status.loggingIn"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        
          <router-link class="link" to="/register"><v-btn color="success">Register </v-btn></router-link>

        <span>
          <v-btn  ref="resend" v-on:click="reMail()" v-if="!this.resend" color="yellow" >Resend Mail</v-btn>
        </span>
      </form>

      <flash-message></flash-message>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      date: new Date(),
      submitted: false,
      resend: true,
      user_id: null,
      user_email: null
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["login", "logout", "resendMail"]),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password, date } = this;
      if (username && password) {
        this.login({ username, password, date }).then(user => {
          // console.log("login user",user)
          if(!user){
             this.flashError("Please register first !!");
          }
        
          this.user_id = user._id;
          this.user_email = user.email;
          // this.resend = show;
        }).catch(e=>{
          // console.log("error",e)
          this.flashError(e);
        });
      }
    },
    reMail() {
      // console.log("resend data", this.user_id, this.user_email);
      let data = { id: this.user_id, email: this.user_email };
      this.resendMail(data);
    }
  }
};
</script>
<style>
@import "../public/css/vue-flash-message.min.css";
.flash__message.error {
  color: red !important;
  background-color: #f2dede !important;
  border-color: #ebccd1 !important;
  width: 50% !important;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
