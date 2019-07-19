// DIS GOTTA BE GLOBAL
var timer;

var pomodoro = {

  sessionLength: 25,

  sessionController: function(value){
    this.sessionLength += value;
    if(this.sessionLength === 0){this.sessionLength += 1}
    $('.work #work-time').html(this.sessionLength);
  },

  breakLength: 5,

  breakController: function(value){
    this.breakLength += value;
    if(this.breakLength === 0){this.breakLength += 1}
    $('.break #break-time').html(this.breakLength);
  },

  // Time used for countdown(), gotta keep it outside of countdown().
  mins: 0,

  secs: 0,

  // tracks between states
  worktime: false,

  // tracks if clock is ticking
  isCounting: false,

  // ticks down the timer every second since this is only called with setInterval
  countdown: function(){
    
    this.iscounting = true;
    //decrements the mins when secs hits 0
    if(pomodoro.secs === 0){
      //calls switch when both mins and secs are at 0
      if(pomodoro.mins === 0){
        pomodoro.switch()
      };
      pomodoro.secs = 60;
      pomodoro.mins--;
    };

    pomodoro.secs--;

    // Adds colons between mins and secs, and adds a 0 for single digit secs
    if(pomodoro.secs < 10){$('#timer').html(pomodoro.mins + ":0" + pomodoro.secs);}
      else{$('#timer').html(pomodoro.mins + ':' + pomodoro.secs);};

  },

  // Switches between work time and break time
  switch: function(){
    this.clear();
    if(this.worktime){
      this.worktime = false
      this.mins = this.breakLength;
      $('#status').html('Take it easy...')
    }else{
      this.worktime = true;
      this.mins = this.sessionLength;
      $('#status').html('Time to work!')
    }
    this.secs = 0;
    $('#timer').html(this.mins + ':00');
    timer = setInterval(this.countdown, 1000);
  },

  // Clears setInterval
  clear: function(){
    clearInterval(timer);
    this.iscounting = false;
    $('#status').html('');
    $('#timer').html('');
  },

  // don't be fooled by the name, this just pauses the timer
  stop: function(){
    this.clear();
    $('#timer').html(this.mins + ':' + this.secs);
  },

  // may or may not resume the timer, depending on weather or not it's called
  resume: function(){
    this.clear();
    timer = setInterval(this.countdown, 1000);
  },

  // resets the timer, session and break length
  reset: function(){
    this.clear();
    this.sessionLength = 25;
    this.breakLength = 5;  
    this.breakController(0);
    this.sessionController(0);
    this.mins = this.sessionLength;
    $('#status').html('');
    $('#timer').html('');
    this.secs = 0;
  }
} 


$(document).ready(function(){

  $('.work .minus').on('click', function(){
    pomodoro.sessionController(-1);
  });

  $('.work .plus').on('click', function(){
    pomodoro.sessionController(1);
  });

  $('.break .minus').on('click', function(){
    pomodoro.breakController(-1);
  });

  $('.break .plus').on('click', function(){
    pomodoro.breakController(1);
  });

  $('.start').on('click', function(){
    pomodoro.switch();
  });

  $('.reset').on('click', function(){
    pomodoro.reset();
  });

});