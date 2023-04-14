const displayNotification = (status, message) => {
    const notificationsWrapper = document.getElementById('auth-notifications');

    const notification = document.createElement('div');
    notification.classList.add('auth-notification');

    if (status === 'SUCCESS') notification.classList.add('auth-notification--success');
    if (status === 'ERROR') notification.classList.add('auth-notification--error');

    notification.textContent = message;

    notificationsWrapper.appendChild(notification);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = decodeURIComponent(urlParams.get('message'));

    if (status && message) {
        displayNotification(status, message);
    }
})