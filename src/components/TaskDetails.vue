<script lang="ts" setup>
import { PropType, defineProps } from "vue";
import Task from "../types/Task";
import { useTaskStore } from "../stores/TaskStore";

const props = defineProps({
 task: {
  required: true,
  type: Object as PropType<Task>,
 },
});

const taskStore = useTaskStore();
</script>

<template>
 <div class="task">
  <h3>{{ props.task.title }}</h3>
  <div class="icon">
   <i class="material-icons" @click="taskStore.deleteTask(props.task.id)"
    >delete</i
   >
   <i
    class="material-icons"
    @click="taskStore.toggleFav(props.task.id)"
    :class="{ active: props.task.isFav }"
    >favorite</i
   >
  </div>
 </div>
</template>

<style lang="css" scoped></style>
