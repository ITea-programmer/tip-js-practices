"use strict";

// Данные варианта 6
const totalTasks = 18;
const completedTasks = 6;
const dailyLimit = 5;

// Проверка данных
if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks) || !Number.isInteger(dailyLimit)) {
    console.log("Ошибка: Все значения должны быть целыми числами.");
} else if (totalTasks < 0 || totalTasks > 1000 || completedTasks < 0 || completedTasks > totalTasks) {
    console.log("Ошибка: Некорректное количество задач.");
} else if (dailyLimit < 1 || dailyLimit > 1000) {
    console.log("Ошибка: Дневной лимит должен быть от 1 до 1000.");
} else {
    let remaining = totalTasks - completedTasks;
    let day = 0;

    if (remaining === 0) {
        console.log("Все задачи уже выполнены.");
        console.log("Потребуется дней: 0");
    } else {
        console.log(`Осталось задач: ${remaining}`);
        
        while (remaining > 0) {
            day += 1;
            let tasksToDo = Math.min(dailyLimit, remaining);
            remaining -= tasksToDo;
            
            console.log(`День ${day}: выполнено ${tasksToDo}, осталось ${remaining}`);
        }
        console.log(`Потребуется дней: ${day}`);
    }
}