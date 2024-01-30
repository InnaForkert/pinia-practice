<script lang="ts" setup>
import { useTaskStore } from "../stores/TaskStore";
import { ref } from "vue";

const taskStore = useTaskStore();

const newTask = ref<string>("");

function handleSubmit() {
 if (!newTask.value) {
  return;
 }

 taskStore.addTask({
  id: Math.random(),
  title: newTask.value,
  isFav: false,
 });
 newTask.value = "";
}
</script>

<template>
 <form @submit.prevent="handleSubmit">
  <input type="text" placeholder="I need to..." v-model="newTask" required />
  <button>Add</button>
 </form>
</template>
