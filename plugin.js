(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var SNACK_URL = 'https://hub.alcopa.cc/dl/snack_tv/v0.8.11/plugin.js';
    var SCALE = 1.15;
    var MAX_PHONE_WIDTH = 500;

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}';

    function addStyle() {
        if (document.getElementById('lampa-clean-ui-style')) return;
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
