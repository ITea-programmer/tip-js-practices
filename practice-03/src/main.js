import { demoTasks, variantTasks } from './data.js';
import { setTaskCompleted, removeTask, findTaskById } from './task-service.js';
import { getVisibleTasks } from './task-selectors.js';
import { renderTaskList, renderSummary, renderEmptyState } from './task-view.js';

const urlParams = new URLSearchParams(window.location.search);
const isVariant = urlParams.get('dataset') === 'variant';
const initialTasks = isVariant && variantTasks.length > 0 ? variantTasks : demoTasks;

let currentTasks = initialTasks.map(t => ({ ...t }));
let currentFilter = "all";

const listElement = document.getElementById("task-list");
const summaryElement = document.getElementById("task-summary");
const emptyMessageElement = document.getElementById("empty-message");
const operationMessageElement = document.getElementById("operation-message");
const filterContainer = document.getElementById("task-filters");

function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);
  
  renderTaskList(listElement, visibleTasks);
  renderSummary(summaryElement, currentTasks, visibleTasks.length);
  renderEmptyState(emptyMessageElement, currentTasks.length, visibleTasks.length);

  const buttons = filterContainer.querySelectorAll("button");
  buttons.forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

// Восстановление фокуса после перерисовки (требуется для одной из проверок)
function restoreTaskFocus(id, action) {
  if (action === "toggle" || action === "delete") {
    const btn = listElement.querySelector(`[data-task-id="${id}"] button[data-action="${action}"]`);
    if (btn) {
      btn.focus();
      return;
    }
  }
  const activeFilter = filterContainer.querySelector(".is-active");
  if (activeFilter) activeFilter.focus();
}

listElement.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

   const rawId = card.dataset.taskId;
  const id = Number(rawId);
  
  if (!Number.isSafeInteger(id) || id <= 0) {
    operationMessageElement.textContent = "Ошибка: Некорректный ID";
    return; 
  }
   const action = button.dataset.action;

  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);
    if (!task) return;
    const result = setTaskCompleted(currentTasks, id, !task.completed);
    if (result.ok) {
      currentTasks = result.tasks;
      operationMessageElement.textContent = "";
      renderApp();
      restoreTaskFocus(id, action);
    } else {
      operationMessageElement.textContent = result.error;
    }
  } else if (action === "delete") {
    const result = removeTask(currentTasks, id);
    if (result.ok) {
      currentTasks = result.tasks;
      operationMessageElement.textContent = "";
      renderApp();
      restoreTaskFocus(id, action);
    } else {
      operationMessageElement.textContent = result.error;
    }
  }
});

filterContainer.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-filter]");
  if (!button || !filterContainer.contains(button)) return;

  const filter = button.dataset.filter;
  if (["all", "pending", "completed"].includes(filter)) {
    currentFilter = filter;
    operationMessageElement.textContent = "";
    renderApp();
  }
});

// Первый запуск
renderApp();