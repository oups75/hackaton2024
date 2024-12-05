document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([42.6986, 2.8954], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        { name: 'Localisation 1', description: 'Description 1', latitude: 42.6986, longitude: 2.8954 },
        { name: 'Localisation 2', description: 'Description 2', latitude: 42.7000, longitude: 2.9000 },
        { name: 'Localisation 3', description: 'Description 3', latitude: 42.7010, longitude: 2.9010 }
    ];

    // Fonction pour ajouter des marqueurs à la carte
    function addMarkers(locations) {
        locations.forEach(location => {
            L.marker([location.latitude, location.longitude]).addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.description}`);
        });
    }

    addMarkers(locations);
});