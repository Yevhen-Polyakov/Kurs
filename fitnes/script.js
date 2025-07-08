
document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

  
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        
        if (!item.classList.contains('active')) {
            answer.style.maxHeight = '0px';
        }
        
        question.addEventListener('click', function(e) {
            e.preventDefault();
            
           
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
            } else {
                
                item.classList.add('active');
                
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                
                setTimeout(() => {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = 'auto';
                    }
                }, 400);
            }
        });
    });

   
    function handleScrollAnimations() {
        const sectionEleven = document.querySelector('.section-eleven');
        
        if (sectionEleven && !sectionEleven.classList.contains('animate-in')) {
            const sectionTop = sectionEleven.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            
            if (sectionTop < windowHeight * 0.8) {
                sectionEleven.classList.add('animate-in');
            }
        }
    }

    
    function handleImageScaleAnimation() {
        const contentImg = document.querySelector('.content-img img');
        
        if (contentImg) {
            const scrollY = window.scrollY;
            
            
            if (scrollY > 100) {
                contentImg.classList.add('scale-animation');
                console.log('Scale animation added at scroll:', scrollY);
            } else {
                contentImg.classList.remove('scale-animation');
                if (scrollY <= 100) {
                    console.log('Scale animation removed at scroll:', scrollY);
                }
            }
        } else {
            console.log('Content image not found');
        }
    }

    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    
    handleScrollAnimations();
    handleImageScaleAnimation();
    
    
    const throttledScrollHandler = throttle(function() {
        handleScrollAnimations();
        handleImageScaleAnimation();
    }, 16); 
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Аккордеон для модулей курса
    const modules = document.querySelectorAll('.module');
    
    modules.forEach(module => {
        const button = module.querySelector('.module__btn_item');
        const detail = module.querySelector('.module__detail');
        
        // Скрываем детали по умолчанию
        if (detail && !module.classList.contains('active')) {
            detail.style.overflow = 'hidden';
            detail.style.opacity = '0';
            detail.style.visibility = 'hidden';
            detail.style.transform = 'translateY(-20px)';
            detail.style.transition = 'all 0.4s ease-in-out';
        }
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Закрываем все остальные модули
                modules.forEach(otherModule => {
                    if (otherModule !== module && otherModule.classList.contains('active')) {
                        otherModule.classList.remove('active');
                        const otherDetail = otherModule.querySelector('.module__detail');
                        if (otherDetail) {
                            otherDetail.style.opacity = '0';
                            otherDetail.style.visibility = 'hidden';
                            otherDetail.style.transform = 'translateY(-20px)';
                        }
                    }
                });
                
                // Переключаем текущий модуль
                const isActive = module.classList.contains('active');
                
                if (isActive) {
                    // Закрываем
                    module.classList.remove('active');
                    if (detail) {
                        detail.style.opacity = '0';
                        detail.style.visibility = 'hidden';
                        detail.style.transform = 'translateY(-20px)';
                    }
                } else {
                    // Открываем
                    module.classList.add('active');
                    if (detail) {
                        detail.style.opacity = '1';
                        detail.style.visibility = 'visible';
                        detail.style.transform = 'translateY(0)';
                        
                        // Плавный скролл к открытому модулю
                        setTimeout(() => {
                            module.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                        }, 200);
                    }
                }
            });
        }
    });
});

