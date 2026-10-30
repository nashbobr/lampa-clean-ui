(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var SNACK_URL = 'https://hub.alcopa.cc/dl/snack_tv/v0.8.11/plugin.js';
    var SCALE = 1.15;
    var MAX_PHONE_WIDTH = 500;
    var SIDE = '16px';

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}' +

        '@media screen and (max-width:599px){' +
            'body.stv .items-line .items-line__head{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .items-line .scroll--horizontal .scroll__content{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-full .full-start-new{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-full .full-descr{padding-left:' + SIDE + ' !important;padding-right:' + SIDE + ' !important;}' +
            'body.stv .stv-hero__info{left:' + SIDE + ' !important;}' +
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

    function apply() {
        addStyle();
        startScale();
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
