document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("input");
  const plas = document.getElementById("plas");
  const taskList = document.getElementById("task_list");
  const addTask = (evet) => {
    evet.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) {
      return;
    }
    const li = document.createElement("li");
    li.innerHTML = `
    <input type = "checkbox" class = "checkbox">
    <span>${taskText}</span>
    <div class = "task-buttons">
    <button class="edit-btn">
    <i class="fa-solid fa-pen"></i>
    </button>
    <button class = "delet-btn">
    <i class="fa-solid fa-trash"></i>
    </button>
    </div>
    `;
    const checkbox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      if (!checkbox.checkbox) {
        taskInput.value = li.querySelector("span").textContent;
        li.remove();
      }
    });

    li.querySelector(".delet-btn").addEventListener("click", () => {
      li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
  };
  plas.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });
});
