<template>
  <div class="buttonComponent" @click="clickButton">
    <label for="button">
      <a class="buttonLabel">{{ label }}</a>
    </label>
    <input id="button" type="button" />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      default: "",
      type: String,
    },
  },

  methods: {
    clickButton() {
      this.$emit("clickButton", true);
    },
  },
};
</script>

<style scoped>
.buttonComponent {
  margin: auto;
  width: 100%;
}

.buttonLabel {
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

.buttonLabel:hover {
  background-color: #2d9b33;
}

input {
  display: none;
}
</style>
