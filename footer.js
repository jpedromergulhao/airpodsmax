//Footer links 
document.querySelectorAll('.linkSection h6').forEach((h6) => {
    h6.addEventListener('click', function () {
        this.parentElement.classList.toggle('active');
    });
});
