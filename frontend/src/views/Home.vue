<template>
  <div class="container">
    <h1>Upload Your File</h1>

    <Upload @upload="setFile"></Upload>

    <Button label="Upload" @clickButton="submit"></Button>
  </div>
  <Modal v-if="modal" @closeModal="closeModal" :link-url="linkURL"></Modal>
</template>

<script>
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Upload from "@/components/Upload";

export default {
  name: "Home",
  components: { Upload, Button, Modal },
  data: () => ({
    file: null,
    modal: false,
    linkURL: null,
  }),

  created() {
    console.log("VUE_APP_BACKEND_URL ", process.env.VUE_APP_BACKEND_URL);
  },

  methods: {
    async submit() {
      if (!this.file) return;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${process.env.VUE_APP_BACKEND_URL}/upload`, requestOptions).then(async (res) => {
        const response = await res.json();
        const url = response.content?.url;
        this.linkURL = window.location.href + response.content?.key;

        this.uploadToS3(url);
      });
    },

    uploadToS3(url) {
      fetch(url, { body: this.files, mode: "cors", method: "PUT" }).then(() => {
        this.modal = true;
      });
    },

    closeModal(value) {
      this.modal = value;
    },

    setFile(value) {
      this.file = value;
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
</style>
