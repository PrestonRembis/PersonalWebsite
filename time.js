// Show the visitor's local time on the home page
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
    document.getElementById('current-time').textContent = `Current time: ${timeString}`;
}

updateTime();
setInterval(updateTime, 30000);
