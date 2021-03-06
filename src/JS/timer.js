import refs from './refs.js';

let intervalId = null;
refs.input.valueAsDate = new Date();

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  count() {
    const timeDif = new Date(this.targetDate) - Date.now();
    const timer = this.getCretedTime(timeDif);

    refs.days.textContent = timer.days;
    refs.hours.textContent = timer.hours;
    refs.minutes.textContent = timer.mins;
    refs.seconds.textContent = timer.secs;
  }

  getCretedTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }

  reset(...arr) {
    return arr.map(el => (el.textContent = '00'));
  }

  start() {
    if (intervalId) return;

    let dif = new Date(this.targetDate) - Date.now();
    if (dif < 0) {
      alert('Please, choose future date');
      dif = 0;
      return;
    }

    intervalId = setInterval(() => {
      this.count();
    }, 1000);
  }

  stop() {
    const { days, hours, minutes, seconds } = refs;
    clearInterval(intervalId);
    intervalId = null;
    this.reset(days, hours, minutes, seconds);
    refs.input.valueAsDate = new Date();
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2021-04-10'),
});

refs.start.addEventListener('click', () => {
  timer.targetDate = refs.input.value;
  timer.start();
});

refs.stop.addEventListener('click', () => {
  timer.stop();
});
