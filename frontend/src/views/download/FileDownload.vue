<template>
  <div></div>
</template>

<script>
export default {
  name: "FileDownload",
  created() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const fileId = this.$route?.params?.id;
    fetch(`${window.location.href}/upload/${fileId}`, requestOptions).then(async (res) => {
      const response = await res.json();
      const url = response.content?.url;

      console.log("encotrado o arquivo");
      this.downloadFromS3(url);
    });
  },

  methods: {
    downloadFromS3(url) {
      location.href = url;
      this.leave();
    },

    leave() {
      this.$route.push({ path: "/" });
    },
  },
};
</script>

<style scoped></style>
