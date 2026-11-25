export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  li.dataset.taskId = task.id;
  if (task.completed) li.classList.add("is-completed");

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("span");
  priority.className = `task-priority priority-${task.priority}`;
  const priorityMap = { low: "Низкий", medium: "Средний", high: "Высокий" };
  priority.textContent = priorityMap[task.priority];

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const btnToggle = document.createElement("button");
  btnToggle.type = "button";
  btnToggle.dataset.action = "toggle";
  btnToggle.setAttribute("aria-pressed", task.completed ? "true" : "false");
  btnToggle.innerHTML = '<span class="action-label">Выполнена</span>';

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.dataset.action = "delete";
  btnDelete.innerHTML = '<span class="action-label">Удалить</span>';

  actions.append(btnToggle, btnDelete);
  li.append(title, status, priority, actions);

  return li;
}

export function renderTaskList(listElement, tasks) {
  const elements = tasks.map(createTaskElement);
  listElement.replaceChildren(...elements);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  summaryElement.querySelector('[data-stat="total"]').textContent = total;
  summaryElement.querySelector('[data-stat="completed"]').textContent = completed;
  summaryElement.querySelector('[data-stat="pending"]').textContent = pending;
  summaryElement.querySelector('[data-stat="progress"]').textContent = progress.toFixed(1) + "%";
  summaryElement.querySelector('[data-stat="visible"]').textContent = visibleCount;
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0 && visibleCount === 0) {
    messageElement.textContent = "Список задач пуст.";
    messageElement.hidden = false;
  } else if (total > 0 && visibleCount === 0) {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  } else {
    messageElement.textContent = "";
    messageElement.hidden = true;
  }
}