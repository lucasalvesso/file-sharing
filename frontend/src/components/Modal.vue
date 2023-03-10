<template>
  <div class="modal" :style="modalOpen ? 'display: block' : ''">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <h4 class="close">Your upload has finshed successfully!</h4>
      <p>It's link URL is</p>
      <input type="text" :value="linkUrl" />

      <div class="modal-actions">
        <Button label="Close" @click="closeModal"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Modal",
  components: { Button },

  props: {
    title: {
      default: "",
      type: String,
    },
    linkUrl: {
      default: "",
      type: String,
    },
  },
  data: () => ({
    modalOpen: false,
  }),

  mounted() {
    this.modalOpen = true;
  },

  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
  },
};
</script>

<style scoped>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  margin-top: 100px;
  width: 60%;
}

.modal-actions {
  margin-top: 40px;
}

input {
  width: 300px;
  height: 25px;
}
</style>
