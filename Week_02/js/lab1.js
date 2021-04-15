const map = L.map('map1').setView([20,0], 2);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


console.log("No error");

//JavaScript let variable declaration to create a marker
let marker = L.marker([37.7159, -121.9101]).addTo(map)
		.bindPopup('Dublin, CA<br> is my hometown ')
		 .openPopup();

fetch("./js/map.geojson")
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
                return layer.feature.properties.place;
            }).addTo(map);
        });
