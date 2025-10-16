document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("input");
  const plas = document.getElementById("plas");
  const taskList = document.getElementById("task_list");

  const addTask = (text, completed = false) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) {
      taskInput.style.border = "2px solid red";

      setTimeout(() => {
        taskInput.style.border = "none";
      }, 1000);
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = now.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const li = document.createElement("li");
    li.innerHTML = `
     <div class="task-main">
      <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
      <span>${taskText}</span>
      </div>
      <div class="task-buttons">
       <small class="task-time">${dateString} | ${timeString}</small>
       <div class = "task-buttons">
       <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
       <button class="delet-btn"><i class="fa-solid fa-trash"></i></button>
       </div>
      </div>
    `;

    const checkbox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");

    if (completed) {
      li.classList.add("completed");
      editBtn.disabled = true;
      editBtn.style.pointerEvents = "none";
    }

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      li.classList.toggle("completed", isChecked);
      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? "0.5" : "1";
      editBtn.style.pointerEvents = isChecked ? "none" : "auto";
    });

    editBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
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

  plas.addEventListener("click", () => {
    addTask();
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
});
