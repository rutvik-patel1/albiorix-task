<template>
  <div class="todo-filter">
    <select
      v-model="filter"
      @change="$emit('filter-change', $event.target.value)"
      class="filter-select"
    >
      <option :value="FILTERS.ALL">All Tasks</option>
      <option :value="FILTERS.COMPLETED">Completed Tasks</option>
      <option :value="FILTERS.PENDING">Pending Tasks</option>
    </select>
    <input
      v-model="searchQuery"
      :placeholder="`Search ${filter} tasks...`"
      class="search-input"
      @input="handleSearch"
    />
    <TodoForm></TodoForm>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { FILTERS } from "@/utils/filters";
import TodoForm from './TodoForm.vue'
export default {
  name: "TodoFilter",
  components: { TodoForm },
  emits: ["filter-change", "search-change"],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const filter = ref(FILTERS.ALL)

    const handleSearch = () => {
      if (searchQuery.value.length > 2 || searchQuery.value.length === 0) {
        emit("search-change", searchQuery.value);
      }
    };

    watch(searchQuery, (newValue, oldValue) => {
      if (newValue.length === 0 && oldValue.length > 0) {
        emit("search-change", "");
      }
    });

    return { searchQuery, handleSearch, FILTERS, filter };
  },
};
</script>

<style scoped>
.todo-filter {
  display: flex;
  justify-content: space-between;
}

.filter-select,
.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-select {
  margin-right: 10px;
}

.search-input {
  flex-grow: 1;
}
</style>
