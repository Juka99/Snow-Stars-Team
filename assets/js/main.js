const swup = new Swup();

function globalInit() {
    // Loader

    let getLoader = document.querySelector('.loader');

    let getLoaderPercentage = document.querySelector('.loader__loading-bar-percentage-value');
    let getLoaderPercentageValue = Number(getLoaderPercentage.innerHTML);

    let innerLoaderBar = document.querySelector('.loader__loading-bar-inner');

    // getLoader.classList.add('is-active');
    // initLoader();

    if(localStorage) {
        let getHour = new Date().getHours();

        if(localStorage.getItem('skiKopaonikLoaderTimer')) {
            let getLocalStorageHours = localStorage.getItem('skiKopaonikLoaderTimer');

            if(getLocalStorageHours != getHour) {
                localStorage.setItem('skiKopaonikLoaderTimer', getHour);
                getLoader.classList.add('is-active');
                initLoader();
            }
        }
        else {
            localStorage.setItem('skiKopaonikLoaderTimer', getHour);
            getLoader.classList.add('is-active');
            initLoader();
        }
    }

    function initLoader() {
        let blurryOverlay = document.createElement('div');
        blurryOverlay.classList.add('overlay');
        blurryOverlay.classList.add('is-active');
        document.body.appendChild(blurryOverlay);
        setTimeout(() => {
            blurryOverlay.classList.remove('is-active');
            setTimeout(() => {
                blurryOverlay.remove();
            }, 500);
        }, 4200);

        getLoaderPercentageValue = 0;
        let percentageInterval = setInterval(() => {
            getLoaderPercentageValue++;
            getLoaderPercentage.innerHTML = getLoaderPercentageValue;
            innerLoaderBar.style.width = `${getLoaderPercentageValue}%`;
            if(getLoaderPercentageValue == 100) {
                innerLoaderBar.style.width = `100%`;
                setTimeout(() => {
                    getLoader.classList.remove('is-active');
                }, 300);
                clearInterval(percentageInterval);
            }
        }, 30);
    }


    // Navigation

    let getNavigation = document.querySelector('.navigation');
    let getNavigationBurger = document.querySelector('.navigation-burger');
    let getSublistLinks = document.querySelectorAll('.navigation__list-link--has-sublist');

    let getScrollPosition = 0;

    document.body.addEventListener('click', (event) => {
        if(event.target.classList.contains('navigation-burger')) {
            return;
        }
        if(!event.target.closest('.navigation')) {
            getNavigation.classList.remove('is-active');
            getNavigationBurger.classList.remove('is-active');
        }
    })

    getNavigationBurger.addEventListener('click', () => {
        getNavigation.classList.toggle('is-active');
        getNavigationBurger.classList.toggle('is-active');
    })

    window.addEventListener('scroll', () => {
        getScrollPosition = document.documentElement.scrollTop;
        attachDetachNavigation();
        backToTopShowHide();
    })

    function attachDetachNavigation() {
        getScrollPosition > 150 ? getNavigation.classList.add('is-detached') : getNavigation.classList.remove('is-detached');
    }

    for(let sublistLink of getSublistLinks) {

        sublistLink.addEventListener('mouseover', () => {
            let getSublistHeight;
            let getNearestSublist = sublistLink.nextElementSibling;
            getNearestSublist.style.height = 'auto';
            getSublistHeight = getNearestSublist.offsetHeight;
            
            if(window.getComputedStyle(getNearestSublist).opacity == '0') {
                getNearestSublist.style.height = '0';
            }
    
            setTimeout(() => {
                getNearestSublist.style.height = `${getSublistHeight}px`;
            }, 100);
        })
    
        sublistLink.addEventListener('mouseout', () => {
            let getNearestSublist = sublistLink.nextElementSibling;
            setTimeout(() => {
                getNearestSublist.style.height = `0`;
            }, 100);
        })
    }


    // Back to top

    let getBackToTopButton = document.querySelector('.back-to-top');
    let getMainSectionButton = document.querySelector('.main-section__button');

    getBackToTopButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })

    function backToTopShowHide() {
        if(getScrollPosition >= 450) {
            getBackToTopButton.classList.add('is-active');
            if(getMainSectionButton) {
                getMainSectionButton.classList.add('is-inactive');
            }
        }
        else {
            getBackToTopButton.classList.remove('is-active');
            if(getMainSectionButton) {
                getMainSectionButton.classList.remove('is-inactive');
            }
        }
    }

    // Accordions

    getAllAccordions = document.querySelectorAll('.accordion__container');

    for(let accordion of getAllAccordions) {
        accordion.querySelector('.accordion__title-container').addEventListener('click', function() {
            accordion.classList.toggle('is-active');
            
            let getAccordionContent = accordion.querySelector('.accordion__content');
            let getAccordionContentHeight;

            if(accordion.classList.contains('is-active')) {
                getAccordionContent.style.height = 'auto';
                getAccordionContentHeight = getAccordionContent.offsetHeight;
                getAccordionContent.style.height = '0';

                setTimeout(() => {
                    getAccordionContent.style.height = `${getAccordionContentHeight}px`;
                }, 0);
            }
            else {
                getAccordionContent.style.height = '0';
            }
        })
    }

    // Contact
    let getContact = document.querySelector('.contact-overlay');
    let getContactClose = document.querySelector('.contact-overlay__close');
    let getContactButtonNavigation = document.querySelector('.navigation__list-link--contact');

    getContactButtonNavigation.addEventListener('click', () => {
        getContact.classList.add('is-active');
    });

    getContact.addEventListener('click', (e) => {
        if(!e.target.closest('.contact-overlay__content')) {
            getContact.classList.remove('is-active');
        }
    });

    getContactClose.addEventListener('click', () => {
        getContact.classList.remove('is-active');
    });
}

globalInit();

// SWUP

swup.on('contentReplaced', function() {
    window.scrollTo(0, 0);
    globalInit();
})