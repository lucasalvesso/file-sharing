<template>
  <div class="container">
    <h1>Upload Your File</h1>
    <div
      class="form-group file-upload"
      :class="hover"
      @dragover="dragOver"
      @drop="drop"
      @dragenter="dragEnter"
      @dragleave="dragLeave"
    >
      <label for="file"
        ><p>Drag and drop your file here or</p>
        <p><a class="btn">Choose File</a></p></label
      >
      <input
        type="file"
        id="file"
        name="file"
        ref="file"
        @change="handleFileInput"
      />
    </div>

    <div class="submitButton">
      <label for="submit"><a class="btn">Upload</a></label>
      <input id="submit" type="button" @click="submit" />
    </div>
  </div>
</template>

<script>

export default {
  name: "Upload",

  data: () => ({
    hover: "",
    files: null,
  }),

  methods: {
    handleFileInput() {
      this.files = this.$refs.file.files;
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

    async submit() {
      console.log(this.files);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:8005/upload", requestOptions).then( async (res) => {
        const response = await res.json();
        const url = response.content?.url;

        console.log("enviando para o s3");
        this.uploadToS3(url);
      });
    },

    uploadToS3(url) {
      fetch(url, { body: this.files, mode: "cors", method: "PUT" }).then(() => {
        console.log("enviado com sucesso");
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
}

input[type="file"],
input[type="button"] {
  display: none;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  background-color: #3e8e41;
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

.submitButton {
  margin: auto;
  width: 100%;
}
</style>
