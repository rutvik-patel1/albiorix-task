<template>
  <div class="home">
    <div class="container">
      <section class="section form-section">
        <h1 class="title">My Todo List</h1>
      </section>
      <section class="section filter-section">
        <todo-filter
          @filter-change="updateFilter"
          @search-change="updateSearch"
        ></todo-filter>
      </section>
      <section class="section list-section">
        <todo-list></todo-list>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTaskStore } from "@/store/task";
import TodoList from "@/components/TodoList.vue";
import TodoFilter from "@/components/TodoFilter.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TodoList,
    TodoFilter,
  },
  setup() {
    const taskStore = useTaskStore();

    const addTask = (task) => {
      taskStore.addTask(task);
    };

    const updateFilter = (filter) => {
      taskStore.setFilter(filter);
    };

    const updateSearch = (search) => {
      taskStore.setSearch(search);
    };

    return {
      addTask,
      updateFilter,
      updateSearch,
    };
  },
});
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #2c3e50;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.container {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section {
  padding: 1.5rem 1rem;
}

.form-section {
  background-color: #e9ecef;
  border-bottom: 1px solid #dee2e6;
}

.filter-section {
  background-color: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
}

.list-section {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .section {
    padding: 1rem;
  }
}
</style>
