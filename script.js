function userDialog() {
    let countStr = prompt("Скільки квіток ви хочете додати до уявного букета?", "3");
    let count = Number(countStr);

    if (!isNaN(count) && count > 0) {
        for (let i = 1; i <= count; i++) {
            console.log("До букета додано квітку №" + i);
        }

        alert("Ваш уявний букет зібрано! Деталі можна переглянути в консолі розробника.");
    } else {
        alert("Ви ввели некоректну кількість квітів.");
    }
}

function devInfo(lastName, firstName, position = "Розробник сайту Floria") {
    console.log("=== Інформація про автора сайту ===");
    console.log(`Розробник: ${lastName} ${firstName}`);
    console.log(`Посада: ${position}`);
    console.log("===================================");
}

function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert(`Довший опис: "${str1}" (довжина: ${str1.length})`);
    } else if (str2.length > str1.length) {
        alert(`Довший опис: "${str2}" (довжина: ${str2.length})`);
    } else {
        alert("Описи мають однакову довжину.");
    }
}

function changeBackgroundFor30Seconds() {
    let originalColor = document.body.style.backgroundColor;

    document.body.style.backgroundColor = "#e8f8f5";

    setTimeout(() => {
        document.body.style.backgroundColor = originalColor;
    }, 30000);
}

document.addEventListener("DOMContentLoaded", () => {
    devInfo("Бєляєв", "Родіон", "Розробник сайту Floria");

    compareStrings(
        "Букет троянд",
        "Весняна композиція з тюльпанів та півоній"
    );

    userDialog();
    changeBackgroundFor30Seconds();

    let redirectBtn = document.getElementById("redirect-btn");

    if (redirectBtn) {
        redirectBtn.onclick = function() {
            location.href = "catalog.html";
        };
    }

    let jsHeader = document.getElementById("js-title");
    let paragraphs = document.querySelectorAll(".js-para");

    if (jsHeader && paragraphs.length > 0) {
        console.log("innerHTML заголовка:", jsHeader.innerHTML);
        console.log("outerHTML заголовка:", jsHeader.outerHTML);
        console.log("textContent першого абзацу:", paragraphs[0].textContent);

        if (paragraphs[0].firstChild) {
            console.log("nodeValue/data текстового вузла:", paragraphs[0].firstChild.data);
        }

        let newDiv = document.createElement("div");
        let newText = document.createTextNode(
            "Сьогодні флористи Floria підготували для вас особливі сезонні композиції. "
        );

        newDiv.append(newText);
        newDiv.style.color = "blue";
        newDiv.style.marginTop = "10px";
        newDiv.style.fontWeight = "bold";

        jsHeader.after(newDiv);

        paragraphs[0].prepend("🌸 Рекомендація флориста: ");
    }

    let oldBox = document.getElementById("replace-box");

    if (oldBox) {
        let replacement = document.createElement("span");

        replacement.textContent = "Акція тижня: безкоштовна листівка до кожного букета!";
        replacement.style.fontWeight = "bold";
        replacement.style.color = "green";

        oldBox.replaceWith(replacement);
    }

    let boxToRemove = document.getElementById("remove-box");

    if (boxToRemove) {
        boxToRemove.remove();
    }
});

function inlineHandler() {
    alert("Наш флорист допоможе вам підібрати ідеальний букет!");
}

document.addEventListener("DOMContentLoaded", () => {
    let btnProp = document.getElementById("btn-prop");

    if (btnProp) {
        btnProp.onclick = function() {
            alert("У наявності є троянди, тюльпани, орхідеї та сезонні композиції.");
        };
    }

    let btnMulti = document.getElementById("btn-multi");

    if (btnMulti) {
        btnMulti.addEventListener("click", () => {
            console.log("Клієнт переглядає акційні пропозиції Floria.");
        });

        btnMulti.addEventListener("click", () => {
            alert("Сьогодні діє знижка на весняні букети!");
        });
    }

    let btnObj = document.getElementById("btn-obj");
    let btnRemoveObj = document.getElementById("btn-remove-obj");

    let myObjectHandler = {
        handleEvent(event) {
            alert(`Флористична порада активована для елемента <${event.currentTarget.tagName}>.`);
        }
    };

    if (btnObj && btnRemoveObj) {
        btnObj.addEventListener("click", myObjectHandler);

        btnRemoveObj.onclick = function() {
            btnObj.removeEventListener("click", myObjectHandler);
            alert("Пораду флориста вимкнено.");
        };
    }

    let ul = document.getElementById("flowers-list");

    if (ul) {
        ul.onclick = function(event) {
            if (event.target.tagName !== "LI") return;

            event.target.classList.toggle("highlight");
        };
    }

    let menu = document.getElementById("action-menu");

    if (menu) {
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this);
            }

            save() {
                alert("Ваш букет збережено у вибраному!");
            }

            load() {
                alert("Каталог квітів відкрито для перегляду.");
            }

            search() {
                alert("Пошук квітів запущено!");
            }

            onClick(event) {
                let action = event.target.dataset.action;

                if (action && typeof this[action] === "function") {
                    this[action]();
                }
            }
        }

        new Menu(menu);
    }

    document.addEventListener("click", function(event) {
        if (event.target.dataset.counter !== undefined) {
            event.target.innerHTML++;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let tackleGrid = document.getElementById("tackle-grid");

    if (tackleGrid) {
        tackleGrid.onmouseover = function(event) {
            let target = event.target;
            let relatedTarget = event.relatedTarget;

            if (target.classList.contains("tackle-item")) {
                target.classList.add("hover-active");

                console.log(
                    `Курсор наведено на елемент вітрини. Попередній елемент: ${relatedTarget ? relatedTarget.tagName : "зовні"}`
                );
            }
        };

        tackleGrid.onmouseout = function(event) {
            let target = event.target;

            if (target.classList.contains("tackle-item")) {
                target.classList.remove("hover-active");
            }
        };

        tackleGrid.onclick = function(event) {
            let item = event.target.closest(".tackle-item");

            if (!item) return;

            let action = item.dataset.action;

            if (action === "tulip") {
                alert("Ви обрали весняні тюльпани.");
            } else if (action === "rose") {
                alert("Ви обрали класичні троянди.");
            } else if (action === "peony") {
                alert("Ви обрали ніжні півонії.");
            } else if (action === "orchid") {
                alert("Ви обрали елегантні орхідеї.");
            } else {
                alert(`Ви обрали: ${item.textContent.trim()}`);
            }
        };
    }

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