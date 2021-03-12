// setting global variables
var timeDisplayEl = $("#time-display");
var currentHour = getHour();
var tasks = [];

function displayTime() {
  var now = moment().format("MMMM Do YYYY, h:mm:ss a");
  timeDisplayEl.text(now);
}

setInterval(displayTime, 1000);

// get current number of hours
function getHour() {
  return moment().hour();
}

$(document).ready(function () {
  // event listener for save button
  $(".saveBtn").on("click", function () {
    var task = $(this).prev().val();
    var time = $(this).parent().attr("id");
    var completed = {
      task: task,
      time: time,
    };
    populateStorage(completed);
  });

  // save to local storage
  function populateStorage(completed) {
    tasks.push(completed);
    localStorage.setItem("completed", JSON.stringify(tasks));
    getStorage();
  } // get from local storage
  function getStorage() {
    if (localStorage.getItem("completed")) {
      tasks = JSON.parse(localStorage.getItem("completed"));
    }
  }
  getStorage();

  $(".time-block").each(function () {
    const currentElement = $(this).attr("id");

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].time === currentElement) {
        console.log(tasks[i], currentElement);
        $(this).children("textarea").text(tasks[i].task);
      }
    }
    var toDoTime = currentElement;
    // conditional statements to set formatting
    if (toDoTime == currentHour) {
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    } else if (toDoTime < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    } else {
      $(this).addClass("future");
      $(this).removeClass("present");
      $(this).removeClass("past");
    }
  });
});
