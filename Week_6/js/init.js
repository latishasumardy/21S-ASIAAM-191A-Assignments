const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our fields in the google sheets:
        L.marker([data.lat,data.long]).addTo(map).bindPopup(`<h2>${data.whatisyourname}'s favorite city is ${data.whatisyourfavoritecity}</h2>`)
        createButtons(data.lat,data.long,data.whatisyourname)
        return data.timestamp
}

let url = "https://spreadsheets.google.com/feeds/list/1xPw3EFo-WLoKFAV4Gj-m6-mHxcCe6B13UzHWdgT-wCs/ol3jcg1/public/values?alt=json"

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
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
}


