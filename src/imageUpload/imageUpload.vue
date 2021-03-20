<template>
  <div id="file-drag-drop" ref="fileform">
    <div v-for="(file, key) in files" class="file-listing" :key="key">
      <img class="preview img-responsive img-thumbnail" v-bind:ref="'preview'+parseInt( key )" />
      {{ file.name }}
      <div class="remove-container">
        <a class="remove" v-on:click="removeFile( key )">Remove</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      files: []
    };
  },
  mounted() {
    this.dragAndDrop();
    this.$root.$on('start',()=>{
      console.log("workingup",this.files)
      this.$root.$emit("image", this.files);
    })
  },
  methods: {
    dragAndDrop() {
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if (this.dragAndDropCapable) {
        [
          "drag",
          "dragstart",
          "dragend",
          "dragover",
          "dragenter",
          "dragleave",
          "drop"
        ].forEach(
          function(evt) {
            this.$refs.fileform.addEventListener(
              evt,
              function(e) {
                e.preventDefault();
                e.stopPropagation();
              }.bind(this),
              false
            );
          }.bind(this)
        );

        this.$refs.fileform.addEventListener(
          "drop",
          function(e) {
            // this.$root.$emit("image", e.dataTransfer.files[0]);
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              this.files.push(e.dataTransfer.files[i]);
              this.getImagePreviews();
            }
          }.bind(this)
        );
      }
    },
    determineDragAndDropCapable() {
      var div = document.createElement("DIV");

      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.$refs["preview" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );

          reader.readAsDataURL(this.files[i]);
        } else {
          this.$nextTick(function() {
            this.$refs["preview" + parseInt(i)][0].src = "/images/file.png";
          });
        }
      }
    },
    removeFile(key) {
      console.log("files",this.files)
      this.files.splice(key, 1);
      this.getImagePreviews()
    }
  }
};
</script>

<style scoped>
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
</style>