<template>
  <div
    class="form-group file-upload"
    :class="hover"
    @dragover="dragOver"
    @drop="drop"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
  >
    <label for="file">
      <p>Drag and drop your file here or</p>
      <p><a class="btn">Choose File</a></p>
    </label>
    <input type="file" id="file" name="file" ref="file" @change="handleFileInput" />
  </div>
</template>

<script>
export default {
  name: "Upload",
  data: () => ({
    hover: "",
    file: null,
  }),

  methods: {
    handleFileInput() {
      this.file = this.$refs.file.files;
      this.$emit("upload", this.file);
    },

    dragOver(e) {
      e.preventDefault();
      this.dragEnter();
    },

    dragEnter() {
      this.hover = "hover";
    },

    dragLeave() {
      this.hover = "";
    },

    drop(e) {
      e.preventDefault();
      this.handleFileInput();
      this.dragLeave();
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.file-upload {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  color: #aaa;
}

.file-upload.hover {
  border-color: #4caf50;
  color: #4caf50;
}

.file-upload input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
