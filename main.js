if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
};

const body = document.getElementById('body');
const settings = document.getElementById('settings');
const openSettings = document.getElementById('open-settings');
const closeSettings = document.getElementById('close-settings');
const clear = document.getElementById('clear');
const about = document.getElementById('about');
const openAbout = document.getElementById('open-about');
const closeAbout = document.getElementById('close-about');
const habitSetting = document.getElementById('habit-setting');
const habitContainer = document.getElementById('habit-container');

const d = new Date();
const days = Array.from({length: new Date(d.getFullYear(),d.getMonth()+1,0).getDate()}, (_, i) => (i + 1).toString());
console.log('days',days);
var habits = '💧,🥗,💪,🧘';

var h = localStorage.getItem('habits');
if(h !== null) {
    habits = h;
} else {
    localStorage.setItem('habits', habits);
    days.forEach(day => {
        localStorage.setItem('habits-'+day,'');
    });
}

habitSetting.value = habits;

habitSetting.addEventListener('change',function() {
    habits = habitSetting.value;
    localStorage.setItem('habits', habits);
    renderHabits();
});

clear.addEventListener('click',function(e) {
    e.preventDefault();
    days.forEach(day => {
        localStorage.setItem('habits-'+day,'');
    });
    renderHabits();
    settings.classList.remove('open');
});

openSettings.addEventListener('click',function(e) {
    e.preventDefault();
    settings.classList.add('open');
    body.classList.add('modalOpen');
});

closeSettings.addEventListener('click',function(e) {
    e.preventDefault();
    settings.classList.remove('open');
    body.classList.remove('modalOpen');
});

openAbout.addEventListener('click',function(e) {
    e.preventDefault();
    about.classList.add('open');
    body.classList.add('modalOpen');
});

closeAbout.addEventListener('click',function(e) {
    e.preventDefault();
    about.classList.remove('open');
    body.classList.remove('modalOpen');
});

function renderHabits() {
    var th = '';
    habits.split(',').forEach(h => {
        th += '<th>' + h + '</th>';
    });
    habitContainer.innerHTML = '<td>&nbsp;</td>' + th + '</tr>';
    days.forEach(day => {
        var selected = localStorage.getItem('habits-' + day);
        var checkboxes = '';
        habits.split(',').forEach(h => {
            var checked = '';
            if(selected.indexOf(h) !== -1) {
                checked = ' checked="checked"';
            }
            checkboxes += '<td><input data-habit="' + h + '" data-day="' + day + '" type="checkbox"' + checked + ' /></td>';
        });
        habitContainer.innerHTML  = habitContainer.innerHTML + '<tr><th>' + day + '</th>' + checkboxes + '</tr>';
    });
    habitContainer.innerHTML = habitContainer.innerHTML + '<td>&nbsp;</td>' + th + '</tr>';

    document.querySelectorAll('input[type="checkbox"]').forEach(ch => {
        ch.addEventListener('change',function(e){
            const h = e.target.getAttribute('data-habit');
            const lsKey = 'habits-' + e.target.getAttribute('data-day');
            const selected = localStorage.getItem(lsKey);

            if(e.target.checked) {
               localStorage.setItem(lsKey, selected + h);
            } else {
               localStorage.setItem(lsKey, selected.replace(h,''));
            }
        });
    });
}

renderHabits();
