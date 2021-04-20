let long = 34.0709;
let lat = -118.444;
let zoom = 5;
const map = L.map('map').setView([long, lat], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

function addMarker(lat, long, message) {
    console.log(message);
    L.marker([lat, long]).addTo(map).bindPopup(`<h2>${message}</h2>`);
    createButtons(lat,long,message);
    return message;
}

addMarker(40,-122,"hello world");
addMarker(34.0709, -118.444,"Where I work on campus");
addMarker(37.7409, -122.484,"Where I currently am");
addMarker(39.7409, -122.484,"third point");

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
