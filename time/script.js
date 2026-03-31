var items = document.querySelectorAll('.item');
for (var i = 0; i < items.length; i++) {
    var header = items[i].querySelector('.header');
    header.onclick = function() {
        this.parentElement.classList.toggle('active');
    };
}

var monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
var weekdayNames = [
    'воскресенье', 'понедельник', 'вторник', 'среда',
    'четверг', 'пятница', 'суббота'
];

function addZero(num) {
    if (num < 10) return '0' + num;
    else return '' + num;
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
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = (hours >= 12) ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    var hh = addZero(hours);
    var mm = addZero(minutes);
    var ss = addZero(seconds);
    return hh + ':' + mm + ':' + ss + ' ' + ampm;
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

var monthsRu = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
var daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

function renderCalendar() {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();

    var monthYearSpan = document.getElementById('currentMonthYear');
    monthYearSpan.innerHTML = monthsRu[month] + ' ' + year;

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
        emptyCell.innerHTML = '';
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

        cell.onclick = (function(y, m, d) {
            return function() {
                selectDate(y, m, d);
            };
        })(year, month, day);

        row.appendChild(cell);

        if ((dayOfWeekNum === 0 && day !== daysInMonth) || day === daysInMonth) {
            while (row.children.length < 7) {
                var emptyCell2 = document.createElement('td');
                emptyCell2.innerHTML = '';
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
    var display = document.getElementById('selectedDateDisplay');
    display.innerHTML = 'Выбранная дата: ' + day + ' ' + monthsRu[month] + ' ' + year + ' года';
    renderCalendar();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function goToToday() {
    currentDate = new Date();
    renderCalendar();
}

document.getElementById('prevMonthBtn').onclick = prevMonth;
document.getElementById('nextMonthBtn').onclick = nextMonth;
document.getElementById('todayBtn').onclick = goToToday;
renderCalendar();

var findBtn = document.getElementById('findImagesBtn');
var resultDiv = document.getElementById('imagesResult');

findBtn.onclick = function() {
    var images = document.querySelectorAll('img');
    var count = images.length;
    resultDiv.innerHTML = 'Найдено рисунков: ' + count;

    var highlighted = document.querySelectorAll('.highlight-image');
    for (var i = 0; i < highlighted.length; i++) {
        highlighted[i].classList.remove('highlight-image');
    }

    for (var i = 0; i < images.length; i++) {
        images[i].classList.add('highlight-image');
        setTimeout(function(img) {
            return function() {
                img.classList.remove('highlight-image');
            };
        }(images[i]), 2000);
    }
};