/* ==================================================
   ЗАВДАННЯ 1: Власні функції, змінні, умовні розгалуження
   ================================================== */

// 1. Функція «Діалог з користувачем» (змінні, if/else, for)
function userDialog() {
    let countStr = prompt("Скільки квіток ви хочете додати в уявний букет? (Введіть число)", "3");
    let count = Number(countStr); // Перетворення рядка в число

    if (!isNaN(count) && count > 0) {
        for (let i = 1; i <= count; i++) {
            console.log("Додано квітку №" + i);
        }
        alert("Букет зібрано! Деталі в консолі розробника (F12).");
    } else {
        alert("Ви ввели некоректне число!");
    }
}

// 2. Функція виводу інформації про розробника (з параметром за замовчуванням)
function devInfo(lastName, firstName, position = "Студент-розробник") {
    console.log(`=== Інформація про автора ===`);
    console.log(`Розробник: ${lastName} ${firstName}`);
    console.log(`Посада: ${position}`);
    console.log(`=============================`);
}

// 3. Функція порівняння двох рядків
function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert(`Більший рядок: "${str1}" (Довжина: ${str1.length})`);
    } else if (str2.length > str1.length) {
        alert(`Більший рядок: "${str2}" (Довжина: ${str2.length})`);
    } else {
        alert("Рядки мають однакову довжину.");
    }
}

// 4. Зміна фону сторінки на 30 секунд (робота з об'єктом document)
function changeBackgroundFor30Seconds() {
    let originalColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#e8f8f5"; // М'ятний відтінок
    
    setTimeout(() => {
        document.body.style.backgroundColor = originalColor; // Повертаємо старий колір
    }, 30000); // 30000 мілісекунд = 30 секунд
}

/* ==================================================
   ЗАВДАННЯ 2: Робота з DOM та BOM
   ================================================== */

// Виконуємо код тільки після того, як HTML повністю завантажиться
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Виклики функцій з першого завдання ---
    devInfo("Бєляєв", "Родіон"); // Параметр 'посада' підставиться за замовчуванням
    compareStrings("Короткий текст", "Це значно довший текст для перевірки");
    userDialog();
    changeBackgroundFor30Seconds();

    // --- BOM: location ---
    let redirectBtn = document.getElementById("redirect-btn");
    redirectBtn.onclick = function() {
        location.href = "catalog.html"; // Перенаправлення
    };

    // --- DOM: Пошук елементів ---
    let jsHeader = document.getElementById("js-title");
    let paragraphs = document.querySelectorAll(".js-para");

    // --- DOM: Властивості вузлів ---
    console.log("innerHTML заголовка:", jsHeader.innerHTML);
    console.log("outerHTML заголовка:", jsHeader.outerHTML);
    console.log("textContent першого абзацу:", paragraphs[0].textContent);
    console.log("nodeValue/data текстового вузла:", paragraphs[0].firstChild.data);

    // --- DOM: Модифікація та Вставка (append, prepend, after) ---
    // Створюємо нові елементи
    let newDiv = document.createElement("div");
    let newText = document.createTextNode("Цей вузол з текстом повністю згенеровано через JavaScript. ");
    
    newDiv.append(newText); // Додаємо текстовий вузол у div (node.append)
    newDiv.style.color = "blue";
    
    jsHeader.after(newDiv); // Вставляємо новий div ПІСЛЯ заголовка (node.after)
    paragraphs[0].prepend("[JS ПРЕФІКС] "); // Додаємо текст НА ПОЧАТОК абзацу (node.prepend)

    // --- DOM: Заміна та Видалення (replaceWith, remove) ---
    let oldBox = document.getElementById("replace-box");
    let replacement = document.createElement("span");
    replacement.textContent = "Я новий елемент, який замінив старий!";
    replacement.style.fontWeight = "bold";
    replacement.style.color = "green";
    
    if (oldBox) oldBox.replaceWith(replacement); // Заміна вузла
    
    let boxToRemove = document.getElementById("remove-box");
    if (boxToRemove) boxToRemove.remove(); // Видалення вузла
});