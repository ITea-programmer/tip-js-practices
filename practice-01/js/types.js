"use strict";

// 1. "8" + 2
const expr1 = "8" + 2;
console.log('1. "8" + 2 =', expr1, '| Тип:', typeof expr1);

// 2. "8" - 2
const expr2 = "8" - 2;
console.log('2. "8" - 2 =', expr2, '| Тип:', typeof expr2);

// 3. Number("8") + 2
const expr3 = Number("8") + 2;
console.log('3. Number("8") + 2 =', expr3, '| Тип:', typeof expr3);

// 4. "12" > "3"
const expr4 = "12" > "3";
console.log('4. "12" > "3" =', expr4, '| Тип:', typeof expr4);

// 5. 12 === "12"
const expr5 = 12 === "12";
console.log('5. 12 === "12" =', expr5, '| Тип:', typeof expr5);

// 6. Number("")
const expr6 = Number("");
console.log('6. Number("") =', expr6, '| Тип:', typeof expr6);

// 7. Number("text")
const expr7 = Number("text");
console.log('7. Number("text") =', expr7, '| Тип:', typeof expr7);

// 8. Boolean("false")
const expr8 = Boolean("false");
console.log('8. Boolean("false") =', expr8, '| Тип:', typeof expr8);

// 9. typeof null
const expr9 = typeof null;
console.log('9. typeof null =', expr9, '| Тип результата typeof:', typeof expr9);

// 10. typeof NaN
const expr10 = typeof NaN;
console.log('10. typeof NaN =', expr10, '| Тип результата typeof:', typeof expr10);