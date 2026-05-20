var items = document.querySelectorAll('.item');
for (var i = 0; i < items.length; i++) {
    var header = items[i].querySelector('.header');
    header.onclick = function() {
        this.parentElement.classList.toggle('active');
    };
}

var monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
var weekdayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

function addZero(num) {
    return num < 10 ? '0' + num : '' + num;
}

function formatDate(date) {
    var day = addZero(date.getDate());
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    var weekday = weekdayNames[date.getDay()];
    return day + ' ' + month + ' ' + year + ', ' + weekday;
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return addZero(hours) + ':' + minutes + ':' + seconds + ' ' + ampm;
}

var dateDisplay = document.getElementById('dateDisplay');
var timeDisplay = document.getElementById('timeDisplay');

function updateDateTime() {
    var now = new Date();
    dateDisplay.innerHTML = formatDate(now);
    timeDisplay.innerHTML = formatTime(now);
}

updateDateTime();
setInterval(updateDateTime, 1000);

var currentDate = new Date();
var selectedDate = null;
var monthsRu = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
var daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

function renderCalendar() {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    document.getElementById('currentMonthYear').innerHTML = monthsRu[month] + ' ' + year;

    var container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    var table = document.createElement('table');
    table.className = 'calendar-table';

    var thead = document.createElement('thead');
    var trHead = document.createElement('tr');
    for (var i = 0; i < daysOfWeek.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = daysOfWeek[i];
        trHead.appendChild(th);
    }
    thead.appendChild(trHead);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    var firstDay = new Date(year, month, 1);
    var startOffset = firstDay.getDay();
    if (startOffset === 0) startOffset = 6;
    else startOffset = startOffset - 1;

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var row = document.createElement('tr');

    for (var i = 0; i < startOffset; i++) {
        var emptyCell = document.createElement('td');
        emptyCell.className = 'empty-cell';
        row.appendChild(emptyCell);
    }

    for (var day = 1; day <= daysInMonth; day++) {
        var cell = document.createElement('td');
        cell.innerHTML = day;

        var currentDay = new Date(year, month, day);
        var dayOfWeekNum = currentDay.getDay();
        if (dayOfWeekNum === 0 || dayOfWeekNum === 6) {
            cell.className = 'weekend';
        }

        var today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
            cell.classList.add('today');
        }

        if (selectedDate !== null &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day) {
            cell.classList.add('selected');
        }

        (function(y, m, d) {
            cell.onclick = function() { selectDate(y, m, d); };
        })(year, month, day);

        row.appendChild(cell);

        if ((dayOfWeekNum === 0 && day !== daysInMonth) || day === daysInMonth) {
            while (row.children.length < 7) {
                var emptyCell2 = document.createElement('td');
                emptyCell2.className = 'empty-cell';
                row.appendChild(emptyCell2);
            }
            tbody.appendChild(row);
            row = document.createElement('tr');
        }
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    document.getElementById('selectedDateDisplay').innerHTML = 'Выбранная дата: ' + day + ' ' + monthsRu[month] + ' ' + year + ' года';
    renderCalendar();
}

document.getElementById('prevMonthBtn').onclick = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById('nextMonthBtn').onclick = function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

document.getElementById('todayBtn').onclick = function() {
    currentDate = new Date();
    renderCalendar();
};

renderCalendar();

document.getElementById('findImagesBtn').onclick = function() {
    var images = document.querySelectorAll('img');
    document.getElementById('imagesResult').innerHTML = 'Найдено рисунков: ' + images.length;
    
    var highlighted = document.querySelectorAll('.highlight-image');
    for (var i = 0; i < highlighted.length; i++) {
        highlighted[i].classList.remove('highlight-image');
    }

    for (var i = 0; i < images.length; i++) {
        images[i].classList.add('highlight-image');
        (function(img) {
            setTimeout(function() {
                img.classList.remove('highlight-image');
            }, 2000);
        })(images[i]);
    }
};

