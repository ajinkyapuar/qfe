<template>
  <v-app>
    <v-layout wrap>
      <v-container grid-list-md>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit" xs6>
          <v-text-field
            v-model="user.firstName"
            v-validate="'required'"
            name="firstName"
            label="First Name"
            :class="{ 'is-invalid': submitted && errors.has('firstName') }"
          ></v-text-field>
          <div
            v-if="submitted && errors.has('firstName')"
            class="invalid-feedback"
          >{{ errors.first('firstName') }}</div>

          <v-text-field
            v-model="user.lastName"
            v-validate="'required'"
            name="lastName"
            label="Last Name"
            :class="{ 'is-invalid': submitted && errors.has('lastName') }"
          ></v-text-field>
          <div
            v-if="submitted && errors.has('lastName')"
            class="invalid-feedback"
          >{{ errors.first('lastName') }}</div>

          <v-text-field
            :type="'email'"
            v-model="user.email"
            v-validate="'required'"
            name="email"
            label="Email"
            :class="{ 'is-invalid': submitted && errors.has('email') }"
          ></v-text-field>
          <div
            v-if="submitted && errors.has('email')"
            class="invalid-feedback"
          >{{ errors.first('email') }}</div>
           <span v-if="errorStatus" class="invalid-feedback">{{errorMessage}}</span>

          <v-text-field
            v-model="user.username"
            v-validate="'required'"
            v-on:change="changeVal"
            name="username"
            label="Username"
            :class="{ 'is-invalid': submitted && errors.has('username') }"
          ></v-text-field>
          <div
            v-if="submitted && errors.has('username')"
            class="invalid-feedback"
          >{{ errors.first('username') }}</div>
          <span v-if="errorStatus" class="invalid-feedback">{{errorMessage}}</span>

          <v-text-field
            :type="'password'"
            v-model="user.password"
            v-validate="{ required: true, min: 6 }"
            name="password"
            label="Password"
            :class="{ 'is-invalid': submitted && errors.has('password') }"
          ></v-text-field>
          <div
            v-if="submitted && errors.has('password')"
            class="invalid-feedback"
          >{{ errors.first('password') }}</div>

          <v-btn :type="'submit'" color="success" large :disabled="status.registering">
            <v-icon dark right>check_circle</v-icon>Register
          </v-btn>
          <img
            v-show="status.registering"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <router-link to="/login" class="link">
            <v-btn color="error" class="ma-2" large>
              <v-icon class="ma-2" dark left>remove_circle</v-icon>Cancel
            </v-btn>
          </router-link>
        </form>
        <flash-message></flash-message>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      },
      submitted: false,
      errorMessage: "",
      errorStatus: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      this.submitted = true;
      this.$validator
        .validate()
        .then(valid => {
          if (valid) {
            this.register(this.user)
              .then(data => {
               
                this.$router.push('/login')
              })
              .catch(e => {
                this.errorMessage = e;
                this.errorStatus = true;
              });
          }
        })
        .catch(e => {
          // console.log(e);
        
        });
    },
    changeVal() {
      this.errorStatus = false;
    }
  }
};
</script>
<style>
@import "../public/css/vue-flash-message.min.css";
.flash__message.warning {
  color: #8a6d3b !important;
  background-color: #fcf8e3 !important;
  border-color: #faebcc !important;
  width: 50% !important;
}

.link {
  text-decoration: none;
}
</style>
