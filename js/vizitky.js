var host;
if (location.href.split('?')[0].indexOf('irozhlas') == -1) {
    host = location.href.split('?')[0];
} else {
    host = 'https://data.irozhlas.cz/praha-vizitky-18/';
}

function share(url) {
    window.open(url, 'Sdílení', 'width=550,height=450,scrollbars=no');
};

//social sharing
function makeSelect() {
    var id = location.href.split('?')[1];
    if (id != null) {
        var filtered = data[id]

        if (!filtered) {
            return;
        }
        
        document.getElementById(id).scrollIntoView();
        window.scrollBy(0, -50)
    } 
}

function makeTable() {
    $('.linked').html('');
    var out = '<h1>Zastupitelstvo Hl. m. Prahy</h1><ul>';
    for (var per in data) {
        out += '<li id=' + per + '><div class="right"><h2><span class="cislo">' 
        +  per.split('_')[0]
        + '</span><span>' 
        +  data[per].jmeno
        + '</span></h2><span class="strana">' 
        +  data[per].partaj 
        + '</span> <span class="supplemental">' 
        +  data[per].povolani
        + (data[per].pozn != null ? '<div><span class="supplemental">' + data[per].pozn + '</span></div>' : '')
        + '</span>'
        + '<span class="share">Sdílet na <a href="javascript:share(\'https://www.facebook.com/sharer/sharer.php?u=' + location.href.split('?')[0] + '?' + per + '\');'
        + '">Facebook</a> | <a href="javascript:share(\'https://twitter.com/home?status=' 
        + location.href.split('?')[0] + '?' + per + '\');">Twitter</a></span>' //| <a target="_blank" href="https://www.irozhlas.cz/volby/senatni-volby-2018/kandidati-vizitky/embed-vizitky-senatoru#' 
        //+ data[per].file +'">Embed</a>
        + (data[per].afile != 'x' ? '<div><audio class="player" src="' + host + 'media/audio/' + data[per].file + '.mp3" preload="none" controls="yes"></audio></div>'  : '')
        + '</div><div class="left"><img width="120" height="180" alt="'
        + data[per].jmeno
        + '" src="'
        + host + 'media/foto/'
        + data[per].file + '.JPG'
        +'"></div></li>'
    }
    out += '</ul>'
    $('#bottom').html(out);
    $('.player').click(function() {
        var kandId = this.src.split('/').slice(-1)[0].split('.')[0];
        ga('gtm1.send', 'event', 'ondemand', 'play' , 'Obecní volby 2018 Praha - vizitka lídra' + kandId);
    });

}

makeTable()
makeSelect()