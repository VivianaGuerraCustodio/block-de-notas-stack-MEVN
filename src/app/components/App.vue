<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    v-model="task.title"
                    type="text"
                    class="form-control"
                    placeholder="inserta una nueva tarea"
                  />
                </div>
                <div class="form-group pt-2">
                  <textarea
                    v-model="task.description"
                    placeholder="insertar una descripcion"
                    class="form-control"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <div class="d-grid gap-2 pt-2">
                    <button class="btn btn-primary">Send</button>
                  </div>
                </template>
                <template v-else>
                  <div class="d-grid gap-2 pt-2">
                    <button class="btn btn-primary">Update</button>
                  </div>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, id) of tasks" :key="id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteTask(task._id)">
                    Delete
                  </button>
                  <button class="btn bnt-secondary" @click="editTask(task._id)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
class Task {
  constructor(title, description) {
    (this.title = title), (this.description = description);
  }
}
export default {
  data() {
    return {
      edit: false,
      taskToEdit: "",
      task: new Task(),
      tasks: [],
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    getTask() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => (this.tasks = data));
    },
    sendTask() {
      if (this.edit === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => this.getTask());
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => this.getTask(), (this.edit = false));
      }

      this.task = new Task();
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => this.getTask());
    },
    editTask(id) {
      fetch("/api/tasks/" + id)
        .then((res) => res.json())
        .then(
          (data) => (
            (this.task = new Task(data.title, data.description)),
            (this.edit = true),
            (this.taskToEdit = data._id)
          )
        );
    },
  },
};
</script>