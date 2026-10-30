(function () {
    'use strict';

    if (window.lampa_clean_ui) return;
    window.lampa_clean_ui = true;

    var css = '' +
        '.wrap__left{display:none !important;width:0 !important;}' +
        '.head{display:none !important;}' +
        '.head__menu-icon{display:none !important;}' +
        '.wrap__content{left:0 !important;margin-left:0 !important;width:100% !important;}' +

        '.full-start-new{background:linear-gradient(180deg,#0b0b10 0%,#160c2b 60%,#0b0b10 100%) !important;}' +
        '.full-start-new__title{font-weight:900 !important;text-transform:uppercase;font-size:2.3em !important;line-height:1.05 !important;letter-spacing:-0.01em;}' +
        '.full-start-new__tagline{color:rgba(255,255,255,.55) !important;}' +
        '.full-start-new__reactions{display:none !important;}' +

        '.full-start-new__rate-line{gap:.6em;align-items:center;}' +
        '.full-start-new__rate-line .full-start__rate{background:rgba(255,255,255,.1) !important;border-radius:.7em !important;padding:.35em .8em !important;}' +
        '.full-start-new__rate-line .rate--tmdb{background:linear-gradient(135deg,#4527d6,#7c3aed) !important;}' +
        '.full-start-new__rate-line .full-start__pg,.full-start-new__rate-line .full-start__status{border:2px solid rgba(255,255,255,.8) !important;border-radius:.6em !important;}' +

        '.full-start-new__buttons{display:flex;flex-wrap:nowrap;gap:.7em;align-items:center;}' +
        '.full-start-new__buttons .full-start__button{margin:0 !important;border:2px solid rgba(139,92,246,.75) !important;background:transparent !important;border-radius:1em !important;min-width:3.4em;height:3.4em;display:flex;align-items:center;justify-content:center;transition:all .15s;}' +
        '.full-start-new__buttons .full-start__button:not(.button--play) span{display:none !important;}' +
        '.full-start-new__buttons .button--play{flex-grow:1;max-width:14em;border-color:transparent !important;background:linear-gradient(90deg,#6d28d9,#a855f7) !important;font-weight:700;}' +
        '.full-start-new__buttons .full-start__button.focus{background:rgba(139,92,246,.35) !important;box-shadow:0 0 0 3px rgba(168,85,247,.6);}' +
        '.full-start-new__buttons .button--play.focus{background:linear-gradient(90deg,#7c3aed,#c084fc) !important;}';

    function apply() {
        if (document.getElementById('lampa-clean-ui-style')) return;
        var style = document.createElement('style');
        style.id = 'lampa-clean-ui-style';
        style.textContent = css;
        document.head.appendChild(style);
    }

    if (window.appready) apply();
    else if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') apply();
        });
        apply();
    } else {
        apply();
    }
})();
