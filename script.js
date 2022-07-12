const sunrise = () => {
  console.log('window ready');
  // get the last inline style tag
  let inlineStyles = document.querySelector('#sun');
  console.log(inlineStyles);
  let now = new Date()
  const times = SunCalc.getTimes(new Date(), 41.5, -87.4);
  console.log(now, times.sunrise, times.sunsetEnd);
  if ((now < times.sunrise) || (now > times.sunset)) {
    console.log('dark')
    inlineStyles.innerHTML = ('body { animation: 60s sunset 1 reverse paused; } .column::after { animation: 60s sunsetHover 1 reverse paused; }')
  } else if ((now > times.sunriseEnd) && (now < times.sunsetStart)) {
    console.log('light')
    inlineStyles.innerHTML = ('body { animation: 60s sunset 1 forwards paused; } .column::after { animation: 60s sunsetHover 1 forwards paused; }')
  } else console.log(now)
}

window.addEventListener('DOMContentLoaded', sunrise);