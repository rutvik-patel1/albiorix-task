<template>
  <div>
    <button @click="showDialog = true" class="open-dialog-btn">Add Task</button>

    <Dialog v-model:visible="showDialog">
      <h2 class="text-center">Add Task</h2>
      <form @submit.prevent="submitTask" class="todo-form">
        <div class="form-group">
          <label for="taskTitle">Task Title*</label>
          <input
            id="taskTitle"
            v-model="newTask"
            placeholder="Enter a new task"
            required
            class="todo-input"
          />
        </div>
        <div class="form-group">
          <label for="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            v-model="description"
            placeholder="Enter description"
            class="todo-description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="taskDueDate">Due Date</label>
          <input
            id="taskDueDate"
            v-model="dueDate"
            type="date"
            class="date-input"
          />
        </div>
        <button type="submit" class="submit-btn">Add Task</button>
      </form>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Dialog from "./Dialog.vue";
import { useTaskStore } from "@/store/task";

export default {
  name: "TodoForm",
  components: { Dialog },
  setup() {
    const newTask = ref("");
    const description = ref("");
    const dueDate = ref("");
    const showDialog = ref(false);
    const taskStore = useTaskStore();

    const addTask = (task) => {
      taskStore.addTask(task);
    };

    const submitTask = () => {
      if (newTask.value.trim()) {
        addTask({
          title: newTask.value,
          description: description.value,
          completed: false,
          dueDate: dueDate.value || null,
        });
        newTask.value = "";
        description.value = "";
        dueDate.value = "";
        showDialog.value = false;
      }
    };

    return { newTask, description, dueDate, showDialog, submitTask };
  },
};
</script>

<style scoped>
.open-dialog-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.open-dialog-btn:hover {
  background-color: #45a049;
}

.todo-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

.todo-input,
.todo-description,
.date-input,
.submit-btn {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, Helvetica, sans-serif;
}

.todo-description {
  height: 100px;
  resize: vertical;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  padding: 10px 20px;
}

.submit-btn:hover {
  background-color: #45a049;
}
.text-center {
  text-align: center;
}
</style>
