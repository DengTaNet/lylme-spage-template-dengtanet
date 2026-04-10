/**
 * Spaceship 主题 v1.1 - 交互脚本
 * 深色太空风格导航起始页
 * 增强动态动画效果
 */

(function () {
    'use strict';

    // ==============================
    // 搜索引擎切换
    // ==============================
    var engineBtns = document.querySelectorAll('.sp-engine-btn');
    var searchForm = document.getElementById('super-search-fm');
    var searchInput = document.getElementById('search-text');
    var currentEngineUrl = 'https://www.bing.com/search?q=';

    function initEngines() {
        if (engineBtns.length === 0) return;
        var savedType = localStorage.getItem('superSearchtype');
        var firstBtn = engineBtns[0];
        if (savedType) {
            engineBtns.forEach(function (btn) {
                if (btn.dataset.url === savedType) firstBtn = btn;
            });
        }
        activateEngine(firstBtn);
    }

    function activateEngine(btn) {
        engineBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentEngineUrl = btn.dataset.url;
        searchInput.placeholder = btn.dataset.placeholder || '搜索一下';
        searchForm.action = currentEngineUrl;
        localStorage.setItem('superSearchtype', currentEngineUrl);
    }

    engineBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activateEngine(btn);
            searchInput.focus();
        });
    });

    // ==============================
    // 搜索建议 (百度 Sug)
    // ==============================
    var wordList = document.getElementById('word');
    var selectedWordIndex = -1;
    var ignoreKeyEvents = false;

    searchInput.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault(); selectPrevWord(); fillSelectedWord(); break;
            case 'ArrowDown':
                e.preventDefault(); selectNextWord(); fillSelectedWord(); break;
            case 'Escape':
                hideSuggestions(); break;
            default:
                ignoreKeyEvents = false; break;
        }
    });

    searchInput.addEventListener('keyup', function () {
        if (ignoreKeyEvents) return;
        var keywords = searchInput.value.trim();
        if (keywords === '') { hideSuggestions(); return; }
        if (window.jQuery) {
            $.ajax({
                url: 'https://suggestion.baidu.com/su?wd=' + encodeURIComponent(keywords),
                dataType: 'jsonp', jsonp: 'cb', timeout: 3000,
                success: function (data) {
                    wordList.innerHTML = '';
                    if (data.s && data.s.length > 0) {
                        data.s.forEach(function (item) {
                            var li = document.createElement('li');
                            li.textContent = item;
                            wordList.appendChild(li);
                        });
                        showSuggestions();
                    } else { hideSuggestions(); }
                    selectedWordIndex = -1;
                },
                error: function () { hideSuggestions(); }
            });
        }
    });

    if (window.jQuery) {
        $(document).on('click', '#word li', function () {
            searchInput.value = $(this).text();
            hideSuggestions();
            $('.sp-search-btn').trigger('click');
        });
        $(document).on('click', '.sp-hero, .sp-header, .sp-sidebar', function () {
            hideSuggestions();
        });
    }

    function showSuggestions() { wordList.style.display = 'block'; wordList.classList.add('show'); }
    function hideSuggestions() { wordList.style.display = 'none'; wordList.classList.remove('show'); selectedWordIndex = -1; }

    function selectPrevWord() {
        var items = wordList.querySelectorAll('li');
        if (selectedWordIndex > 0) { items[selectedWordIndex].classList.remove('selected'); selectedWordIndex--; items[selectedWordIndex].classList.add('selected'); }
    }
    function selectNextWord() {
        var items = wordList.querySelectorAll('li');
        if (selectedWordIndex < items.length - 1) { if (selectedWordIndex >= 0) items[selectedWordIndex].classList.remove('selected'); selectedWordIndex++; items[selectedWordIndex].classList.add('selected'); }
    }
    function fillSelectedWord() {
        var items = wordList.querySelectorAll('li');
        if (selectedWordIndex !== -1 && items[selectedWordIndex]) { searchInput.value = items[selectedWordIndex].textContent; ignoreKeyEvents = true; }
    }

    // 搜索表单提交
    searchForm.addEventListener('submit', function (e) {
        if (searchInput.value.trim() === '') { e.preventDefault(); searchInput.focus(); return; }
        hideSuggestions();
        var blankCheckbox = document.getElementById('set-search-blank');
        if (blankCheckbox && blankCheckbox.checked) { searchForm.target = '_blank'; }
        else { searchForm.removeAttribute('target'); }
    });

    // 新窗口打开设置
    var blankCheckbox = document.getElementById('set-search-blank');
    if (blankCheckbox) {
        var savedBlank = localStorage.getItem('superSearchnewWindow');
        blankCheckbox.checked = savedBlank !== null ? savedBlank === '1' : true;
        blankCheckbox.addEventListener('change', function () {
            localStorage.setItem('superSearchnewWindow', this.checked ? '1' : '-1');
        });
    }

    // ==============================
    // 侧边栏
    // ==============================
    var sidebarToggle = document.getElementById('spSidebarToggle');
    var sidebarNav = document.getElementById('spSidebarNav');

    if (sidebarToggle && sidebarNav) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebarNav.classList.toggle('open');
        });
        document.addEventListener('click', function (e) {
            if (!sidebarNav.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebarNav.classList.remove('open');
            }
        });
        var sidebarLinks = sidebarNav.querySelectorAll('li[data-lylme]');
        sidebarLinks.forEach(function (li) {
            li.addEventListener('click', function () {
                sidebarLinks.forEach(function (item) { item.classList.remove('active'); });
                li.classList.add('active');
                var target = li.getAttribute('data-lylme');
                var targetEl = document.getElementById(target);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (window.innerWidth <= 992) sidebarNav.classList.remove('open');
            });
        });
    }

    // ==============================
    // 顶部导航栏滚动效果
    // ==============================
    var header = document.getElementById('spHeader');
    if (header) {
        var lastScrollY = 0;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
            lastScrollY = window.scrollY;
        });
    }

    // ==============================
    // 返回顶部
    // ==============================
    var backTopBtn = document.getElementById('spBackTop');
    if (backTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) backTopBtn.classList.add('visible');
            else backTopBtn.classList.remove('visible');
        });
        backTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==============================
    // 日期时间显示
    // ==============================
    function updateDateTime() {
        var now = new Date();
        var timeStr = [('0' + now.getHours()).substr(-2), ('0' + now.getMinutes()).substr(-2)].join(':');
        var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        var dateStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' 周' + weekDays[now.getDay()];
        var timeEl = document.getElementById('spTime');
        var dateEl = document.getElementById('spDate');
        if (timeEl) timeEl.textContent = timeStr;
        if (dateEl) dateEl.textContent = dateStr;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 移动端菜单
    var mobileMenuBtn = document.getElementById('spMobileMenuBtn');
    if (mobileMenuBtn && sidebarNav) {
        mobileMenuBtn.addEventListener('click', function () {
            sidebarNav.classList.toggle('open');
        });
    }

    // ==============================
    // 鼠标跟随光效
    // ==============================
    var cursorGlow = document.getElementById('spCursorGlow');
    if (cursorGlow && window.innerWidth > 767) {
        var mouseX = 0, mouseY = 0;
        var glowX = 0, glowY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorGlow.classList.contains('active')) {
                cursorGlow.classList.add('active');
            }
        });

        document.addEventListener('mouseleave', function () {
            cursorGlow.classList.remove('active');
        });

        // 平滑跟随
        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ==============================
    // Hero 区域粒子效果
    // ==============================
    var particlesContainer = document.getElementById('spHeroParticles');
    if (particlesContainer) {
        function createParticle() {
            var particle = document.createElement('div');
            particle.className = 'sp-hero-particle';
            var size = Math.random() * 3 + 1;
            var left = Math.random() * 100;
            var duration = Math.random() * 6 + 4;
            var delay = Math.random() * 4;
            var colors = ['#4F7CFF', '#6366F1', '#818CF8', '#38BDF8', '#34D399'];
            var color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText =
                'width:' + size + 'px;height:' + size + 'px;' +
                'left:' + left + '%;bottom:-10px;' +
                'background:' + color + ';' +
                'box-shadow:0 0 ' + (size * 2) + 'px ' + color + ';' +
                'animation-duration:' + duration + 's;' +
                'animation-delay:' + delay + 's;';

            particlesContainer.appendChild(particle);

            // 动画结束后移除并创建新粒子
            setTimeout(function () {
                if (particle.parentNode) particle.parentNode.removeChild(particle);
                createParticle();
            }, (duration + delay) * 1000);
        }

        // 创建初始粒子
        for (var i = 0; i < 20; i++) {
            createParticle();
        }
    }

    // ==============================
    // 滚动触发动画 (Intersection Observer)
    // ==============================
    function initScrollAnimations() {
        // Hero 内容立即显示
        var heroContent = document.querySelector('.sp-hero-content');
        if (heroContent) {
            setTimeout(function () {
                heroContent.classList.add('sp-visible');
            }, 100);
        }

        // 链接区域和页脚
        var animElements = document.querySelectorAll('.sp-links-section, .sp-footer');
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('sp-visible');

                        // 链接卡片逐个出现
                        if (entry.target.classList.contains('sp-links-section')) {
                            var cards = entry.target.querySelectorAll('.sp-link-card');
                            cards.forEach(function (card, index) {
                                setTimeout(function () {
                                    card.style.transitionDelay = (index * 0.04) + 's';
                                }, 10);
                            });
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            animElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // 降级处理：直接显示
            animElements.forEach(function (el) {
                el.classList.add('sp-visible');
            });
        }
    }

    // ==============================
    // 搜索框打字机效果（placeholder）
    // ==============================
    var searchWrap = document.getElementById('spSearchInputWrap');
    if (searchWrap) {
        var typingPhrases = ['搜索一下', '输入你想查找的内容', '探索互联网世界'];
        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingTimer = null;

        function typeEffect() {
            if (document.activeElement === searchInput || searchInput.value.length > 0) {
                typingTimer = setTimeout(typeEffect, 500);
                return;
            }
            var currentPhrase = typingPhrases[phraseIndex];
            if (!isDeleting) {
                searchInput.placeholder = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingTimer = setTimeout(typeEffect, 2000);
                    return;
                }
                typingTimer = setTimeout(typeEffect, 80);
            } else {
                searchInput.placeholder = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
                    typingTimer = setTimeout(typeEffect, 400);
                    return;
                }
                typingTimer = setTimeout(typeEffect, 40);
            }
        }
        setTimeout(typeEffect, 2000);
    }

    // ==============================
    // 背景星星动态生成
    // ==============================
    var bgStars = document.getElementById('spBgStars');
    if (bgStars) {
        function generateStars() {
            var starsHTML = '';
            for (var i = 0; i < 60; i++) {
                var x = Math.random() * 100;
                var y = Math.random() * 100;
                var size = Math.random() * 2 + 0.5;
                var opacity = Math.random() * 0.5 + 0.2;
                var delay = Math.random() * 5;
                var duration = Math.random() * 3 + 2;
                starsHTML += '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;background:rgba(255,255,255,' + opacity + ');border-radius:50%;animation:starTwinkle ' + duration + 's ease-in-out ' + delay + 's infinite alternate;"></div>';
            }
            bgStars.innerHTML = starsHTML;

            // 注入星星闪烁动画
            if (!document.getElementById('spStarStyle')) {
                var style = document.createElement('style');
                style.id = 'spStarStyle';
                style.textContent = '@keyframes starTwinkle{0%{opacity:0.2;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}100%{opacity:0.3;transform:scale(0.9)}}';
                document.head.appendChild(style);
            }
        }
        generateStars();
    }

    // ==============================
    // 页面加载完成后初始化
    // ==============================
    window.addEventListener('load', function () {
        setTimeout(function () {
            searchInput.focus();
        }, 300);
        initScrollAnimations();
        initEngines();
    });

    // 如果 DOMContentLoaded 已经触发
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initScrollAnimations();
        initEngines();
    }

})();
