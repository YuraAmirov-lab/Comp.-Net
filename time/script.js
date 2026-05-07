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

// ========== ЗАДАНИЕ 9: Анкета веб-разработчика (простая проверка email) ==========
(function() {
    const form = document.getElementById('anketaForm');
    if (!form) return;

    const regName = document.getElementById('regName');
    const regPassword = document.getElementById('regPassword');
    const regConfirm = document.getElementById('regConfirmPassword');
    const regEmail = document.getElementById('regEmail');

    // Элементы для ошибок
    const nameError = document.getElementById('regNameError');
    const passError = document.getElementById('regPasswordError');
    const confirmError = document.getElementById('regConfirmError');
    const emailError = document.getElementById('regEmailError');

    const successDiv = document.getElementById('anketaSuccessMessage');

    // Функция проверки email (наличие @ и точки после @)
    function isValidEmail(email) {
        if (!email) return false;
        const atPos = email.indexOf('@');
        if (atPos === -1) return false;
        const dotPos = email.indexOf('.', atPos);
        return dotPos > atPos + 1;
    }

    function showError(input, errorDiv, message) {
        if (input) input.classList.add('error-input');
        if (errorDiv) errorDiv.textContent = message;
    }

    function clearError(input, errorDiv) {
        if (input) input.classList.remove('error-input');
        if (errorDiv) errorDiv.textContent = '';
    }

    function validateAnketa() {
        let isValid = true;

        // Имя
        if (!regName.value.trim()) {
            showError(regName, nameError, 'Введите регистрационное имя');
            isValid = false;
        } else {
            clearError(regName, nameError);
        }

        // Пароль
        if (!regPassword.value) {
            showError(regPassword, passError, 'Введите пароль');
            isValid = false;
        } else if (regPassword.value.length < 4) {
            showError(regPassword, passError, 'Пароль должен быть не менее 4 символов');
            isValid = false;
        } else {
            clearError(regPassword, passError);
        }

        // Подтверждение пароля
        if (!regConfirm.value) {
            showError(regConfirm, confirmError, 'Подтвердите пароль');
            isValid = false;
        } else if (regConfirm.value !== regPassword.value) {
            showError(regConfirm, confirmError, 'Пароли не совпадают');
            isValid = false;
        } else {
            clearError(regConfirm, confirmError);
        }

        // Email
        if (!regEmail.value.trim()) {
            showError(regEmail, emailError, 'Введите E-mail');
            isValid = false;
        } else if (!isValidEmail(regEmail.value.trim())) {
            showError(regEmail, emailError, 'E-mail должен содержать "@" и точку после него (например, name@domain.ru)');
            isValid = false;
        } else {
            clearError(regEmail, emailError);
        }

        return isValid;
    }

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateAnketa()) {
            successDiv.style.display = 'block';
            successDiv.textContent = '✅ Регистрация успешно пройдена (простая проверка email выполнена)!';
            // Не очищаем форму, чтобы пользователь видел введённые данные
        } else {
            successDiv.style.display = 'none';
        }
    });

    // Очистка формы (кнопка "Очистить форму")
    document.getElementById('resetFormBtn').addEventListener('click', function() {
        form.reset();
        // Убираем подсветку ошибок
        document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        successDiv.style.display = 'none';
    });

    // Живая валидация при потере фокуса
    [regName, regPassword, regConfirm, regEmail].forEach(field => {
        field.addEventListener('blur', () => validateAnketa());
        field.addEventListener('focus', () => { successDiv.style.display = 'none'; });
    });
})();
(function() {
    const form9 = document.getElementById('anketaForm');
    if (form9) {
        const regName = document.getElementById('regName');
        const regPassword = document.getElementById('regPassword');
        const regConfirm = document.getElementById('regConfirmPassword');
        const regEmail = document.getElementById('regEmail');
        const nameError = document.getElementById('regNameError');
        const passError = document.getElementById('regPasswordError');
        const confirmError = document.getElementById('regConfirmError');
        const emailError = document.getElementById('regEmailError');
        const successDiv = document.getElementById('anketaSuccessMessage');

        function isValidEmail(email) {
            if (!email) return false;
            const atPos = email.indexOf('@');
            if (atPos === -1) return false;
            const dotPos = email.indexOf('.', atPos);
            return dotPos > atPos + 1;
        }

        function showError(input, errorDiv, message) {
            if (input) input.classList.add('error-input');
            if (errorDiv) errorDiv.textContent = message;
        }
        function clearError(input, errorDiv) {
            if (input) input.classList.remove('error-input');
            if (errorDiv) errorDiv.textContent = '';
        }
        function validateAnketa() {
            let isValid = true;
            if (!regName.value.trim()) {
                showError(regName, nameError, 'Введите регистрационное имя');
                isValid = false;
            } else {
                clearError(regName, nameError);
            }
            if (!regPassword.value) {
                showError(regPassword, passError, 'Введите пароль');
                isValid = false;
            } else if (regPassword.value.length < 4) {
                showError(regPassword, passError, 'Пароль должен быть не менее 4 символов');
                isValid = false;
            } else {
                clearError(regPassword, passError);
            }
            if (!regConfirm.value) {
                showError(regConfirm, confirmError, 'Подтвердите пароль');
                isValid = false;
            } else if (regConfirm.value !== regPassword.value) {
                showError(regConfirm, confirmError, 'Пароли не совпадают');
                isValid = false;
            } else {
                clearError(regConfirm, confirmError);
            }
            if (!regEmail.value.trim()) {
                showError(regEmail, emailError, 'Введите E-mail');
                isValid = false;
            } else if (!isValidEmail(regEmail.value.trim())) {
                showError(regEmail, emailError, 'E-mail должен содержать "@" и точку после него');
                isValid = false;
            } else {
                clearError(regEmail, emailError);
            }
            return isValid;
        }
        form9.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAnketa()) {
                successDiv.style.display = 'block';
                successDiv.textContent = '✅ Регистрация успешно пройдена (простая проверка email выполнена)!';
            } else {
                successDiv.style.display = 'none';
            }
        });
        document.getElementById('resetFormBtn').addEventListener('click', function() {
            form9.reset();
            document.querySelectorAll('#anketaForm .error-input').forEach(el => el.classList.remove('error-input'));
            document.querySelectorAll('#anketaForm .error-message').forEach(el => el.textContent = '');
            successDiv.style.display = 'none';
        });
        [regName, regPassword, regConfirm, regEmail].forEach(field => {
            field.addEventListener('blur', () => validateAnketa());
            field.addEventListener('focus', () => { successDiv.style.display = 'none'; });
        });
    }
})();

