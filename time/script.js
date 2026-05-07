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

// ... ваш существующий код для заданий 1-8 (не трогайте) ...

// ========== ЗАДАНИЕ 10: КОМПЛЕКСНАЯ ВАЛИДАЦИЯ ==========
(function() {
    const form = document.getElementById('complexForm');
    if (!form) return;

    const login = document.getElementById('compLogin');
    const name = document.getElementById('compName');
    const password = document.getElementById('compPassword');
    const confirmPwd = document.getElementById('compConfirmPassword');
    const email = document.getElementById('compEmail');
    const birthdate = document.getElementById('compBirthdate');
    const about = document.getElementById('compAbout');
    const skills = document.getElementById('compSkills');
    const experience = document.getElementById('compExperience');
    const agree = document.getElementById('compAgree');

    const loginErr = document.getElementById('compLoginError');
    const nameErr = document.getElementById('compNameError');
    const pwdErr = document.getElementById('compPasswordError');
    const confirmErr = document.getElementById('compConfirmError');
    const emailErr = document.getElementById('compEmailError');
    const birthErr = document.getElementById('compBirthdateError');
    const aboutErr = document.getElementById('compAboutError');
    const skillsErr = document.getElementById('compSkillsError');
    const expErr = document.getElementById('compExperienceError');
    const agreeErr = document.getElementById('compAgreeError');
    const successDiv = document.getElementById('compSuccessMessage');

    // Регулярные выражения
    const loginRegex = /^[a-zA-Z0-9]{3,16}$/;
    const nameRegex = /^[А-Яа-яЁё]+([\s\-][А-Яа-яЁё]+)*$/;
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:;])[A-Za-z\u0400-\u04FF\d~!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:;]{8,128}$/;
    const aboutSkillsRegex = /^.{20,}$/s;

    // Сложная проверка email по варианту
    function isValidEmailComplex(emailStr) {
        const atPos = emailStr.indexOf('@');
        if (atPos === -1) return false;
        const localPart = emailStr.substring(0, atPos);
        const domainPart = emailStr.substring(atPos + 1);
        if (!localPart.match(/^[A-Za-z0-9]{2,}$/)) return false;
        const parts = domainPart.split('.');
        if (parts.length < 2) return false;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part.match(/^[A-Za-z0-9]{2,}$/)) return false;
            if (i === parts.length - 1) {
                if (part.length > 4) return false;
            } else {
                if (part.length < 2) return false;
            }
        }
        return true;
    }

    function isValidDate(dateStr) {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return false;
        const minDate = new Date('1920-01-01');
        const today = new Date();
        today.setHours(0,0,0,0);
        return date >= minDate && date <= today;
    }

    function isValidExperience(exp) {
        if (exp === '') return true;
        const val = Number(exp);
        return !isNaN(val) && val >= 0 && val <= 1200;
    }

    function showError(input, errorDiv, msg) {
        if (input) input.classList.add('error-input');
        if (errorDiv) errorDiv.textContent = msg;
    }
    function clearError(input, errorDiv) {
        if (input) input.classList.remove('error-input');
        if (errorDiv) errorDiv.textContent = '';
    }

    function validateForm() {
        let valid = true;

        if (!login.value.trim()) {
            showError(login, loginErr, 'Введите логин');
            valid = false;
        } else if (!loginRegex.test(login.value.trim())) {
            showError(login, loginErr, 'Логин: 3-16 символов, только латиница и цифры');
            valid = false;
        } else {
            clearError(login, loginErr);
        }

        if (!name.value.trim()) {
            showError(name, nameErr, 'Введите имя');
            valid = false;
        } else if (!nameRegex.test(name.value.trim())) {
            showError(name, nameErr, 'Имя: только кириллица, пробел или дефис');
            valid = false;
        } else {
            clearError(name, nameErr);
        }

        if (!password.value) {
            showError(password, pwdErr, 'Введите пароль');
            valid = false;
        } else if (!pwdRegex.test(password.value)) {
            showError(password, pwdErr, 'Пароль: 8-128 символов, строчная, заглавная, цифра, спецсимвол');
            valid = false;
        } else {
            clearError(password, pwdErr);
        }

        if (!confirmPwd.value) {
            showError(confirmPwd, confirmErr, 'Подтвердите пароль');
            valid = false;
        } else if (confirmPwd.value !== password.value) {
            showError(confirmPwd, confirmErr, 'Пароли не совпадают');
            valid = false;
        } else {
            clearError(confirmPwd, confirmErr);
        }

        if (!email.value.trim()) {
            showError(email, emailErr, 'Введите E-mail');
            valid = false;
        } else if (!isValidEmailComplex(email.value.trim())) {
            showError(email, emailErr, 'Email должен быть вида: local@domain.ru, где local ≥2 букв/цифр, после @ цепочки ≥2 символов, последняя ≤4');
            valid = false;
        } else {
            clearError(email, emailErr);
        }

        if (!birthdate.value) {
            showError(birthdate, birthErr, 'Выберите дату рождения');
            valid = false;
        } else if (!isValidDate(birthdate.value)) {
            showError(birthdate, birthErr, 'Дата должна быть от 01.01.1920 до сегодня');
            valid = false;
        } else {
            clearError(birthdate, birthErr);
        }

        if (!about.value.trim()) {
            showError(about, aboutErr, 'Заполните "О себе"');
            valid = false;
        } else if (!aboutSkillsRegex.test(about.value)) {
            showError(about, aboutErr, 'Минимум 20 символов');
            valid = false;
        } else {
            clearError(about, aboutErr);
        }

        if (!skills.value.trim()) {
            showError(skills, skillsErr, 'Заполните "Навыки"');
            valid = false;
        } else if (!aboutSkillsRegex.test(skills.value)) {
            showError(skills, skillsErr, 'Минимум 20 символов');
            valid = false;
        } else {
            clearError(skills, skillsErr);
        }

        if (!experience.value || experience.value === '') {
            clearError(experience, expErr);
        } else if (!isValidExperience(experience.value)) {
            showError(experience, expErr, 'Опыт: от 0 до 1200 лет');
            valid = false;
        } else {
            clearError(experience, expErr);
        }

        if (!agree.checked) {
            showError(agree, agreeErr, 'Необходимо согласие с условиями');
            valid = false;
        } else {
            clearError(agree, agreeErr);
        }

        return valid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            successDiv.style.display = 'block';
            successDiv.textContent = '✅ Все поля заполнены корректно! Сложная проверка пройдена.';
            form.reset();
            document.querySelectorAll('#complexForm .error-input').forEach(el => el.classList.remove('error-input'));
            document.querySelectorAll('#complexForm .error-message').forEach(el => el.textContent = '');
            setTimeout(() => { successDiv.style.display = 'none'; }, 5000);
        } else {
            successDiv.style.display = 'none';
        }
    });

    document.getElementById('compResetBtn').addEventListener('click', function() {
        form.reset();
        document.querySelectorAll('#complexForm .error-input').forEach(el => el.classList.remove('error-input'));
        document.querySelectorAll('#complexForm .error-message').forEach(el => el.textContent = '');
        successDiv.style.display = 'none';
    });

    const allFields = [login, name, password, confirmPwd, email, birthdate, about, skills, experience, agree];
    allFields.forEach(field => {
        if (field) {
            field.addEventListener('blur', () => validateForm());
            field.addEventListener('focus', () => { successDiv.style.display = 'none'; });
        }
    });
})();