import { defineStore } from "pinia";
import { FILTERS, filterTasks, searchTasks } from "@/utils/filters";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [
      {
        id: 1721925156773,
        title: "Lorem ipsum dolor sit",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis est consequatur voluptates recusandae sunt repellendus accusamus! Itaque, harum nostrum pariatur ex mollitia voluptas deleniti, et iusto, quisquam sint consequuntur at?\n",
        completed: false,
        dueDate: "2024-07-25",
      },
      {
        id: 1721925156774,
        title: "Debitis est consequatur voluptates",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis est consequatur voluptates recusandae sunt repellendus accusamus! Itaque, harum nostrum pariatur ex mollitia voluptas deleniti, et iusto, quisquam sint consequuntur at?\n",
        completed: true,
        dueDate: "2024-07-25",
      },
    ],
    filter: FILTERS.ALL,
    search: "",
  }),
  getters: {
    filteredTasks() {
      let filtered = filterTasks(this.tasks, this.filter);
      return searchTasks(filtered, this.search);
    },
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
  },
  actions: {
    addTask(task) {
      this.tasks.push({ ...task, id: Date.now() });
    },
    toggleTaskStatus(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask(taskId, newTitle, newDescription) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.title = newTitle;
        task.description = newDescription || task.description;
      }
    },
    setFilter(filter) {
      if (Object.values(FILTERS).includes(filter)) {
        this.filter = filter;
      } else {
        this.filter = FILTERS.ALL;
      }
    },
    setSearch(search) {
      this.search = search;
    },
    setTasks(tasks) {
      this.tasks = tasks;
    },
  },
});
