(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var SNACK_URL = 'https://hub.alcopa.cc/dl/snack_tv/v0.8.11/plugin.js';
    var SCALE = 1.15;
    var MAX_PHONE_WIDTH = 500;
    var SIDE = '16px';
    var BANNED = ['metadata_chart', 'metadata_tags'];

    var BTN = 'body.stv .stv-full .full-start-new__buttons';

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}' +
        '.lcu-hide{display:none !important;}' +
        BTN + ' > .button--options{display:none !important;}' +

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

    function apply() {
        addStyle();
        startScale();
        listen();
        loadSnack();
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
