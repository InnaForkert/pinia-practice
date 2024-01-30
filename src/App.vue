<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const filter = ref("all");

const { tasks, loading, favs, favCount, totalCount, name } =
 storeToRefs(taskStore);

onMounted(() => {
 taskStore.getTasks();
});
</script>

<template>
 <main>
  <header>
   <img src="./assets/logo.png" alt="Pinia logo - a smiling pineapple" />
   <h1>{{ name }}</h1>
  </header>

  <div class="new-task-form">
   <TaskForm />
  </div>

  <nav class="filter">
   <button @click="filter = 'all'">All tasks</button>
   <button @click="filter = 'fav'">Fav tasks</button>
  </nav>

  <div class="loading" v-if="loading">Loading tasks...</div>

  <div class="task-list" v-if="filter === 'all'">
   <p>all tasks</p>
   <p>
    You have {{ totalCount }} task{{
     totalCount.toString().endsWith("1") ? "" : "s"
    }}
    to do
   </p>
   <div v-for="task in tasks" :key="task.id">
    <TaskDetails :task="task" />
   </div>
  </div>
  <div class="task-list" v-else>
   <p>fav tasks</p>
   <p>
    You have {{ favCount }} fav{{
     favCount.toString().endsWith("1") ? "" : "s"
    }}
    to do
   </p>
   <div v-for="task in favs" :key="task.id">
    <TaskDetails :task="task" />
   </div>
  </div>

  <button @click="taskStore.$reset">reset</button>
 </main>
</template>

<style lang="css" scoped></style>
