function removeLetters(e){
    const input = e.target;
    input.value = input.value.replace(/\D/g, ''); // Removes any char that is not a number
}

// Add the event listener to all desired input fields using a loop or class selector
const inputFields = document.querySelectorAll('#zipCode, #phone, #card');

for (const inputField of inputFields) {
  inputField.addEventListener('input', removeLetters);
}