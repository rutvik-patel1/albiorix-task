<template>
  <div class="task-details">
    <div v-if="task" class="task-card">
      <div class="task-header">
        <span class="task-id">Task ID: {{ task.id }}</span>
        <h1 class="task-title">{{ task.title }}</h1>
        <div class="task-meta">
          <div>
            {{ task.completed ? "Completed" : "Pending" }} <br/>
          </div>
          <div v-if="task.dueDate" class="task-due-date">
            Due Date: {{ task.dueDate }}
          </div>
        </div>
      </div>
      <div class="task-body">
        <p class="task-description">
          {{ task.description || "No description !" }}
        </p>
      </div>
    </div>
    <p v-else class="task-not-found">Task not found</p>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/store/task";

export default {
  name: "TaskDetails",
  setup() {
    const route = useRoute();
    const taskStore = useTaskStore();
    const task = ref(null);

    onMounted(() => {
      const taskId = parseInt(route.params.taskId);
      task.value = taskStore.getTaskById(taskId);

      if (!task.value) {
        console.log("Task not found");
      }
    });

    return {
      task,
    };
  },
};
</script>

<style scoped>
.task-details {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

.task-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-header {
  background-color: #f0f0f0;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.task-id {
  font-size: 0.8rem;
  color: #666;
  display: block;
  margin-bottom: 0.5rem;
}

.task-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.task-body {
  padding: 1rem;
}

.task-description {
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  justify-content:space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-top: 10px;
}

.task-due-date {
  color: #666;
}

.task-not-found {
  background-color: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}
</style>
