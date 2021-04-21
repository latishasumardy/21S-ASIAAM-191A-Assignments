let coord = [37.712545, -122.035845];
let zoom = 9.5;
const map = L.map('map').setView(coord, zoom);

L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers
/*let work = L.marker([34.0709, -118.444]).addTo(map)
		.bindPopup('Where I work on campus')

let home = L.marker([37.7409, -122.484]).addTo(map)
		.bindPopup('Where I currently am')

let random = L.marker([39.7409, -122.484]).addTo(map)
		.bindPopup('Third Point')
*/
function createButtons(lat,lng,title,zoom){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], zoom); //this is the flyTo from Leaflet
    })
    document.getElementById("buttons").appendChild(newButton); //this adds the button to our page.
}

function addMarker(lat, long, message) {
    console.log(message);
    L.marker([lat, long]).addTo(map).bindPopup(`<h2>${message}</h2>`);
    createButtons(lat,long,message);
    return message;
}

function addMarker2(lat, long, message, color) {
    L.circleMarker([lat, long], {
        "radius": 10,
        "fillColor": color,
        "color": color,
        "weight": 3,
        "opacity": 1,
        "fillOpacity": 0.5
      }).addTo(map).bindPopup(message);
      createButtons(lat,long,message,17);
}

createButtons(37.712545, -122.035845,"Reset Zoom", 10);
addMarker2(37.790890, -122.404228,"Muracci's Japanese Curry and Grill", '#000000');
addMarker2(37.698170, -122.480980,"Shaking Crab", '#f542ce');
addMarker2(37.722500, -121.942100,"Boba Bliss", '#ba3e34');
addMarker2(37.762220, -121.950890,"Teaspoon", '#ba3e34');
addMarker2(37.704570, -121.875450,"Odagada", '#ba3e34');
