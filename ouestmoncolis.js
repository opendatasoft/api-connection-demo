// Display map
var map = L.map('map').setView([48.856578,2.351828], 11);

// Add a MapQuest layer
L.tileLayer('http://d.tiles.mapbox.com/v4/opendatasoft.gb69acb2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbmRhdGFzb2Z0IiwiYSI6Im9taEJndlkifQ.gN6NtnubxT8HJ-AUY2o_rg', {
            attribution: '&copy; <a href="www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

var truckIcon = L.divIcon({html: '<div class="map-icon truck-icon"><i class="fa fa-truck"></div>'});
var postOfficeIcon = L.divIcon({html: '<div class="map-icon postoffice-icon"><i class="fa fa-envelope"></div>'});

function showData() {
    // Get the identifier
    var idcolis = $("#idcolis").val();

    if (idcolis) {

        // Get data from the remote service
        var jqxhr = $.ajax({url: "https://sales04-ssg.dev.ca.com:9443/suivi/" + idcolis})
            .success(function(result) {

                var targetSite = L.marker([result["Fields"]["records"][0]["fields"]["longlat"][0], result["Fields"]["records"][0]["fields"]["longlat"][1]], {icon: postOfficeIcon}).addTo(map);
                var currentPosition = L.marker([result["Statut"]["positionCamion"]["lat"], result["Statut"]["positionCamion"]["lng"]], {icon: truckIcon}).addTo(map);

                targetSite.bindPopup("<b>Site de livraison</b>: " + result["Fields"]["records"][0]["fields"]["libelle_du_site"] + "<br /><b>Adresse</b>: " + result["Fields"]["records"][0]["fields"]["adresse"] + ", " +  result["Fields"]["records"][0]["fields"]["localite"] + "</center>");
                currentPosition.bindPopup("<b>Type de livraison</b>: " + result["Statut"]["base_label"] + "<br /><b>Dernière mise à jour</b>: " + result["Statut"]["date"])

                var group = new L.featureGroup([targetSite, currentPosition]);
                map.fitBounds(group.getBounds());
            })
            .fail(function() {
                alert("Service injoignable !")
            });

    } else {
        alert("Veuillez saisir l'identifiant colis !");
    }
}