var task4Interval = null;
var task4Blocks = document.querySelectorAll('.task4-block');
var task4StartBtn = document.getElementById('startTask4Btn');
var task4ResetBtn = document.getElementById('resetTask4Btn');

task4StartBtn.onclick = function() {
    if (task4Interval) {
        clearInterval(task4Interval);
        task4Interval = null;
        task4StartBtn.innerHTML = '▶ Запустить';
        return;
    }
    
    task4StartBtn.innerHTML = '⏸ Остановить';
    
    task4Interval = setInterval(function() {
        var visible = [];
        for (var i = 0; i < task4Blocks.length; i++) {
            if (!task4Blocks[i].classList.contains('hidden-block')) {
                visible.push(task4Blocks[i]);
            }
        }
        
        if (visible.length === 0) {
            clearInterval(task4Interval);
            task4Interval = null;
            task4StartBtn.innerHTML = '▶ Запустить';
            return;
        }
        
        var randIndex = Math.floor(Math.random() * visible.length);
        visible[randIndex].classList.add('hidden-block');
    }, 120);
};

task4ResetBtn.onclick = function() {
    clearInterval(task4Interval);
    task4Interval = null;
    for (var i = 0; i < task4Blocks.length; i++) {
        task4Blocks[i].classList.remove('hidden-block');
    }
    task4StartBtn.innerHTML = '▶ Запустить';
};

var paragraphsContainer = document.getElementById('paragraphsContainer');
var addParagraphBtn = document.getElementById('addParagraphBtn');
var clearParagraphsBtn = document.getElementById('clearParagraphsBtn');
var paragraphCounter = 0;

addParagraphBtn.onclick = function() {
    while (true) {
        var text = prompt('Введите текст для абзаца (или нажмите ESC для отмены):');
        if (text === null) break;
        if (text.trim() === '') {
            alert('Введите текст!');
            continue;
        }
        paragraphCounter++;
        var p = document.createElement('p');
        p.innerHTML = text + '<button class="delete-btn">Удалить</button>';
        p.setAttribute('data-number', paragraphCounter);
        
        var deleteBtn = p.querySelector('.delete-btn');
        deleteBtn.onclick = function() {
            var parentP = this.parentElement;
            var content = parentP.childNodes[0].textContent;
            var number = parentP.getAttribute('data-number');
            if (confirm('Удалить абзац #' + number + ':\n\n"' + content + '"')) {
                parentP.remove();
            }
        };
        
        if (paragraphsContainer.firstChild) {
            paragraphsContainer.insertBefore(p, paragraphsContainer.firstChild);
        } else {
            paragraphsContainer.appendChild(p);
        }
        break;
    }
};

clearParagraphsBtn.onclick = function() {
    var paragraphs = paragraphsContainer.querySelectorAll('p');
    if (paragraphs.length === 0) {
        alert('Нет абзацев для удаления!');
        return;
    }
    if (confirm('Удалить все абзацы (' + paragraphs.length + ' шт.)?')) {
        paragraphsContainer.innerHTML = '<p style="color: #999; font-style: italic;">Нажмите "Добавить абзац" для создания элементов</p>';
        paragraphCounter = 0;
    }
};

var hoverTarget = document.getElementById('hoverTarget');
var displayedImage = document.getElementById('displayedImage');
var imageArray = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg'];
var currentImageIndex = 0;

displayedImage.src = imageArray[0];

hoverTarget.onmouseover = function() {
    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    displayedImage.src = imageArray[currentImageIndex];
};

var sweetsList = document.getElementById('sweetsList');
var sweetsMessage = document.getElementById('sweetsMessage');
var resetSweetsBtn = document.getElementById('resetSweetsBtn');

function checkAllSweetsGone() {
    var visibleItems = document.querySelectorAll('#sweetsList li:not(.sweet-fade-out)');
    if (visibleItems.length === 0) {
        sweetsMessage.style.display = 'block';
    } else {
        sweetsMessage.style.display = 'none';
    }
}

