<template>
    <div v-if="isVisible" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <slot></slot>
        <button @click="closeDialog" class="close-btn">X</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "DialogView",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const isVisible = ref(props.visible);
  
      const closeDialog = () => {
        isVisible.value = false;
        emit("update:visible", false);
      };
  
      return { isVisible, closeDialog };
    },
    watch: {
      visible(newVal) {
        this.isVisible = newVal;
      },
    },
  };
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    min-width: 400px;
  }
  
  .close-btn {
    position: absolute;
    top: 7px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #ff0000;
    font-weight: 600;
  }
  </style>