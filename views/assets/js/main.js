function movePhotosElement() {
    var windowWidth = window.innerWidth;
    var animateOnScroll = document.querySelector('.animate-on-scroll');
    var photosElement = document.querySelector('.wrapper-title__photos');
    var h1Element = animateOnScroll.querySelector('h1');
    var pElement = animateOnScroll.querySelector('p');

    // Видалення елементу перед вставкою
    if (photosElement.parentNode) {
        photosElement.parentNode.removeChild(photosElement);
    }

    if (windowWidth < 431) {
        // Вставка між h1 та p
        animateOnScroll.insertBefore(photosElement, pElement);
    } else {
        // Вставка перед .blocksForTitle
        animateOnScroll.insertBefore(photosElement, h1Element.nextSibling);
    }

}

if (window.innerWidth < 431) {
    window.onload = function () {
        movePhotosElement();
    };
}


const header = document.querySelector('header');

let lastScrollPosition = window.scrollY;

window.onscroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        // Прокрутка вниз: ховаємо хедер плавно
        header.style.transition = 'opacity 0.5s ease';
        header.style.visibility = "hidden"
        header.style.opacity = 0;
    } else {
        // Прокрутка вгору: показуємо хедер плавно
        header.style.transition = 'opacity 0.9s ease';
        header.style.opacity = 1;
        header.style.visibility = "visible";
    }

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScrollPosition = currentScrollPosition;
};

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger-wrapper');
    const Burger = document.querySelector('.burger')
    const navigate = document.querySelector('.block-navigation');
    const header = document.querySelector('header')

    burger.addEventListener('click', function () {
        navigate.classList.toggle('menu-opened');
        header.classList.toggle('menu-opened');
        burger.classList.toggle('menu-opened');
    });

    Burger.addEventListener('click', function () {
        Burger.classList.toggle('clicked');
    });
});


const elements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Виконати анімацію, коли елемент стає видимим
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

elements.forEach((element) => {
    observer.observe(element);
});

document.addEventListener('DOMContentLoaded', function () {
    var scrollTriggers = document.querySelectorAll('.AnimRight, .AnimLeft');

    function handleScroll() {
        scrollTriggers.forEach(function (trigger) {
            var triggerPosition = trigger.getBoundingClientRect().top;
            var triggerOffset = 200; // Додайте або відніміть значення, яке регулює час появи анімації

            if (triggerPosition < window.innerHeight - triggerOffset) {
                trigger.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    var animatedElements = document.querySelectorAll(".animated");

    function isElementInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateIfVisible() {
        animatedElements.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", animateIfVisible);
    animateIfVisible(); // Перевірити відразу при завантаженні сторінки
});


document.addEventListener('DOMContentLoaded', function () {
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const galleryButtonLeft = document.querySelectorAll('.gallery-button-left, .gallery-button-mobile-left');
    const galleryButtonRight = document.querySelectorAll('.gallery-button-right, .gallery-button-mobile-right');

    galleryButtonLeft.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollGallery(-getScrollAmount());
        });
    });

    galleryButtonRight.forEach(function (button) {
        button.addEventListener('click', function () {
            scrollGallery(getScrollAmount());
        });
    });

    function getScrollAmount() {
        const firstGalleryElement = document.querySelector('.galleryElement1');
        return firstGalleryElement.offsetWidth + 20; // Змінено на ширину першого елемента
    }

    function scrollGallery(amount) {
        const currentScrollLeft = galleryWrapper.scrollLeft;
        const targetScrollLeft = currentScrollLeft + amount;
        const maxScrollLeft = galleryWrapper.scrollWidth - galleryWrapper.clientWidth;

        if (targetScrollLeft < 0) {
            galleryWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (targetScrollLeft > maxScrollLeft) {
            galleryWrapper.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            galleryWrapper.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.getElementById("scrollContainer");

    // Функція для перевірки ширини екрану і встановлення/видалення класу grabbing
    function checkScreenWidth() {
        if (window.innerWidth > 1790) {
            scrollContainer.classList.remove("grabbing");
        } else {
            scrollContainer.classList.add("grabbing");
        }
    }

    // Виклик функції при завантаженні сторінки та при зміні розміру вікна
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    scrollContainer.addEventListener("mousedown", function () {
        if (window.innerWidth <= 1790) {
            scrollContainer.classList.add("grabbing");
        }
    });

    document.addEventListener("mouseup", function () {
        scrollContainer.classList.remove("grabbing");
    });

    document.addEventListener("mousemove", function () {
        if (scrollContainer.classList.contains("grabbing")) {
            scrollContainer.classList.add("scaled");
        }
    });

    scrollContainer.addEventListener("selectstart", function (e) {
        e.preventDefault();
        return false;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var textElements = document.querySelectorAll(".galleryElement1__text");

    textElements.forEach(function (element) {
        if (element.scrollHeight > element.clientHeight) {
            element.classList.add("expanded");
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const galleryElements = document.querySelectorAll(".galleryElement1__img img");
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");

    galleryElements.forEach(function (element) {
        element.addEventListener("click", function () {
            const imageURL = element.getAttribute("src");
            popupImage.setAttribute("src", imageURL);
            popup.classList.add("open");
        });
    });

    popup.addEventListener("click", function () {
        popup.classList.remove("open");
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const galleryElements = document.querySelectorAll(".galleryElement1");
//     const popup = document.getElementById("popup");
//     const popupContent = document.querySelector(".popup-content");

//     galleryElements.forEach(function (element) {
//         element.addEventListener("click", function () {
//             // Clone the clicked gallery element and its content
//             const clonedElement = element.cloneNode(true);
//             // Remove any previous content in the popup
//             popupContent.innerHTML = "";
//             // Append the cloned element to the popup
//             popupContent.appendChild(clonedElement);
//             // Show the popup
//             popup.classList.add("open");
//         });
//     });

//     popup.addEventListener("click", function () {
//         // Close the popup when clicked outside of the content
//         if (event.target === popup) {
//             popup.classList.remove("open");
//         }
//     });
// });
