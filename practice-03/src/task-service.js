// Задание 2: createTask
export function createTask(id, title, priority = "medium") {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "ID должен быть положительным целым числом" };
    }
    if (typeof title !== "string") {
        return { ok: false, error: "Название должно быть строкой" };
    }
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0 || trimmedTitle.length > 100) {
        return { ok: false, error: "Название должно быть от 1 до 100 символов" };
    }
    if (!["low", "medium", "high"].includes(priority)) {
        return { ok: false, error: "Некорректный приоритет" };
    }
    
    return {
        ok: true,
        task: { id, title: trimmedTitle, completed: false, priority }
    };
}

// Задание 3: Чтение списка
export function findTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}

export function getPendingTasks(tasks) {
    return tasks.filter(task => task.completed === false);
}

export function getTaskTitles(tasks) {
    return tasks.map(task => task.title);
}

export function getTaskStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed === true).length;
    const pending = total - completed;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, pending, progress };
}

// Задание 4: Изменение данных (без мутации)
export function addTask(tasks, id, title, priority = "medium") {
    const result = createTask(id, title, priority);
    if (!result.ok) return result;
    if (tasks.some(t => t.id === id)) {
        return { ok: false, error: "Задача с таким ID уже существует" };
    }
    return { ok: true, tasks: [...tasks, result.task] };
}

export function setTaskCompleted(tasks, id, completed) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный ID" };
    }
    if (typeof completed !== "boolean") {
        return { ok: false, error: "Статус должен быть логическим значением" };
    }
    const task = findTaskById(tasks, id);
    if (!task) return { ok: false, error: "Задача не найдена" };
    
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed } : t);
    return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный ID" };
    }
    if (typeof title !== "string") {
        return { ok: false, error: "Название должно быть строкой" };
    }
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0 || trimmedTitle.length > 100) {
        return { ok: false, error: "Название должно быть от 1 до 100 символов" };
    }
    const task = findTaskById(tasks, id);
    if (!task) return { ok: false, error: "Задача не найдена" };
    
    const newTasks = tasks.map(t => t.id === id ? { ...t, title: trimmedTitle } : t);
    return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return { ok: false, error: "Некорректный ID" };
    }
    const taskExists = tasks.some(t => t.id === id);
    if (!taskExists) return { ok: false, error: "Задача не найдена" };
    
    const newTasks = tasks.filter(t => t.id !== id);
    return { ok: true, tasks: newTasks };
}