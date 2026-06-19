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
/* ==================================================
   ЛАБОРАТОРНА 7: Події, Обробники, Делегування
   ================================================== */

// --- ЗАВДАННЯ 1.1: Обробник через HTML-атрибут ---
function inlineHandler() {
    alert("Спрацював обробник, призначений через атрибут onclick в HTML!");
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ЗАВДАННЯ 1.2: Обробник через властивість DOM ---
    let btnProp = document.getElementById("btn-prop");
    if (btnProp) {
        btnProp.onclick = function() {
            alert("Спрацював обробник через властивість елемента (element.onclick)!");
        };
    }

    // --- ЗАВДАННЯ 1.3: Кілька обробників через addEventListener ---
    let btnMulti = document.getElementById("btn-multi");
    if (btnMulti) {
        btnMulti.addEventListener("click", () => console.log("Перший обробник: Клік зафіксовано!"));
        btnMulti.addEventListener("click", () => alert("Другий обробник: Дивись консоль!"));
    }

    // --- ЗАВДАННЯ 1.4: Об'єкт-обробник та removeEventListener ---
    let btnObj = document.getElementById("btn-obj");
    let btnRemoveObj = document.getElementById("btn-remove-obj");

    // Створюємо об'єкт з обов'язковим методом handleEvent
    let myObjectHandler = {
        handleEvent(event) {
            alert(`Об'єкт обробив подію "${event.type}" на елементі <${event.currentTarget.tagName}>`);
        }
    };

    if (btnObj && btnRemoveObj) {
        // Призначаємо об'єкт обробником
        btnObj.addEventListener("click", myObjectHandler);

        // Видаляємо об'єкт-обробник при кліку на іншу кнопку
        btnRemoveObj.onclick = function() {
            btnObj.removeEventListener("click", myObjectHandler);
            alert("Об'єкт-обробник успішно видалено! Тепер перша кнопка не працюватиме.");
        };
    }

    // --- ЗАВДАННЯ 2.1: Делегування подій (Список) ---
    let ul = document.getElementById("flowers-list");
    if (ul) {
        ul.onclick = function(event) {
            // Перевіряємо, чи клік був саме по елементу <li> (event.target)
            if (event.target.tagName !== "LI") return;
            
            // Додаємо або забираємо клас для підсвічування
            event.target.classList.toggle("highlight");
        };
    }

    // --- ЗАВДАННЯ 2.2: Делегування подій (Меню з data-action) ---
    let menu = document.getElementById("action-menu");
    if (menu) {
        // Клас, який керує меню
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this); // прив'язуємо контекст
            }
            save() { alert("Дію ЗБЕРЕГТИ виконано!"); }
            load() { alert("Дію ЗАВАНТАЖИТИ виконано!"); }
            search() { alert("Дію ПОШУК виконано!"); }

            onClick(event) {
                // Отримуємо значення атрибута data-action (наприклад, "save")
                let action = event.target.dataset.action;
                if (action) {
                    this[action](); // Викликаємо метод з таким самим ім'ям
                }
            }
        }
        new Menu(menu);
    }

    // --- ЗАВДАННЯ 2.3: Прийом проєктування «Поведінка» (data-counter) ---
    // Вішаємо обробник на ВЕСЬ document (глобальне перехоплення події)
    document.addEventListener("click", function(event) {
        // Якщо у елемента, по якому клікнули, є атрибут data-counter...
        if (event.target.dataset.counter !== undefined) {
            // ...збільшуємо його вміст на 1
            event.target.innerHTML++;
        }
    });

});
/* ==================================================
   ЛАБОРАТОРНА 8: Події миші (mouseover, mouseout, D&D)
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ЗАВДАННЯ 1: mouseover та mouseout ---
    let tackleGrid = document.getElementById("tackle-grid");
    
    if (tackleGrid) {
        tackleGrid.onmouseover = function(event) {
            let target = event.target;
            let relatedTarget = event.relatedTarget;
            
            // Якщо ми навелися на елемент з класом tackle-item
            if (target.classList.contains("tackle-item")) {
                target.classList.add("hover-active");
                console.log(`Курсор зайшов на елемент з: ${relatedTarget ? relatedTarget.tagName : 'зовні'}`);
            }
        };

        tackleGrid.onmouseout = function(event) {
            let target = event.target;
            
            // Видаляємо стиль, коли курсор покидає елемент
            if (target.classList.contains("tackle-item")) {
                target.classList.remove("hover-active");
            }
        };
    }

    // --- ЗАВДАННЯ 2: Реалізація Drag-and-Drop ---
    // --- ЗАВДАННЯ 2: Реалізація Drag-and-Drop ---
    let dragContainer = document.getElementById("drag-container");
    let draggables = document.querySelectorAll(".draggable-item");

    if (dragContainer) {
        draggables.forEach(item => {
            item.onmousedown = function(event) {
                event.preventDefault();

                let containerRect = dragContainer.getBoundingClientRect();
                let itemRect = item.getBoundingClientRect();

                let shiftX = event.clientX - itemRect.left;
                let shiftY = event.clientY - itemRect.top;

                item.style.zIndex = 1000;
                item.style.position = "absolute";

                function moveAt(clientX, clientY) {
                    item.style.left = clientX - containerRect.left - shiftX + "px";
                    item.style.top = clientY - containerRect.top - shiftY + "px";
                }

                function onMouseMove(event) {
                    moveAt(event.clientX, event.clientY);
                }

                document.addEventListener("mousemove", onMouseMove);

                document.addEventListener("mouseup", function onMouseUp() {
                    document.removeEventListener("mousemove", onMouseMove);
                    item.style.zIndex = "";
                }, { once: true });
            };

            item.ondragstart = function() {
                return false;
            };
        });
    }
});