sweetsList.addEventListener('click', function(event) {
    var li = event.target.closest('li');
    if (!li) return;
    if (li.classList.contains('sweet-fade-out') || li.style.display === 'none') return;

    li.classList.add('sweet-fade-out');

    var onFadeEnd = function() {
        li.style.display = 'none';
        checkAllSweetsGone();
    };

    li.addEventListener('transitionend', onFadeEnd, { once: true });
    setTimeout(function() {
        if (li.style.display !== 'none') onFadeEnd();
    }, 350);
});

resetSweetsBtn.onclick = function() {
    var allLi = document.querySelectorAll('#sweetsList li');
    for (var i = 0; i < allLi.length; i++) {
        allLi[i].style.display = '';
        allLi[i].classList.remove('sweet-fade-out');
    }
    sweetsMessage.style.display = 'none';
};

var hoverImage = document.getElementById('hoverImage');
hoverImage.onmouseover = function() {
    this.classList.add('fade-out');
};
hoverImage.onmouseout = function() {
    this.classList.remove('fade-out');
};

(function(){

const form = document.getElementById('simpleForm');
if (!form) return;

form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    const inputs = form.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.classList.remove('error-input');
        input.nextElementSibling.textContent = '';
    });

    const login = document.getElementById('simpleLogin');
    const password = document.getElementById('simplePassword');
    const email = document.getElementById('simpleEmail');
    const phone = document.getElementById('simplePhone');
    const fio = document.getElementById('simpleFio');
    const faculty = document.getElementById('simpleFaculty');
    const department = document.getElementById('simpleDepartment');

    function error(input, msg){
        input.classList.add('error-input');
        input.nextElementSibling.textContent = msg;
        valid = false;
    }

    if (!login.value.trim()) error(login, "Введите логин");
    if (password.value.length < 6) error(password, "Минимум 6 символов");
    if (!email.value.includes('@')) error(email, "Email должен содержать @");
    if (!/^\d+$/.test(phone.value)) error(phone, "Только цифры");
    if (!fio.value.trim()) error(fio, "Введите ФИО");
    if (!faculty.value.trim()) error(faculty, "Введите факультет");
    if (!department.value.trim()) error(department, "Введите кафедру");

    if (valid) {
        alert("Простая проверка пройдена ✅");
        form.reset();
    }
});

})();

(function(){

const form = document.getElementById('complexForm');
if (!form) return;

form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    function show(input, id, msg){
        input.classList.add('error-input');
        document.getElementById(id).textContent = msg;
        valid = false;
    }

    function clear(input, id){
        input.classList.remove('error-input');
        document.getElementById(id).textContent = '';
    }

    const login = compLogin;
    const password = compPassword;
    const confirm = compConfirmPassword;
    const email = compEmail;
    const phone = compPhone;
    const birth = compBirthdate;
    const fio = compFio;
    const faculty = compFaculty;
    const department = compDepartment;

    const loginRegex = /^[A-Za-z0-9]{3,}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const fioRegex = /^[А-Яа-яЁё\s]+$/;
    const facultyRegex = /^[А-Яа-яЁё\s\-]{3,}$/;

    function validEmail(emailStr){
        const parts = emailStr.split('@');
        if (parts.length !== 2) return false;

        if (!/^[A-Za-z0-9]{2,}$/.test(parts[0])) return false;

        const domain = parts[1].split('.');
        if (domain.length < 2) return false;

        for (let i=0;i<domain.length;i++){
            if (!/^[A-Za-z0-9]{2,}$/.test(domain[i])) return false;
            if (i === domain.length-1 && domain[i].length > 4) return false;
        }
        return true;
    }

    if (!loginRegex.test(login.value)) show(login,"compLoginError","Минимум 3 символа, латиница и цифры");
    else clear(login,"compLoginError");

    if (password.value.length < 8) show(password,"compPasswordError","Минимум 8 символов");
    else clear(password,"compPasswordError");

    if (confirm.value !== password.value) show(confirm,"compConfirmError","Пароли не совпадают");
    else clear(confirm,"compConfirmError");

    if (!validEmail(email.value)) show(email,"compEmailError","Неверный формат email по условию");
    else clear(email,"compEmailError");

    if (!phoneRegex.test(phone.value)) show(phone,"compPhoneError","Телефон 10-15 цифр");
    else clear(phone,"compPhoneError");

    if (!birth.value) show(birth,"compBirthdateError","Выберите дату");
    else clear(birth,"compBirthdateError");

    if (!fioRegex.test(fio.value)) show(fio,"compFioError","Только кириллица");
    else clear(fio,"compFioError");

    if (!faculty.value.trim()) show(faculty,"compFacultyError","Введите факультет");
    else clear(faculty,"compFacultyError");

    if (!facultyRegex.test(department.value))
    show(department,"compDepartmentError","Минимум 3 символа, только кириллица");
else
    clear(department,"compDepartmentError");

    if (valid){
        alert("Сложная проверка пройдена ✅");
        form.reset();
    }

});

})();


