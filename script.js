document.getElementById("updateValue").onclick = updateValue;

$(document).ready(function() {
    updateValue();
});

chrome.storage.sync.get("btc", function(coin) {
    $("#btc").val(coin["btc"]);
});

chrome.storage.sync.get("eth", function(coin) {
    $("#eth").val(coin["eth"]);
});

chrome.storage.sync.get("bch", function(coin) {
    $("#bch").val(coin["bch"]);
});

chrome.storage.sync.get("ltc", function(coin) {
    $("#ltc").val(coin["ltc"]);
});

function updateValue() 
{
    console.log("loading");
    $("#portfolio").text("Loading");

    var btcPrice = 0;
    var ethPrice = 0;
    var bchPrice = 0;
    var ltcPrice = 0;

    $.get("https://api.coinmarketcap.com/v2/ticker/", function(data, status) {

        var values = data["data"];

        for (var key in values) {
            if (values[key]["symbol"] === "BTC") {
                btcPrice = values[key]["quotes"]["USD"]["price"];
            }
            else if (values[key]["symbol"] === "ETH") {
                ethPrice = values[key]["quotes"]["USD"]["price"];
            }
            else if (values[key]["symbol"] === "BCH") {
                bchPrice = values[key]["quotes"]["USD"]["price"];
            }
            else if (values[key]["symbol"] === "LTC") {
                ltcPrice = values[key]["quotes"]["USD"]["price"];
            }
        }

        var btcAmount = parseFloat(document.getElementById("btc").value);
        var ethAmount = parseFloat(document.getElementById("eth").value);
        var bchAmount = parseFloat(document.getElementById("bch").value);
        var ltcAmount = parseFloat(document.getElementById("ltc").value);

        var totalValue = btcAmount * btcPrice + ethAmount * ethPrice + bchAmount * bchPrice + ltcAmount * ltcPrice;
        var roundedValue = Math.round(totalValue * 100) / 100;
        $("#portfolio").text("$" + totalValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    });

    chrome.storage.sync.set({"btc": document.getElementById("btc").value});
    chrome.storage.sync.set({"eth": document.getElementById("eth").value});
    chrome.storage.sync.set({"bch": document.getElementById("bch").value});
    chrome.storage.sync.set({"ltc": document.getElementById("ltc").value});
}