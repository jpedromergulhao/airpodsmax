export default function createAlert(message) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.setAttribute('role', 'alert');
    alertBox.textContent = `!! ${message} !!`;

    document.body.appendChild(alertBox);

    //removes the alert after 3 seconds
    setTimeout(() => {
        alertBox.classList.add('fade-out'); //class to fade out animation
        setTimeout(() => alertBox.remove(), 300);
    }, 3000);
}