

<template >
  <v-app>
    <modal name="job_form" :width="900" height="auto" :clickToClose="false">
      <log-out></log-out>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Step 1</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Step 2</v-stepper-step>
        </v-stepper-header>

        <form>
          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="job" v-if="step==1">
                <v-text-field
                  v-model="job.jobName"
                  v-validate="'required'"
                  name="jobName"
                  id="jobName"
                  label="Job Name"
                  :class="{ 'is-invalid': errors.has('jobName') }"
                ></v-text-field>
              </div>
              <div
                v-if="errors.has('jobName')"
                class="invalid-feedback"
              >{{ errors.first('jobName') }}</div>

              <v-btn outlined color="success" @click.prevent="saveName()">Next</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="job" v-if="step==2">
                <image-upload v-if="imageupload"></image-upload>
              </div>

              <v-btn color="warning" @click.prevent="previous()">Previous</v-btn>
              <v-btn color="primary" @click.prevent="upload()">Submit</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </form>
      </v-stepper>
    </modal>
  </v-app>
</template>

    
<script>
import { mapActions, mapState } from "vuex";
import imageUpload from "../imageUpload/imageUpload";
import logout from "../logOut/logOut";

export default {
  name: "job-form",
  data() {
    return {
      step: 1,
      jobId: "",
      e1: 0,
      dragAndDropCapable: false,
      files: [],
      formdata: new FormData(),
      imageSource: [],
      imageData: [],
      submitted: false,
      ModalCheck: false,
      check: 0,
      creating: true,
      imageupload: false,
      job: {
        jobName: ""
      }
    };
  },
  mounted() {
    this.$modal.show("job_form");

    this.$root.$on("image", data => {
      new Promise((resolve, reject) => {
        data.forEach(element => {
          console.log("ele", element);
          this.formdata.append("images", element);
        });
        resolve(this.sendFile());
      });
    });
  },
  components: {
    "image-upload": imageUpload,
    "log-out": logout
  },
  computed: {
    ...mapState("job", ["submitting"])
  },
  methods: {
    ...mapActions("job", ["save_name", "uploadImage"]),
    saveName() {
      console.log("job", this.job);

      this.$validator.validate().then(valid => {
        if (valid) {
          this.step++;
          this.e1++;
          this.imageupload = true;
          if (!this.submitted) {
            this.save_name(this.job).then(data => {
              console.log("got it", data);
              this.jobId = data["id"];
              this.submitted = true;
            });
          }
        }
      });
    },
    upload() {
      this.$root.$emit("start");
    },
    sendFile() {
      this.uploadImage({ formData: this.formdata, id: this.jobId }).then((data) => {
        this.$router.go();
      });
    },
    hide() {
      this.$modal.hide("job_form");
    },
    previous() {
      this.e1--;
      this.step--;
    }
  }
};
</script>


<style scoped>
/* @import url("https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css"); */
.job {
  padding: 3%;
}

.image-form {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}

div.file-listing {
  display: inline-block;
  margin: auto;
}

#file-drag-drop {
  border: 1px solid black;
  height: 300px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  overflow: scroll;
}

.preview {
  width: 100px;
  height: 100px;
  margin: 0;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#map {
  width: 100%;
  height: 500px;
}

.Map__marker {
  background-color: red;
  height: 100px;
  width: 100px;
}
</style>





