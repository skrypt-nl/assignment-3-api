// Check if a user has succesfully logged in or not, and subsequently shows a 'SUCCESS or 'ERROR' message to the user

const displayNotification = (status, message) => {
    const notificationsWrapper = document.getElementById('auth-notifications');

    const notification = document.createElement('div');
    notification.classList.add('auth-notification');

    if (status === 'SUCCESS') notification.classList.add('auth-notification--success');
    if (status === 'ERROR') notification.classList.add('auth-notification--error');

    notification.textContent = message;

    notificationsWrapper.appendChild(notification);
}

const setFromUrl = (url) => {
    const loginForm = document.getElementById('login');

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.value = url;
    hiddenInput.name = 'from';
    hiddenInput.id = 'from';

    loginForm.appendChild(hiddenInput);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    const fromUrl = urlParams.get('from');

    if (status && message) {
        displayNotification(status, decodeURIComponent(message));
    }

    if (fromUrl) {
        setFromUrl(decodeURIComponent(fromUrl));
    }
})