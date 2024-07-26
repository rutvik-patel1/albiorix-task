<template>
  <div class="todo-list">
    <div>
      <h3>Tasks ({{ taskList.length }})</h3>
    </div>
    <div v-if="taskList.length == 0">No Task Found!</div>
    <draggable item-key="id" @end="onDragEnd">
      <div v-for="element in taskList" :key="element.name">
        <div class="todo-item">
          <div>
            <input
              type="checkbox"
              :checked="element.completed"
              @change="toggleStatus(element.id)"
            />
            <span
              v-if="!element.editing"
              @dblclick="startEditing(element)"
              :class="{ completed: element.completed }"
              class="todo-title"
            >
              {{ element.title }}
            </span>
            <input
              v-else
              v-model="element.editTitle"
              @blur="finishEditing(element)"
              @keyup.enter="finishEditing(element)"
              class="edit-input"
            />
          </div>
          <div>
            <span v-if="element.dueDate" class="due-date">
              Due: {{ formatDate(element.dueDate) }}
            </span>

            <router-link
              :to="{ name: 'TaskDetails', params: { taskId: element.id } }"
              class="details-link"
            >
              View
            </router-link>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { computed } from "vue";
import { useTaskStore } from "@/store/task";
import { formatDate } from "@/utils/helper.js";
export default {
  name: "TodoList",
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const taskStore = useTaskStore();
    const taskList = computed({
      get: () => taskStore.filteredTasks,
      set: (value) => taskStore.setTasks(value),
    });

    const toggleStatus = (id) => {
      taskStore.toggleTaskStatus(id);
    };

    const startEditing = (task) => {
      task.editing = true;
      task.editTitle = task.title;
    };

    const finishEditing = (task) => {
      if (task.editTitle.trim() && task.editTitle !== task.title) {
        taskStore.editTask(task.id, task.editTitle);
      }
      task.editing = false;
    };

    const onDragEnd = () => {
      taskStore.setTasks(taskList.value);
    };

    return {
      taskList,
      toggleStatus,
      startEditing,
      finishEditing,
      onDragEnd,
      formatDate,
    };
  },
};
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .todo-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.todo-item:hover {
  background-color: #e7e7e7;
}

.todo-title {
  font-weight: 600;
  margin-left: 10px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.edit-input {
  flex-grow: 1;
  margin: 0 10px;
  padding: 5px;
}

.due-date {
  margin-left: auto;
  font-size: 0.9em;
  color: #666;
}

.details-link {
  margin-left: 10px;
  color: grey;
  text-decoration: none;
  float: right;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
