//loading
const model3d = document.querySelector(".container3d");
window.addEventListener("load", function () {
    if (model3d.style.display == "block") {
        document.querySelector(".loadingScreen").style.display = "none";
    }
});

//reload the page for every size
function reloadOnResize() {
    let width = window.innerWidth;
    window.addEventListener("resize", () => {
        if (window.innerWidth !== width) {
            width = window.innerWidth;
            location.reload();
        }
    });
}
reloadOnResize();

//Hamburger menu
const menuIcon = document.getElementsByTagName("svg")[1];
const menu = document.getElementsByClassName("menu")[0];

const isMobile = window.matchMedia("(max-width: 930px)").matches;

// Menu toggle
menuIcon.onclick = (e) => {
    e.stopPropagation(); 

    const isOpen = menu.classList.contains("open");

    if (isOpen) {
        menu.classList.remove("open");
        menuIcon.classList.remove("bx-x");
        setTimeout(() => {
            menu.style.display = 'none';
        }, 600); 
    } else {
        menu.style.display = 'flex';
        setTimeout(() => {
            menu.classList.add("open");
        }, 10); 
        menuIcon.classList.add("bx-x");
    }
};

// Close when clock outside menu
if (isMobile) {
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            if (menu.classList.contains("open")) {
                menu.classList.remove("open");
                menuIcon.classList.remove("bx-x");
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 600);
            }
        }
    });

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

//Buy section
let selectedColor = null;
const price = 549;
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.airpod-img').forEach(img => {
            img.style.opacity = '0';
        });
        const color = this.getAttribute('data-color');
        selectedColor = color;
        const selectedImg = document.querySelector(`.airpod-img.${color}`);
        if (selectedImg) {
            selectedImg.style.opacity = '1';
        }
    });
});

document.querySelector('.addBtn').addEventListener('click', function () {
    if (!selectedColor) {
        alert("Please select a color before adding to bag.");
        return;
    }
    const event = new CustomEvent('addToBag', {
        detail: {
            color: selectedColor,
            price: price
        }
    });
    window.dispatchEvent(event);
});