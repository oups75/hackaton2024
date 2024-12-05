document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la carte avec les coordonnées de Perpignan
    var map = L.map('map').setView([42.6986, 2.8954], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajouter un marqueur à Perpignan
    var marker = L.marker([42.6986, 2.8954], { draggable: true }).addTo(map);

    // Ajouter un événement de clic pour marquer un lieu
    map.on('click', function(e) {
        var latlng = e.latlng;
        marker.setLatLng(latlng);
        map.panTo(latlng);

        // Mettre à jour les champs cachés avec les coordonnées
        document.getElementById('latitude').value = latlng.lat;
        document.getElementById('longitude').value = latlng.lng;

        // Afficher les coordonnées dans la console
        console.log("Coordonnées du lieu marqué :", latlng.lat, latlng.lng);
    });

    // Ajouter un événement pour mettre à jour les coordonnées lorsque le marqueur est déplacé
    marker.on('dragend', function(e) {
        var latlng = marker.getLatLng();
        document.getElementById('latitude').value = latlng.lat;
        document.getElementById('longitude').value = latlng.lng;
        console.log("Coordonnées du lieu marqué :", latlng.lat, latlng.lng);

    });

    // Références aux éléments du formulaire
    const submitButton = document.getElementById('submitButton');
    const category = document.getElementById('category');
    const photo = document.getElementById('photo');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');

    // This function checks the data before sending new works
    async function sendProject() {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            try {
                sizeCheck(photo.files[0]);
                const formData = new FormData();
                formData.append("image", photo.files[0]);
                formData.append("category", category.value);
                formData.append("latitude", latitude.value);
                formData.append("longitude", longitude.value);
                formPost(formData);
            } catch (error) {
                errorMessage(error.message, "modalError");
            }
        });
    }
    // This function check size and format of the image
    function sizeCheck(photo) {
        if (photo.size / 1024 > 4096) {
            const preview = document.querySelector(".preview");
            preview.remove();
            throw new Error("Image trop grande, veuillez en choisir une autre.");
        }
    }

    sendProject();
});