(function(){

const textDisplay = document.getElementById("typingText");
if (!textDisplay) return;

const input = document.getElementById("typingInput");
const startBtn = document.getElementById("startTypingBtn");
const restartBtn = document.getElementById("restartTypingBtn");

let totalTyped = 0;
let totalErrors = 0;

const timeLeftDisplay = document.getElementById("timeLeft");
const cpmDisplay = document.getElementById("cpm");
const accuracyDisplay = document.getElementById("accuracy");

const recordDisplay = document.getElementById("recordCpm");

let record = localStorage.getItem("typingRecord") || 0;
recordDisplay.textContent = record;

const wordsBase = [
"дом","работа","машина","окно","река","студент","книга","компьютер","телефон","программа",
"университет","город","улица","парк","лес","море","гора","школа","кафедра","факультет",
"экзамен","задание","проект","разработка","интернет","браузер","клавиатура","мышка","экран","код",
"функция","переменная","объект","массив","цикл","условие","алгоритм","данные","сервер","клиент",
"документ","форма","календарь","дата","время","событие","обработка","ошибка","проверка","регистрация",
"логин","пароль","почта","телефон","адрес","городской","система","информация","анализ","результат",
"контроль","оценка","учеба","практика","теория","пример","запрос","ответ","модель","структура",
"процесс","скорость","точность","навык","метод","решение","вариант","таблица","список","блок",
"игра","уровень","победа","результат","тренировка","знание","опыт","тест","символ","буква",
"строка","слово","текст","раздел","кнопка","нажатие","движение","обновление","стиль","дизайн",
"цвет","фон","граница","размер","позиция","центр","лево","право","верх","низ",
"примерно","часто","редко","иногда","всегда","никогда","сегодня","завтра","вчера","сейчас",
"быстро","медленно","сложно","просто","легко","трудно","новый","старый","важный","главный",
"дополнительный","основной","случайный","уникальный","динамический","активный","пассивный","логический","реальный","виртуальный",
"внутренний","внешний","полный","пустой","короткий","длинный","широкий","узкий","сильный","слабый",
"яркий","темный","теплый","холодный","высокий","низкий","глубокий","поверхностный","точный","примерный",
"материал","энергия","ресурс","команда","участник","развитие","поддержка","платформа","приложение","интерфейс",
"пользователь","администратор","авторизация","безопасность","шифрование","подключение","соединение","передача","хранение","загрузка",
"выгрузка","обновление","синхронизация","архив","копия","файл","папка","директория","ссылка","страница",
"контент","заголовок","описание","сообщение","уведомление","параметр","настройка","режим","фильтр","сортировка",
"поиск","ввод","вывод","печать","монитор","камера","микрофон","динамик","проектор","память",
"процессор","графика","сеть","маршрут","сигнал","доступ","контакт","профиль","аккаунт","подписка",
"статистика","аналитика","показатель","отчет","план","задача","цель","приоритет","дедлайн","график",
"сценарий","пример","шаблон","модуль","библиотека","фреймворк","компонент","контроллер","механизм","движок",
"редактор","консоль","терминал","компиляция","запуск","сборка","релиз","версия","обновление","поддержка",
"инструкция","описание","руководство","доклад","лекция","семинар","курс","сертификат","диплом","специалист",
"инженер","разработчик","аналитик","дизайнер","менеджер","директор","эксперт","стратегия","тактика","подход",
"исследование","эксперимент","наблюдение","гипотеза","вывод","заключение","теорема","формула","график","диаграмма",
"статус","режим","переход","кнопка","панель","окружение","среда","область","категория","тип",
"класс","наследование","методика","структурирование","архитектура","проектирование","оптимизация","ускорение","производительность","нагрузка"
];
const textLength = 120;

let currentText = "";
let time = 30;
let timer = null;
let started = false;

const wordsCount = 25; 

function setRandomText(){
    textDisplay.innerHTML = "";
    currentText = "";

    let lastWord = "";

    for (let i = 0; i < wordsCount; i++){
        let randomWord;

        do {
            randomWord = wordsBase[Math.floor(Math.random() * wordsBase.length)];
        } while (randomWord === lastWord);

        currentText += randomWord + " ";
        lastWord = randomWord;
    }

    currentText = currentText.trim();

    currentText.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        textDisplay.appendChild(span);
    });
}

