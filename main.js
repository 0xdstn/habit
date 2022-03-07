if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
};

const settings = document.getElementById('settings');
const openSettings = document.getElementById('open-settings');
const closeSettings = document.getElementById('close-settings');
const clear = document.getElementById('clear');
const about = document.getElementById('about');
const openAbout = document.getElementById('open-about');
const closeAbout = document.getElementById('close-about');
const habitSetting = document.getElementById('habit-setting');
const habitContainer = document.getElementById('habit-container');

const wks = ['MO','TU','WE','TH','FR','SA','SU'];
var habits = '💧,🥗,💪,🧘';

var h = localStorage.getItem('habits');
if(h !== null) {
    habits = h;
} else {
    localStorage.setItem('habits', habits);
    wks.forEach(wk => {
        localStorage.setItem('habits-'+wk,'');
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
    wks.forEach(wk => {
        localStorage.setItem('habits-'+wk,'');
    });
    renderHabits();
    settings.classList.remove('open');
});

openSettings.addEventListener('click',function(e) {
    e.preventDefault();
    settings.classList.add('open');
});

closeSettings.addEventListener('click',function(e) {
    e.preventDefault();
    settings.classList.remove('open');
});

openAbout.addEventListener('click',function(e) {
    e.preventDefault();
    about.classList.add('open');
});

closeAbout.addEventListener('click',function(e) {
    e.preventDefault();
    about.classList.remove('open');
});

function renderHabits() {
    var th = '';
    habits.split(',').forEach(h => {
        th += '<th>' + h + '</th>';
    });
    habitContainer.innerHTML = '<td>&nbsp;</td>' + th + '</tr>';
    wks.forEach(wk => {
        var selected = localStorage.getItem('habits-' + wk);
        var checkboxes = '';
        habits.split(',').forEach(h => {
            var checked = '';
            if(selected.indexOf(h) !== -1) {
                checked = ' checked="checked"';
            }
            checkboxes += '<td><input data-habit="' + h + '" data-wk="' + wk + '" type="checkbox"' + checked + ' /></td>';
        });
        habitContainer.innerHTML  = habitContainer.innerHTML + '<tr><th>' + wk + '</th>' + checkboxes + '</tr>';
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(ch => {
        ch.addEventListener('change',function(e){
            const h = e.target.getAttribute('data-habit');
            const lsKey = 'habits-' + e.target.getAttribute('data-wk');
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
