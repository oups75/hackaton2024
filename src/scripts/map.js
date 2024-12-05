document.addEventListener('DOMContentLoaded', function() {
    // Coordonnées de Perpignan
    var map = L.map('map').setView([42.6986, 2.8954], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([42.6986, 2.8954]).addTo(map);

    // Ajouter un événement de clic pour marquer un lieu
    map.on('click', function(e) {
        var latlng = e.latlng;
        marker.setLatLng(latlng);
        map.panTo(latlng);

        document.getElementById('latitude').value = latlng.lat;
        document.getElementById('longitude').value = latlng.lng;

        console.log("Coordonnées du lieu marqué :", latlng.lat, latlng.lng);
    });
});