function startGame(){
    if (started) return;

    input.disabled = false;
    input.focus();
}

function updateAccuracy(){
    if (totalTyped === 0){
        accuracyDisplay.textContent = 100;
        return;
    }

    const accuracy = Math.round(((totalTyped - totalErrors) / totalTyped) * 100);
    accuracyDisplay.textContent = accuracy;
}

function restartGame(){
    clearInterval(timer);
    time = 30;
    started = false;
    input.value = "";
    input.disabled = true;

    timeLeftDisplay.textContent = time;
    cpmDisplay.textContent = 0;
    totalTyped = 0;
    totalErrors = 0;
    accuracyDisplay.textContent = 100;

    setRandomText();
}

function checkRecord(){
    const currentCpm = parseInt(cpmDisplay.textContent);

    if (currentCpm > record){
        record = currentCpm;
        localStorage.setItem("typingRecord", record);
        recordDisplay.textContent = record;

        alert("🎉 Новый рекорд!");
    }
}

input.addEventListener("keydown", function(e){

    if (!started){
        started = true;

        timer = setInterval(()=>{
            time--;
            timeLeftDisplay.textContent = time;

            if (time <= 0){
                clearInterval(timer);
                input.disabled = true;
                started = false;

                checkRecord();
                alert("Время вышло!");
}

        },1000);
    }

    const spans = textDisplay.querySelectorAll("span");
    const currentIndex = input.value.length;
    const expectedChar = spans[currentIndex]?.textContent;

    if (e.key === "Backspace") {
        return;
    }

    if (!expectedChar){
        e.preventDefault();
        return;
    }

    if (e.key !== expectedChar){
    e.preventDefault();

    totalErrors++;
    totalTyped++;

    updateAccuracy();

    input.classList.add("input-error");
    setTimeout(() => {
        input.classList.remove("input-error");
    }, 200);

    return;
}


    totalTyped++;
    updateAccuracy();

    setTimeout(() => {
        spans[currentIndex].classList.add("correct");
    }, 0);
});

input.addEventListener("input", function(){

    const typedLength = input.value.length;

    const minutes = (30 - time) / 60;
    const cpm = minutes > 0 ? Math.round(typedLength / minutes) : 0;

    cpmDisplay.textContent = cpm;

    if (typedLength === currentText.length){
        clearInterval(timer);
        input.disabled = true;
        started = false;

        checkRecord();
        alert("Текст полностью введён!");
    }
});

startBtn.onclick = startGame;
restartBtn.onclick = restartGame;

restartGame();

})();