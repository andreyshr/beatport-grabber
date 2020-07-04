export default function showNotification(message) {
    return `
        document.body.insertAdjacentHTML('afterbegin', '<p id="bp-extension-notification" style="position: fixed; top: 10px; right: 10px; width: 250px; z-index: 1000; font-size: 16px; text-align: center; padding: 16px; background: #ff53a0">${message}</p>');
        setTimeout(() => {
            const notification = document.querySelector('#bp-extension-notification');
            notification.remove();
        }, 2000);
    `;
}
