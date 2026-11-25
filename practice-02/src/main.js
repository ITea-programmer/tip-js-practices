import { demoTasks } from './data.js';
import { addTask, setTaskCompleted, renameTask, removeTask, getTaskStats } from './task-service.js';

console.log("--- Исходный массив ---");
console.log(demoTasks);

let currentTasks = demoTasks;

// Добавляем задачу
let result = addTask(currentTasks, 20, "Добавить проверку", "high");
if (result.ok) currentTasks = result.tasks;

// Меняем статус
result = setTaskCompleted(currentTasks, 4, true);
if (result.ok) currentTasks = result.tasks;

// Переименовываем
result = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (result.ok) currentTasks = result.tasks;

// Удаляем
result = removeTask(currentTasks, 7);
if (result.ok) currentTasks = result.tasks;

console.log("\n--- Итоговый массив ---");
console.log(currentTasks);
console.log("\n--- Итоговая статистика ---");
console.log(getTaskStats(currentTasks));

console.log("\n--- Проверка отказа (добавление существующего ID) ---");
console.log(addTask(currentTasks, 20, "Дубль"));