// Display map
var map = L.map('map').setView([48.856578,2.351828], 11);

// Add a MapQuest layer
L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

function showData() {
    // Get the identifier
    var idcolis = $("#idcolis").val();

    if (idcolis) {

        // Get data from the remote service
        var jqxhr = $.ajax({url: "https://sales04-ssg.dev.ca.com:9443/suivi/" + idcolis})
            .done(function() {
                alert("Cool, ça marche !");
            })
            .fail(function() {
                alert("Service injoignable !")
            });

    } else {
        alert("Veuillez saisir l'identifiant colis !");
    }
}
