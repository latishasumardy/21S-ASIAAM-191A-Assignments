const map = L.map('map-p1').setView([37,-112], 5.25);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


console.log("No error");


fetch("./js/ucmap.geojson")
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
                        // the leaflet method for adding a geojson
            L.geoJSON(data, {
                style: function (feature) {
                    return {color: 'red'};
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.school;
            }).addTo(map);
        });
