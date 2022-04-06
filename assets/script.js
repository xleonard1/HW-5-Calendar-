var dayDisplayEl = $('#currentDay');
var timeDisplayEl = $('#currentTime');
var saveButtonEl = $('.saveBtn');
var textArea = $('.textarea');
var p = $('p');
// handle displaying the date and time
function displayTime() {
    var rightNow = moment().format('MMM Do YYYY');
   var time = moment().hour('H');
   timeDisplayEl.text(time);
    dayDisplayEl.text(rightNow);
}
setInterval(displayTime, 1000);


function checkTime() {
    var timeNow = moment().format('H');
    var timeBlockElements = $(".textarea");
    var localStorageTime = window.localStorage.getItem('time') || {};
    var parsedTime = JSON.parse(localStorageTime);

    for (var i = 0; i < timeBlockElements.length; i++) {
        var elementID = timeBlockElements[i].id;
        var manipID = document.getElementById(timeBlockElements[i].id);
        var parent = $(timeBlockElements[i]).parent();
        var dataTime = parent.attr('data-time');
        var message = parsedTime[dataTime];
        if (message) {
            $(timeBlockElements[i]).val(message);
        }


        $(timeBlockElements[i].id).removeClass(".present .past .future");

        if(elementID < timeNow) {
            $(manipID).addClass('past');
        } else if (elementID > timeNow) {
            $(manipID).addClass('future');
        } else {
            $(manipID).addClass('present');
        }
    }
}

setInterval(checkTime(), (1000*60) * 3);

function handleFormSubmit (element) {
    

    var textarea = $(element).prev('.textarea');

    console.log(textarea.val());

    var parent = $(element).parent();
    var time = parent.attr('data-time');
    var localStoragetime = window.localStorage.getItem('time');
    var parseTime = {};
    if(localStoragetime){
        parseTime = JSON.parse(localStoragetime);
    } 
    
    parseTime[time] = textarea.val();

    window.localStorage.setItem('time', JSON.stringify(parseTime));

    console.log(parent);
}

saveButtonEl.on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var buttonClicked = event.target;
    handleFormSubmit(buttonClicked);
})  
