import { defineStore } from "pinia";
import Task from "../types/Task";

export const useTaskStore = defineStore("taskStore", {
 state: () => ({
  tasks: [] as Task[],
  name: "Pinia" as string,
  loading: false,
 }),
 getters: {
  favs(state): Task[] {
   return state.tasks.filter((el: Task) => el.isFav);
  },
  favCount(state): number {
   return state.tasks.reduce((acc, el) => (el.isFav ? acc + 1 : acc), 0);
  },
  totalCount: (state) => state.tasks.length,
 },
 actions: {
  async getTasks() {
   this.loading = true;
   try {
    const response = await fetch("http://localhost:3000/tasks");
    const data: Task[] = await response.json();

    setTimeout(() => {
     this.tasks = data;
     this.loading = false;
    }, 500);
   } catch (e) {
    console.log(e);
   }
  },
  async addTask(task: Task) {
   this.tasks.push(task);
   try {
    await fetch("http://localhost:3000/tasks", {
     method: "POST",
     body: JSON.stringify(task),
     headers: { "Content-Type": "application/json" },
    });
   } catch (e) {
    console.log(e);
   }
  },
  async deleteTask(id: number) {
   this.tasks = this.tasks.filter((el: Task) => el.id !== id);

   try {
    await fetch(`http://localhost:3000/tasks/${id}/`, {
     method: "DELETE",
    });
   } catch (e) {
    console.log(e);
   }
  },
  async toggleFav(id: number) {
   const task = this.tasks.find((el: Task) => el.id === id);
   if (task) {
    task.isFav = !task?.isFav;

    try {
     await fetch(`http://localhost:3000/tasks/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ isFav: task.isFav }),
     });
    } catch (e) {
     console.log(e);
    }
   }
  },
 },
});
