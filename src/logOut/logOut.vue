<template>
  
    <v-toolbar :min-height="height" :flat="true" :dense="true">
           <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :flat="true" @click="log">LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    props:['title'],
    data(){
        return{
            height:"100px"
        }
    },
    methods:{
      ...mapActions("account", ["logout"]),
        log(){
          this.logout().then(status=>{
            if(status){
              this.$router.push('/login')
              this.flash().destroyAll()
            }else{
               this.$router.push('/')
            }
          })
            
        }
    }
};
</script>
<style scoped>
#logOut {
  float: right;
}
</style>
