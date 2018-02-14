var TIMEOUT_IN_SECS = 3 * 60
var ALERT_TIMEOUT = 30
var TEMPLATE = '<span class="js-timer-minutes">00</span>:<span class="js-timer-seconds">00</span>'
var MESSAGES = ["Четкая цель — первый шаг к любому достижению.", 
"Говорят, что мотивация длится не долго. Что ж, свежесть после ванны — тоже. Поэтому заботиться о них стоит ежедневно.",
"Поверьте, что сможете, и пол пути уже пройдено.",
"Если вам предложили место на космическом корабле, не спрашивайте, какое место! Запрыгивайте внутрь!",
"Почувствуйте попутный ветер в вашем парусе. Двигайтесь. Если нет ветра, беритесь за весла.",
"Единственный способ сделать выдающуюся работу — искренне любить то, что делаешь.",
"Если ты можешь что-то представить — ты можешь этого достичь!",
"Осуществляйте свои мечты, или кто-то наймет вас для осуществления своих."]

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

class Timer{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs){
    this.initial_timeout_in_secs = timeout_in_secs
    this.reset()
  }
  getTimestampInSecs(){
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds/1000)
  }
  start(){
    if (this.isRunning)
      return
    this.timestampOnStart = this.getTimestampInSecs()
    this.isRunning = true
  }
  stop(){
    if (!this.isRunning)
      return
    this.timeout_in_secs = this.calculateSecsLeft()
    this.timestampOnStart = null
    this.isRunning = false
  }
  reset(timeout_in_secs){
    this.isRunning = false
    this.timestampOnStart = null
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
  calculateSecsLeft(){
    if (!this.isRunning)
      return this.timeout_in_secs
    var currentTimestamp = this.getTimestampInSecs()
    var secsGone = currentTimestamp - this.timestampOnStart
    return Math.max(this.timeout_in_secs - secsGone, 0)
  }
  update(timeout_in_secs){
    this.initial_timeout_in_secs = timeout_in_secs
    this.timestampOnStart = this.getTimestampInSecs()
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
}

class TimerWidget{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct(){
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
  mount(rootTag){
    if (this.timerContainer)
      this.unmount()

    // adds HTML tag to current page
    this.timerContainer = document.createElement('div')

    this.timerContainer.setAttribute("style", 
                                     "margin-top: 46px;"+ 
                                     "margin-left: 22px;"+
                                     "position: fixed;"+
                                     "z-index: 99;"+
                                     "background: white;"+
                                     "font-size: 24px;"+
                                     "color: #444;"+
                                     "font-family: 'Fira Sans',sans-serif;");
    this.timerContainer.innerHTML = TEMPLATE

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild)

    this.minutes_element = this.timerContainer.getElementsByClassName('js-timer-minutes')[0]
    this.seconds_element = this.timerContainer.getElementsByClassName('js-timer-seconds')[0]
  }
  update(secsLeft){
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes)
    this.seconds_element.innerHTML = padZero(seconds)
  }
  unmount(){
    if (!this.timerContainer)
      return
    this.timerContainer.remove()
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
}


function main(){

  var timer = new Timer(TIMEOUT_IN_SECS)
  var timerWiget = new TimerWidget()
  var intervalId = null

  timerWiget.mount(document.body)

  function getRandomMessage(){
    var title = document.title + "\n";
    var index = Math.floor(Math.random() * MESSAGES.length);
    var message = "Хватит читать " + title + MESSAGES[index] 
    return message
  }

  function handleIntervalTick(){
    var secsLeft = timer.calculateSecsLeft()
    timerWiget.update(secsLeft)
    if (secsLeft <= 0){
      alert(getRandomMessage())
      timer.update(ALERT_TIMEOUT)
    }
  }

  function handleVisibilityChange(){
    if (document.hidden) {
      timer.stop()
      clearInterval(intervalId)
      intervalId = null
    } else {
      timer.start()
      intervalId = intervalId || setInterval(handleIntervalTick, 300)
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange()
}

// initialize timer when page ready for presentation
window.addEventListener('load', main)
