const sunrise = () => {
  console.log('sunrise called');

  const setStyles = (direction=1, play=0, duration=180000, delay=0) => {
    console.log('setStyles called')
    console.log(direction,play,duration,delay)
    const directionString = (direction > 0) ? 'forwards' : 'reverse';
    const playString = (play === 0) ? 'paused' : 'running';
    let inlineStyles = document.querySelector('#sun');
    console.log(inlineStyles);
    window.requestAnimationFrame (() =>
      inlineStyles.innerHTML =
          `body {
            animation: ${duration}ms sunset ${delay}ms 1 ${directionString} ${playString};
          }
          .column::after {
            animation: ${duration}ms sunsetHover ${delay}ms 1 ${directionString} ${playString};
          }`
    );
  }

  let now = new Date()
  const times = SunCalc.getTimes(new Date(), 41.5, -87.4);
  const valuesNeeded = [times.sunrise, times.sunriseEnd, times.sunsetStart, times.sunset];
  console.log(valuesNeeded);
  if (valuesNeeded.some(value => typeof value.getTime() !== 'number')) {
    console.error('invalid sun calculations');
    return;
  }

  // order of events: sunrise, sunriseEnd, sunsetStart, sunset

  if (now < times.sunrise) {
    console.log('pre-sunrise');
    const timeToSunrise = (times.sunrise - now);
    const sunriseDuration = (times.sunriseEnd - times.sunrise);
    setStyles(-1, 0);
    window.setTimeout(
      () => setStyles(-1, 1, sunriseDuration),
      timeToSunrise
    );
    // break?
  }
  else if (now < times.sunriseEnd) {
    console.log('sunrise in progress');
    const sunriseDuration = (times.sunriseEnd - times.sunrise);
    const sunriseElapsed = (times.sunrise - now);
    setStyles(-1, 1, sunriseDuration, sunriseElapsed);
  }
  else if (now < times.sunsetStart) {
    console.log('during the day');
    const timeToSunset = (times.sunset - now);
    const sunsetDuration = (times.sunset - times.sunsetStart);
    console.log('timeToSunset', timeToSunset, 'sunsetDuration', sunsetDuration)
    setStyles(1, 0);
    window.setTimeout(
      () => setStyles(1, 1, sunsetDuration),
      timeToSunset
    );
  }
  else if (now < times.sunset) {
    console.log('sunset in progress');
    const sunsetDuration = (times.sunset - times.sunsetStart);
    const sunsetElapsed = (times.sunsetStart - now);
    setStyles(1, 1, sunsetDuration, sunsetElapsed);
  }
  else {
    console.log('post-sunset');
    // alternatively, get tomorrow's sunrise
    setStyles(-1, 0);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  sunrise();
  window.setInterval(sunrise, 60 * 60 * 1000);
});