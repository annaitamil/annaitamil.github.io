var indicator = null;

function load(jsonFile, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var json = (this.readyState == 4 && this.status == 200) ? JSON.parse(this.responseText) : null;
        if (json != null) {
            callback(json);
            indicator.close();
        }
    };
    xhttp.open("GET", jsonFile, true);
    xhttp.send();
    indicator = phonon.indicator("", true);
}

phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: false,
        enableBrowserBackButton: true
    },

    i18n: null
});

var app = phonon.navigator();

app.on({ page: 'home', content: 'home.html' });

app.on({ page: 'pazhamozhigal', content: 'pazhamozhigal.html' }, function (activity) {
    activity.onReady(function () {
    });
});

app.on({ page: 'thirukkural', content: 'thirukkural.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#kural-forward").click(function () {
            index = index + 1;
            index = (index > 1329) ? 0 : index;
            update();
        });

        $("#kural-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 1329 : index;
            update();
        });

        $("#kural").click(function () {
            var prompt = phonon.prompt('குறள் எண்', '');
            prompt.on('confirm', function (value) {
                index = parseInt(value);
                update();
            });
        });

        var update = function () {
            $('#kural').text(index + 1);
            $('#kural-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#kural-line2').text(json.content[index][json.abbreviations['line2']]);
            $('#kural-chapter').text(json.chapters[json.content[index][json.abbreviations['chapter']]]);
            $('#kural-group').text(json.groups[json.content[index][json.abbreviations['group']]]);
            $('#kural-section').text(json.sections[json.content[index][json.abbreviations['section']]]);
            $('#kural-explanation').text(json.content[index][json.abbreviations['explanation']]);
        };

        load("json/thirukkural.json", function (content) {
            json = content;
            update();
        });
    });
});

app.on({ page: 'gnanakural', content: 'gnanakural.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#gnanakural-forward").click(function () {
            index = index + 1;
            index = (index > 309) ? 0 : index;
            update();
        });

        $("#gnanakural-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 309 : index;
            update();
        });

        var update = function () {
            $('#gnanakural').text(index + 1);
            $('#gnanakural-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#gnanakural-line2').text(json.content[index][json.abbreviations['line2']]);
            $('#gnanakural-chapter').text(json.chapters[json.content[index][json.abbreviations['chapter']]]);
            $('#gnanakural-group').text(json.groups[json.content[index][json.abbreviations['group']]]);
        };

        load("json/gnanakural.json", function (content) {
            json = content;
            update();
        });
    });
});

app.on({ page: 'tamilagaradhi', content: 'tamilagaradhi.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;

        var update = function () {
            var listItems = '';

            Object.keys(json.content).forEach(function (key) {
                listItems += '<li><div class="item-content"><span class="title list-title">' + key + '</span><span class="body list-text">' + json.content[key] + '</span></div></li>';
            });

            $('#tamilagaradhi-list').html(listItems);
        };

        load("json/tamilagaradhi.json", function (content) {
            json = content;
            update();
        });
    });
});

app.on({ page: 'sivavakkiyam', content: 'sivavakkiyam.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#sivavakkiyam-forward").click(function () {
            index = index + 1;
            index = (index > 549) ? 0 : index;
            update();
        });

        $("#sivavakkiyam-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 549 : index;
            update();
        });

        var update = function () {
            $('#sivavakkiyam').text(index + 1);
            $('#sivavakkiyam-group').text(json.groups[json.content[index][json.abbreviations['group']]]);
            $('#sivavakkiyam-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#sivavakkiyam-line2').text(json.content[index][json.abbreviations['line2']]);
            $('#sivavakkiyam-line3').text(json.content[index][json.abbreviations['line3']]);
            $('#sivavakkiyam-line4').text(json.content[index][json.abbreviations['line4']]);
        };

        load("json/sivavakkiyam.json", function (content) {
            json = content;
            index = 0;
            update();
        });
    });
});

app.on({ page: 'konganar_vaalai_kummi', content: 'konganar_vaalai_kummi.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#konganar_vaalai_kummi-forward").click(function () {
            index = index + 1;
            index = (index > 110) ? 0 : index;
            update();
        });

        $("#konganar_vaalai_kummi-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 110 : index;
            update();
        });

        var update = function () {
            $('#konganar_vaalai_kummi').text(index + 1);
            $('#konganar_vaalai_kummi-section').text(json.sections[json.content[index][json.abbreviations['section']]]);
            $('#konganar_vaalai_kummi-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#konganar_vaalai_kummi-line2').text(json.content[index][json.abbreviations['line2']]);
            $('#konganar_vaalai_kummi-line3').text(json.content[index][json.abbreviations['line3']]);
            $('#konganar_vaalai_kummi-line4').text(json.content[index][json.abbreviations['line4']]);
        };

        load("json/konganar_vaalai_kummi.json", function (content) {
            json = content;
            index = 0;
            update();
        });
    });
});

app.on({ page: 'badragiriyar_meignana_pulambal', content: 'badragiriyar_meignana_pulambal.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#badragiriyar_meignana_pulambal-forward").click(function () {
            index = index + 1;
            index = (index > 233) ? 0 : index;
            update();
        });

        $("#badragiriyar_meignana_pulambal-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 233 : index;
            update();
        });

        var update = function () {
            $('#badragiriyar_meignana_pulambal').text(index + 1);
            $('#badragiriyar_meignana_pulambal-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#badragiriyar_meignana_pulambal-line2').text(json.content[index][json.abbreviations['line2']]);
        };

        load("json/badragiriyar_meignana_pulambal.json", function (content) {
            json = content;
            index = 0;
            update();
        });
    });
});

app.on({ page: 'thirumanthiram', content: 'thirumanthiram.html' }, function (activity) {
    activity.onReady(function () {
        var json = null;
        var index = 0;

        $("#thirumanthiram-forward").click(function () {
            index = index + 1;
            index = (index > 3001) ? 0 : index;
            update();
        });

        $("#thirumanthiram-back").click(function () {
            index = index - 1;
            index = (index < 0) ? 3001 : index;
            update();
        });

        var update = function () {
            $('#thirumanthiram').text(index + 1);
            $('#thirumanthiram-group').text(json.groups[json.content[index][json.abbreviations['group']]]);
            $('#thirumanthiram-chapter').text(json.chapters[json.content[index][json.abbreviations['chapter']]]);
            $('#thirumanthiram-line1').text(json.content[index][json.abbreviations['line1']]);
            $('#thirumanthiram-line2').text(json.content[index][json.abbreviations['line2']]);
            $('#thirumanthiram-line3').text(json.content[index][json.abbreviations['line3']]);
            $('#thirumanthiram-line4').text(json.content[index][json.abbreviations['line4']]);
        };

        load("json/thirumanthiram.json", function (content) {
            json = content;
            index = 0;
            update();
        });
    });
});

app.start();

//Regestering the service worker if the working brower support it. (Eg. Chrome, MS Edge)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./js/service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}