(function() {
    const form10 = document.getElementById('complexForm');
    if (form10) {
        const login = document.getElementById('login');
        const password = document.getElementById('password10');
        const confirmPwd = document.getElementById('confirmPassword10');
        const email = document.getElementById('email10');
        const phone = document.getElementById('phone10');
        const birthdate = document.getElementById('birthdate10');
        const fio = document.getElementById('fio10');
        const faculty = document.getElementById('faculty10');
        const department = document.getElementById('department10');

        const loginError = document.getElementById('loginError');
        const passwordError = document.getElementById('password10Error');
        const confirmError = document.getElementById('confirm10Error');
        const emailError = document.getElementById('email10Error');
        const phoneError = document.getElementById('phone10Error');
        const birthdateError = document.getElementById('birthdate10Error');
        const fioError = document.getElementById('fio10Error');
        const facultyError = document.getElementById('faculty10Error');
        const departmentError = document.getElementById('department10Error');

        const successDiv = document.getElementById('complexSuccessMessage');

        const loginRegex = /^[a-zA-Z0-9_]{4,20}$/;
        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        const fioRegex = /^[A-Za-zА-Яа-яёЁ]+([\s\-][A-Za-zА-Яа-яёЁ]+){1,2}$/;
        const facultyDeptRegex = /^[а-яА-Яa-zA-Z0-9\s\-]{2,50}$/;

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
            const today = new Date();
            today.setHours(0,0,0,0);
            if (date > today) return false;
            let age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) age--;
            return age >= 18 && age <= 100;
        }

        function showError(input, errorDiv, message) {
            if (input) input.classList.add('error-input');
            if (errorDiv) errorDiv.textContent = message;
        }
        function clearError(input, errorDiv) {
            if (input) input.classList.remove('error-input');
            if (errorDiv) errorDiv.textContent = '';
        }

        function validateComplexForm() {
            let isValid = true;
            if (!login.value.trim()) {
                showError(login, loginError, 'Введите логин');
                isValid = false;
            } else if (!loginRegex.test(login.value.trim())) {
                showError(login, loginError, 'Логин должен содержать 4-20 символов: латиница, цифры, _');
                isValid = false;
            } else {
                clearError(login, loginError);
            }
            if (!password.value) {
                showError(password, passwordError, 'Введите пароль');
                isValid = false;
            } else if (!pwdRegex.test(password.value)) {
                showError(password, passwordError, 'Пароль: минимум 6 символов, хотя бы одна буква и одна цифра');
                isValid = false;
            } else {
                clearError(password, passwordError);
            }
            if (!confirmPwd.value) {
                showError(confirmPwd, confirmError, 'Подтвердите пароль');
                isValid = false;
            } else if (confirmPwd.value !== password.value) {
                showError(confirmPwd, confirmError, 'Пароли не совпадают');
                isValid = false;
            } else {
                clearError(confirmPwd, confirmError);
            }
            if (!email.value.trim()) {
                showError(email, emailError, 'Введите E-mail');
                isValid = false;
            } else if (!isValidEmailComplex(email.value.trim())) {
                showError(email, emailError, 'Email должен быть вида: local@domain.ru, где local ≥2 букв/цифр, после @ цепочки ≥2 символов, последняя ≤4');
                isValid = false;
            } else {
                clearError(email, emailError);
            }
            if (!phone.value.trim()) {
                showError(phone, phoneError, 'Введите номер телефона');
                isValid = false;
            } else if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, phoneError, 'Введите российский номер: +7XXXXXXXXXX или 8XXXXXXXXXX');
                isValid = false;
            } else {
                clearError(phone, phoneError);
            }
            if (!birthdate.value) {
                showError(birthdate, birthdateError, 'Выберите дату рождения');
                isValid = false;
            } else if (!isValidDate(birthdate.value)) {
                showError(birthdate, birthdateError, 'Дата должна быть корректной, возраст от 18 до 100 лет');
                isValid = false;
            } else {
                clearError(birthdate, birthdateError);
            }
            if (!fio.value.trim()) {
                showError(fio, fioError, 'Введите ФИО');
                isValid = false;
            } else if (!fioRegex.test(fio.value.trim())) {
                showError(fio, fioError, 'ФИО: минимум два слова (буквы, дефис, пробел)');
                isValid = false;
            } else {
                clearError(fio, fioError);
            }
            if (!faculty.value.trim()) {
                showError(faculty, facultyError, 'Введите факультет');
                isValid = false;
            } else if (!facultyDeptRegex.test(faculty.value.trim())) {
                showError(faculty, facultyError, 'Факультет: 2-50 символов, буквы, цифры, пробел, дефис');
                isValid = false;
            } else {
                clearError(faculty, facultyError);
            }
            if (!department.value.trim()) {
                showError(department, departmentError, 'Введите кафедру');
                isValid = false;
            } else if (!facultyDeptRegex.test(department.value.trim())) {
                showError(department, departmentError, 'Кафедра: 2-50 символов, буквы, цифры, пробел, дефис');
                isValid = false;
            } else {
                clearError(department, departmentError);
            }
            return isValid;
        }

        form10.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateComplexForm()) {
                successDiv.style.display = 'block';
                successDiv.textContent = '✅ Все поля заполнены корректно! Сложная проверка пройдена.';
            } else {
                successDiv.style.display = 'none';
            }
        });

        document.getElementById('resetComplexBtn').addEventListener('click', function() {
            form10.reset();
            document.querySelectorAll('#complexForm .error-input').forEach(el => el.classList.remove('error-input'));
            document.querySelectorAll('#complexForm .error-message').forEach(el => el.textContent = '');
            successDiv.style.display = 'none';
        });

        const allFields = [login, password, confirmPwd, email, phone, birthdate, fio, faculty, department];
        allFields.forEach(field => {
            if (field) {
                field.addEventListener('blur', () => validateComplexForm());
                field.addEventListener('focus', () => { successDiv.style.display = 'none'; });
            }
        });
    }
})();