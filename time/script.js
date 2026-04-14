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