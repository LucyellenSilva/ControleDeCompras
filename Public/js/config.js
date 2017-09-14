function setConfig()
{
    var texts = {
        "title" : "Controle de compras"
    };

    document.title = texts.title;
    document.getElementById("valores").innerHTML = texts.title;

}

setConfig();