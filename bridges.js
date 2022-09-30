let usBridgesCoordinates = [42.96, -98.771556]
let zoomLevel = 3 // 1 = whole world, 20 = city blocks, 1

let map = L.map('bridges-map').setView(usBridgesCoordinates, zoomLevel)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let bridges = [
    {
    "Bridge Name": "Verrazano-Narrows Bridge", 
    "City, State": "New York, NY", 
    "Span (meters)": "1298.4",
    "Location (latitude, longitude)": [40.6066, -74.0447]
    },
    {
    "Bridge Name": "Golden Gate Bridge", 
    "City, State": "San Francisco and Marin, CA", 
    "Span (meters)": "1280.2",
    "Location (latitude, longitude)": [37.8199, -122.4783]
    },
{
    "Bridge Name": "Mackinac Bridge", 
    "City, State": "Mackinaw and St Ignace, MI", 
    "Span (meters)": "1158.0",
    "Location (latitude, longitude)": [45.8174, -84.7278]
    },
{
    "Bridge Name": "George Washington Bridge", 
    "City, State": "New York, NY and New Jersey, NJ", 
    "Span (meters)": "1067.0",
    "Location (latitude, longitude)": [40.8517, -73.9527]
    },
{
    "Bridge Name": "Tacoma Narrows Bridge", 
    "City, State": "Tacoma and Kitsap, WA", 
    "Span (meters)": "853.44",
    "Location (latitude, longitude)": [47.2690, -122.5517]
    }
]

let bridgeNameProperty = ''
let spanProperty = ''
let locationProperty = ''
let sampleObject = bridges[0]

// Evaluate the data set oject structure so that the code works with either dataset
// This assumes the structure of each object in the array is the same
for (let bridgeProp in sampleObject){
    let bridgePropLower = bridgeProp.toLowerCase()
    if (bridgePropLower.indexOf('name') != -1){
        bridgeNameProperty = bridgeProp
    }
    
    if (bridgePropLower.indexOf('span')!= -1 &&
        bridgePropLower.indexOf('text') == -1){
        spanProperty = bridgeProp
    }

    if (bridgePropLower.indexOf('location') != -1){
        locationProperty = bridgeProp
    }
}

// creating arrays here to be used in the chart. 
// that way, the chart can be automatically updated to accomodate a different set of bridge data
let bridgeNames = []
let bridgeSpans = []

bridges.forEach(function(bridge){
    // Draw a marker for each bridge
    L.marker(bridge[locationProperty])
    .bindPopup(bridge[bridgeNameProperty]+'<br>Span: ' + bridge[spanProperty])
    .addTo(map)
    if (bridge[bridgeNameProperty]!='' && bridge[spanProperty] != ''){
        bridgeNames.push(bridge[bridgeNameProperty])
        bridgeSpans.push(bridge[spanProperty]) 
    }
  
})
console.log(bridgeNames, bridgeSpans)

let canvas = document.querySelector('#bridges-chart')
let context = canvas.getContext('2d')


let chart = new Chart(context, {
    type: 'bar', 
    data: {
        labels: bridgeNames,
        datasets: [{
            label: 'Span (meters)',
            data: bridgeSpans
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        layout: {
            padding: 100
        }
    }
})







