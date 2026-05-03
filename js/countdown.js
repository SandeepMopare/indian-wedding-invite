function startCountdown(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  function updateCountdown() {
    const now = Date.now();
    const difference = targetTime - now;

    if (difference <= 0) {
      elements.days.textContent = "0";
      elements.hours.textContent = "0";
      elements.minutes.textContent = "0";
      elements.seconds.textContent = "0";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    elements.days.textContent = days;
    elements.hours.textContent = hours;
    elements.minutes.textContent = minutes;
    elements.seconds.textContent = seconds;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

startCountdown("2026-05-03T12:35:00");
