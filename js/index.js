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

        $("#forward").click(function () {
            index = index + 1;
            index = (index > 1329) ? 0 : index;
            update();
        });

        $("#back").click(function () {
            index = index - 1;
            index = (index < 0) ? 1329 : index;
            update();
        });

        var update = function () {
            $('#kural').text(index + 1);

            $('#kural-line1').text(json.content[index].line1);
            $('#kural-line2').text(json.content[index].line2);
            $('#chapter').text(json.content[index].chapter);
            $('#group').text(json.content[index].group);
            $('#section').text(json.content[index].section);
            $('#explanation').text(json.content[index].explanation);
        };

        load("json/thirukkural.json", function (content) {
            json = content;
            update();
        });
    });
});

app.on({ page: 'tamilagaradhi', content: 'tamilagaradhi.html' }, function (activity) {
    activity.onReady(function () {
    });
});

app.on({ page: 'sivavakkiyam', content: 'sivavakkiyam.html' }, function (activity) {
    activity.onReady(function () {
    });
});

app.start();

//Regestering the service worker if the working brower support it. (Eg. Chrome, MS Edge)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./js/service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}
