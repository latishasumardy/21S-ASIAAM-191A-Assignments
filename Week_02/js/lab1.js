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

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    let node = document.getElementById("buttons");
    node.appendChild(newButton); //this adds the button to our div.
}
function addMarker2(lat, long, message, color) {
    let favColor = color;
    console.log("My favorite color is " + favColor);
    L.circleMarker([lat, long], {
        "radius": 10,
        "fillColor": color,
        "color": color,
        "weight": 1,
        "opacity": 1
        }).addTo(map).bindPopup(message);
        createButtons(lat,long,message);
    return favColor;
}

addMarker2(20,-122,"one", '#000000');
addMarker2(30.0709, -118.444,"two", '#f542ce');
addMarker2(35.7409, -122.484,"three", '#ba3e34');