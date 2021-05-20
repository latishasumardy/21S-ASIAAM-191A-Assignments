const map = L.map('map').setView([34.0709, -118.444], 5);

let circleULCA = {
        radius: 6,
        fillColor: "#22a7e0",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
}

let circleOther = {
        radius: 6,
        fillColor: "#be53cf",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
}

let isUCLAstudent = L.featureGroup();
let otherStudent = L.featureGroup();

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

OpenStreetMap_HOT.addTo(map)


function addMarker(data){
        if(data.areyouauclastudent == "Yes"){
            isUCLAstudent.addLayer(L.circleMarker([data.lat,data.long],circleULCA).bindPopup(`<h2>${data.whatisyourname}'s favorite city is ${data.whatisyourfavoritecity}</h2>`))
            createButtons(data.lat,data.long,data.whatisyourname)
            }
        else{
            otherStudent.addLayer(L.circleMarker([data.lat,data.long],circleOther).bindPopup(`<h2>${data.whatisyourname} goes to ${data.whatschooldoyougoto}, and their favorite city is ${data.whatisyourfavoritecity}</h2>`))
            createButtons(data.lat,data.long,data.whatisyourname)
        }
        return data.timestamp
    }

let url = "https://spreadsheets.google.com/feeds/list/1A33l0gE8EVlLBZeyVFdUIutikGk_U9vsQhlNjTXEMNU/ofldnl2/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)
function createButtons(lat,lng,title){
        const newButton = document.createElement("button"); // adds a new button
        newButton.id = "button"+title; // gives the button a unique id
        newButton.innerHTML = title; // gives the button a title
        newButton.setAttribute("lat",lat); // sets the latitude 
        newButton.setAttribute("lng",lng); // sets the longitude 
        newButton.addEventListener('click', function(){
            map.flyTo([lat,lng], 10); //this is the flyTo from Leaflet
        })
        const spaceForButtons = document.getElementById("contents");
        spaceForButtons.appendChild(newButton); //this adds the button to our page.
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        isUCLAstudent.addTo(map) // add our layers after markers have been made
        otherStudent.addTo(map) // add our layers after markers have been made  
        let allLayers = L.featureGroup([isUCLAstudent,otherStudent]);
        map.fitBounds(allLayers.getBounds());
}

let layers = {
	"Is UCLA Student": isUCLAstudent,
	"Other Student": otherStudent
}

L.control.layers(null,layers).addTo(map)



