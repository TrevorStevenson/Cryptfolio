document.getElementById("updateValue").onclick = updateValue;

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

        $("#portfolio").text("$" + totalValue.toString());
    });
}