(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var SNACK_URL = 'https://hub.alcopa.cc/dl/snack_tv/v0.8.11/plugin.js';
    var SCALE = 1.15;
    var MAX_PHONE_WIDTH = 500;
    var SIDE = '16px';
    var BLUR = '18px';
    var BAR_BOTTOM = '18px';
    var PAGE_BOTTOM = '110px';
    var BANNED = ['metadata_chart', 'metadata_tags'];
    var FAV_TABS = [['book', 'title_book', 'Закладки'], ['like', 'title_like', 'Нравится'], ['wath', 'title_wath', 'Позже'], ['look', 'title_look', 'Смотрю']];

    var BTN = 'body.stv .stv-full .full-start-new__buttons';
    var BG = 'body.stv .stv-full .full-start__background';
    var NB = 'body.stv .navigation-bar';

    var SVG_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
    var ICON_HOME = SVG_OPEN + '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>';
    var ICON_GEAR = SVG_OPEN + '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>';
    var ICON_SEARCH = SVG_OPEN + '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
    var ICON_BOOK = SVG_OPEN + '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}' +
        '.lcu-hide{display:none !important;}' +
        BTN + ' > .button--options{display:none !important;}' +

        BG + '{transition:opacity .5s,filter .5s,transform .5s !important;}' +
        BG + '.dim{filter:blur(' + BLUR + ') !important;transform:scale(1.1);opacity:.45 !important;}' +

        NB + ' .navigation-bar__body{position:fixed !important;top:auto !important;bottom:calc(env(safe-area-inset-bottom, 0px) + ' + BAR_BOTTOM + ') !important;left:12px !important;right:12px !important;width:auto !important;height:auto !important;transform:none !important;display:flex !important;flex-direction:row !important;justify-content:space-around !important;align-items:stretch !important;padding:6px 4px !important;border-radius:32px !important;}' +
        NB + ' .navigation-bar__item{display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;flex:1 1 0 !important;min-width:0 !important;height:auto !important;padding:6px 4px !important;margin:0 2px !important;border-radius:26px !important;}' +
        NB + ' .navigation-bar__item.lcu-active{background:rgba(255,255,255,.2) !important;color:#fff !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__icon{display:block !important;width:24px !important;height:24px !important;margin:0 0 3px 0 !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__icon svg{display:block !important;width:100% !important;height:100% !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__label{display:block !important;font-size:11px !important;font-weight:500 !important;line-height:1.2 !important;white-space:nowrap;}' +

        'body.stv .activity--active .scroll:not(.scroll--horizontal) > .scroll__content{padding-bottom:' + PAGE_BOTTOM + ' !important;}' +

        '.lcu-sheet{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Roboto,Arial,sans-serif;}' +
        '.lcu-sheet__dim{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);}' +
        '.lcu-sheet__box{position:absolute;left:0;right:0;bottom:0;top:calc(env(safe-area-inset-top, 0px) + 40px);display:flex;flex-direction:column;box-sizing:border-box;padding:8px 16px calc(env(safe-area-inset-bottom, 0px) + 16px);border-radius:26px 26px 0 0;background:rgba(28,28,32,.94);-webkit-backdrop-filter:blur(40px) saturate(180%);backdrop-filter:blur(40px) saturate(180%);box-shadow:0 -10px 40px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.12);}' +
        '.lcu-sheet__grip{flex:none;width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.3);margin:4px auto 12px;}' +
        '.lcu-sheet__head{flex:none;display:flex;align-items:center;gap:12px;margin-bottom:12px;}' +
        '.lcu-title{flex:1;font-size:28px;font-weight:700;letter-spacing:-.02em;}' +
        '.lcu-close{flex:none;font-size:17px;font-weight:600;color:#fff;padding:8px 4px;background:none;border:0;}' +
        '.lcu-field{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:44px;box-sizing:border-box;padding:0 14px;border-radius:22px;background:rgba(118,118,128,.28);}' +
        '.lcu-field svg{flex:none;width:20px;height:20px;opacity:.6;}' +
        '.lcu-field input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font-size:17px;-webkit-appearance:none;appearance:none;}' +
        '.lcu-field input::placeholder{color:rgba(235,235,245,.5);}' +
        '.lcu-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}' +
        '.lcu-row{display:flex;align-items:center;gap:14px;padding:8px 6px;border-radius:12px;}' +
        '.lcu-row:active{background:rgba(255,255,255,.1);}' +
        '.lcu-row img{flex:none;width:46px;height:69px;border-radius:8px;object-fit:cover;background:rgba(255,255,255,.08);}' +
        '.lcu-row__t{font-size:17px;font-weight:600;line-height:1.25;}' +
        '.lcu-row__s{font-size:13px;color:rgba(235,235,245,.6);margin-top:3px;}' +
        '.lcu-msg{text-align:center;color:rgba(235,235,245,.55);padding:40px 0;font-size:15px;}' +
        '.lcu-tabs{flex:none;display:flex;gap:8px;overflow-x:auto;margin-bottom:14px;}' +
        '.lcu-tab{flex:none;height:34px;padding:0 16px;border-radius:17px;background:rgba(118,118,128,.28);font-size:15px;font-weight:600;color:rgba(235,235,245,.8);border:0;}' +
        '.lcu-tab.on{background:#fff;color:#000;}' +
        '.lcu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px 12px;}' +
        '.lcu-card img{display:block;width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:12px;background:rgba(255,255,255,.08);}' +
        '.lcu-card span{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;font-size:12px;line-height:1.25;margin-top:6px;}' +

        '@media screen and (max-width:599px){' +
            'body.stv .items-line .items-line__head{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .items-line .scroll--horizontal .scroll__content{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-full .full-start-new{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-full .full-descr{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-hero__info{left:' + SIDE + ' !important;}' +

            BTN + '{flex-wrap:nowrap !important;justify-content:flex-start !important;align-items:center !important;}' +
            BTN + ' > .full-start__button.stv-primary{flex:1 1 auto !important;min-width:0 !important;max-width:none !important;width:auto !important;margin:6px 12px 18px 0 !important;}' +
            BTN + ' > .full-start__button:not(.stv-primary){flex:0 0 auto !important;margin:6px 0 18px 0 !important;}' +
        '}';

    function addStyle() {
        var old = document.getElementById('lampa-clean-ui-style');
        if (old) old.parentNode.removeChild(old);
        var style = document.createElement('style');
        style.id = 'lampa-clean-ui-style';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function loadSnack() {
        if (document.querySelector('script[data-lcu-snack]')) return;
        var s = document.createElement('script');
        s.src = SNACK_URL;
        s.async = true;
        s.setAttribute('data-lcu-snack', '1');
        s.onload = addStyle;
        document.head.appendChild(s);
    }

    function scaleBody() {
        var b = document.body;
        if (!b || window.innerWidth > MAX_PHONE_WIDTH) return;
        var cur = parseFloat(b.style.fontSize);
        if (!cur || String(cur) === b.getAttribute('data-lcu-size')) return;
        var next = Math.round(cur * SCALE * 100) / 100;
        b.setAttribute('data-lcu-size', String(next));
        b.style.fontSize = next + 'px';
    }

    function startScale() {
        scaleBody();
        new MutationObserver(scaleBody).observe(document.body, {attributes: true, attributeFilter: ['style']});
    }

    function isBanned(row) {
        var name = Array.isArray(row) ? row[0] : row;
        return BANNED.indexOf(name) >= 0;
    }

    function patchRows(rows) {
        if (!rows || rows.__lcu) return;
        rows.__lcu = true;

        var push = rows.push;
        rows.push = function () {
            var items = Array.prototype.slice.call(arguments).filter(function (r) { return !isBanned(r); });
            return items.length ? push.apply(this, items) : this.length;
        };

        var splice = rows.splice;
        rows.splice = function () {
            var items = Array.prototype.slice.call(arguments, 2);
            if (items.length && items.every(isBanned)) return [];
            return splice.apply(this, arguments);
        };
    }

    function listen() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'start' && e.link) patchRows(e.link.rows);

            if (e.type === 'build' && isBanned(e.name)) {
                try { $(e.item.render()).addClass('lcu-hide'); } catch (err) {}
            }

            if (e.type === 'complite' && e.link && e.link.rows) {
                for (var i = e.link.rows.length - 1; i >= 0; i--) {
                    if (isBanned(e.link.rows[i])) Array.prototype.splice.call(e.link.rows, i, 1);
                }
            }
        });
    }

    // ---------- sheets (search and bookmarks) ----------
    var sheetEl = null;

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    function tr(key, fallback) {
        try {
            var t = Lampa.Lang.translate(key);
            if (t && t !== key) return t;
        } catch (e) {}
        return fallback;
    }

    function kindOf(m) {
        return m.media_type === 'tv' || m.name || m.first_air_date || m.number_of_seasons ? 'tv' : 'movie';
    }

    function openCard(m) {
        closeSheet();
        Lampa.Activity.push({url: '', component: 'full', id: m.id, method: kindOf(m), card: m, source: 'tmdb'});
    }

    function poster(m, size) {
        if (!m.poster_path) return '';
        try { return Lampa.TMDB.image('t/p/' + size + m.poster_path); } catch (e) { return ''; }
    }

    function closeSheet() {
        if (sheetEl && sheetEl.parentNode) sheetEl.parentNode.removeChild(sheetEl);
        sheetEl = null;
    }

    function buildSheet() {
        closeSheet();
        var wrap = el('div', 'lcu-sheet');
        var dim = el('div', 'lcu-sheet__dim');
        var box = el('div', 'lcu-sheet__box');
        dim.addEventListener('click', closeSheet);
        box.appendChild(el('div', 'lcu-sheet__grip'));
        wrap.appendChild(dim);
        wrap.appendChild(box);
        document.body.appendChild(wrap);
        sheetEl = wrap;
        return box;
    }

    function closeButton() {
        var b = el('button', 'lcu-close', 'Готово');
        b.addEventListener('click', closeSheet);
        return b;
    }

    function tmdbSearch(q, ok, fail) {
        try {
            var lang = 'ru';
            try { lang = Lampa.Storage.field('tmdb_lang') || Lampa.Storage.get('language', 'ru') || 'ru'; } catch (e) {}
            var url = Lampa.TMDB.api('search/multi?query=' + encodeURIComponent(q) + '&include_adult=false&api_key=' + Lampa.TMDB.key() + '&language=' + lang);
            new Lampa.Reguest().silent(url, ok, fail);
        } catch (e) { fail(); }
    }

    function openSearch() {
        var box = buildSheet();
        var head = el('div', 'lcu-sheet__head');
        var field = el('div', 'lcu-field');
        field.innerHTML = ICON_SEARCH;
        var input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Фильмы и сериалы';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('enterkeyhint', 'search');
        ['keydown', 'keyup', 'keypress'].forEach(function (n) {
            input.addEventListener(n, function (ev) { ev.stopPropagation(); });
        });
        field.appendChild(input);
        head.appendChild(field);
        head.appendChild(closeButton());
        box.appendChild(head);

        var scroll = el('div', 'lcu-scroll');
        box.appendChild(scroll);

        var token = 0, timer = 0;

        function message(t) {
            scroll.innerHTML = '';
            scroll.appendChild(el('div', 'lcu-msg', t));
        }

        function render(list) {
            scroll.innerHTML = '';
            var items = (list || []).filter(function (m) { return m.media_type === 'movie' || m.media_type === 'tv'; });
            if (!items.length) return message('Ничего не найдено');
            items.forEach(function (m) {
                var row = el('div', 'lcu-row');
                var img = document.createElement('img');
                img.alt = '';
                var src = poster(m, 'w154');
                if (src) img.src = src;
                var info = el('div');
                info.appendChild(el('div', 'lcu-row__t', m.title || m.name || ''));
                var year = String(m.release_date || m.first_air_date || '').slice(0, 4);
                var parts = [m.media_type === 'tv' ? 'Сериал' : 'Фильм'];
                if (year) parts.push(year);
                if (m.vote_average) parts.push('★ ' + (Math.round(m.vote_average * 10) / 10));
                info.appendChild(el('div', 'lcu-row__s', parts.join(' · ')));
                row.appendChild(img);
                row.appendChild(info);
                row.addEventListener('click', function () { openCard(m); });
                scroll.appendChild(row);
            });
        }

        function run() {
            var q = input.value.trim();
            var my = ++token;
            if (q.length < 2) return message('Введите название');
            tmdbSearch(q, function (j) {
                if (my === token) render(j && j.results);
            }, function () {
                if (my === token) message('Не удалось загрузить результаты');
            });
        }

        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(run, 350);
        });

        message('Введите название');
        try { input.focus(); } catch (e) {}
    }

    function favList(type) {
        try { return Lampa.Favorite.get({type: type}) || []; } catch (e) { return []; }
    }

    function openBookmarks() {
        var box = buildSheet();
        var head = el('div', 'lcu-sheet__head');
        head.appendChild(el('div', 'lcu-title', tr('title_book', 'Закладки')));
        head.appendChild(closeButton());
        box.appendChild(head);

        var tabs = el('div', 'lcu-tabs');
        var scroll = el('div', 'lcu-scroll');
        box.appendChild(tabs);
        box.appendChild(scroll);

        var lists = {}, first = null;
        FAV_TABS.forEach(function (t) {
            lists[t[0]] = favList(t[0]);
            if (first === null && lists[t[0]].length) first = t[0];
        });

        function show(type) {
            Array.prototype.forEach.call(tabs.children, function (b) {
                b.classList.toggle('on', b.getAttribute('data-type') === type);
            });
            scroll.innerHTML = '';
            var items = lists[type] || [];
            if (!items.length) {
                scroll.appendChild(el('div', 'lcu-msg', 'Здесь пока пусто'));
                return;
            }
            var grid = el('div', 'lcu-grid');
            items.forEach(function (m) {
                var card = el('div', 'lcu-card');
                var img = document.createElement('img');
                img.alt = '';
                var src = poster(m, 'w342');
                if (src) img.src = src;
                card.appendChild(img);
                card.appendChild(el('span', '', m.title || m.name || ''));
                card.addEventListener('click', function () { openCard(m); });
                grid.appendChild(card);
            });
            scroll.appendChild(grid);
        }

        FAV_TABS.forEach(function (t) {
            var n = lists[t[0]].length;
            var b = el('button', 'lcu-tab', tr(t[1], t[2]) + (n ? ' ' + n : ''));
            b.setAttribute('data-type', t[0]);
            b.addEventListener('click', function () { show(t[0]); });
            tabs.appendChild(b);
        });

        show(first || FAV_TABS[0][0]);
    }

    function hookNavigation() {
        if (document.body.getAttribute('data-lcu-nav') === '1') return;
        document.body.setAttribute('data-lcu-nav', '1');
        document.addEventListener('click', function (ev) {
            var t = ev.target && ev.target.closest ? ev.target.closest('.navigation-bar__item') : null;
            if (!t) return;
            var action = t.getAttribute('data-action');
            if (action !== 'search' && action !== 'bookmarks') return;
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            if (action === 'search') openSearch();
            else openBookmarks();
        }, true);
    }

    function setIcon(action, svg) {
        var icon = document.querySelector('.navigation-bar__item[data-action="' + action + '"] .navigation-bar__icon');
        if (icon && icon.getAttribute('data-lcu') !== '1') {
            icon.innerHTML = svg;
            icon.setAttribute('data-lcu', '1');
        }
    }

    function addBookmarksItem() {
        var body = document.querySelector('.navigation-bar__body');
        if (!body || body.querySelector('[data-action="bookmarks"]')) return;

        var settings = body.querySelector('[data-action="settings"]');
        if (!settings) return;

        var item = settings.cloneNode(true);
        item.setAttribute('data-action', 'bookmarks');
        item.classList.remove('lcu-active');

        var label = item.querySelector('.navigation-bar__label');
        if (label) label.textContent = 'Закладки';
        else item.textContent = 'Закладки';

        var icon = item.querySelector('.navigation-bar__icon');
        if (icon) {
            icon.innerHTML = ICON_BOOK;
            icon.setAttribute('data-lcu', '1');
        }

        try { item.style.order = window.getComputedStyle(settings).order; } catch (e) {}

        if (settings.nextSibling) body.insertBefore(item, settings.nextSibling);
        else body.appendChild(item);
    }

    function tickBar() {
        setIcon('main', ICON_HOME);
        setIcon('settings', ICON_GEAR);
        setIcon('search', ICON_SEARCH);
        addBookmarksItem();
    }

    function watchBar() {
        tickBar();
        setInterval(tickBar, 2000);
    }

    function apply() {
        addStyle();
        startScale();
        listen();
        hookNavigation();
        loadSnack();
        watchBar();
    }

    if (window.appready) apply();
    else if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') apply();
        });
    } else {
        apply();
    }
})();
