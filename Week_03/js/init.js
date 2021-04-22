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

function addMarker2(lat, long, message, color, img) {
    L.circleMarker([lat, long], {
        "radius": 10,
        "fillColor": color,
        "color": color,
        "weight": 3,
        "opacity": 1,
        "fillOpacity": 0.5
      }).addTo(map).bindPopup(`<center>${message.bold()}</center><br>` + img);
      createButtons(lat,long,message,17);
}

let places = [
    {'place': "Muracci's Japanese Curry and Grill",
    'coord': [37.790890, -122.404228],
    'color': '#4363d8',
    'img': '<img src="https://i1.wp.com/www.dailycal.org/assets/uploads/2014/09/Screen-Shot-2014-09-17-at-3.36.40-PM.png?ssl=1"/>'},
    {'place': "Shaking Crab",
    'coord': [37.698170, -122.480980],
    'color': '#3cb44b',
    'img': '<img src="https://d1ralsognjng37.cloudfront.net/458c8225-2b51-4f8a-a01c-4d76239994a8.jpeg"/>'},
    {'place': "Boba Bliss",
    'coord': [37.722500, -121.942100],
    'color': '#f58231',
    'img': '<img src="https://media-cdn.tripadvisor.com/media/photo-s/1b/51/68/6e/strawberry-and-mango.jpg"/>'
    },
    {'place': "Teaspoon",
    'coord': [37.762220, -121.950890],
    'color': '#911eb4',
    'img': '<img src="https://teaspoon-palo-alto.weebly.com/uploads/1/2/3/9/123954192/s166302402559628462_p73_i1_w953.png"/>'
    },
    {'place': "Odagada Chicken & Katsu",
    'coord': [37.704570, -121.875450],
    'color': '#ba3e34',
    'img': '<img src="https://www.odagadachicken.com/wp-content/uploads/2018/10/Chicken-Tenders.jpg"/>'
    },  
];

createButtons(37.712545, -122.035845,"Reset Zoom", 10);

for (let i = 0; i < places.length; i++) {
    addMarker2(places[i].coord[0], places[i].coord[1],places[i].place, places[i].color, places[i].img);
}
