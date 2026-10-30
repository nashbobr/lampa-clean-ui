(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var SNACK_URL = 'https://hub.alcopa.cc/dl/snack_tv/v0.8.11/plugin.js';
    var SCALE = 1.15;
    var MAX_PHONE_WIDTH = 500;
    var SIDE = '16px';
    var BLUR = '18px';
    var BANNED = ['metadata_chart', 'metadata_tags'];

    var BTN = 'body.stv .stv-full .full-start-new__buttons';
    var BG = 'body.stv .stv-full .full-start__background';
    var NB = 'body.stv .navigation-bar';

    var ICON_HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>';
    var ICON_GEAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>';
    var ICON_BOOK = '<svg viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z" stroke="currentColor" stroke-width="2.5"/></svg>';

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}' +
        '.lcu-hide{display:none !important;}' +
        BTN + ' > .button--options{display:none !important;}' +

        BG + '{transition:opacity .5s,filter .5s,transform .5s !important;}' +
        BG + '.dim{filter:blur(' + BLUR + ') !important;transform:scale(1.1);opacity:.45 !important;}' +

        NB + ' .navigation-bar__body{position:fixed !important;top:auto !important;bottom:calc(env(safe-area-inset-bottom, 0px) + 8px) !important;left:12px !important;right:12px !important;width:auto !important;height:auto !important;transform:none !important;display:flex !important;flex-direction:row !important;justify-content:space-around !important;align-items:stretch !important;padding:6px 4px !important;border-radius:28px !important;}' +
        NB + ' .navigation-bar__item{display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;flex:1 1 0 !important;min-width:0 !important;height:auto !important;padding:6px 4px !important;margin:0 !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__icon{display:block !important;width:24px !important;height:24px !important;margin:0 0 3px 0 !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__icon svg{display:block !important;width:100% !important;height:100% !important;}' +
        NB + ' .navigation-bar__item .navigation-bar__label{display:block !important;font-size:11px !important;font-weight:500 !important;line-height:1.2 !important;white-space:nowrap;}' +

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

    function openBookmarks() {
        var title = 'Закладки';
        try { title = Lampa.Lang.translate('title_book') || title; } catch (e) {}
        Lampa.Activity.push({url: '', title: title, component: 'bookmarks', page: 1});
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

        var label = item.querySelector('.navigation-bar__label');
        if (label) label.textContent = 'Закладки';
        else item.textContent = 'Закладки';

        var icon = item.querySelector('.navigation-bar__icon');
        if (icon) {
            icon.innerHTML = ICON_BOOK;
            icon.setAttribute('data-lcu', '1');
        }

        try { item.style.order = window.getComputedStyle(settings).order; } catch (e) {}

        item.addEventListener('click', function (ev) {
            ev.stopPropagation();
            openBookmarks();
        });

        if (settings.nextSibling) body.insertBefore(item, settings.nextSibling);
        else body.appendChild(item);
    }

    function tickBar() {
        setIcon('main', ICON_HOME);
        setIcon('settings', ICON_GEAR);
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
