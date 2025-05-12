const map = L.map('map').setView([50, 10], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load route lines
fetch('route.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
        style: { color: "#3388ff", weight: 3 }
    }).addTo(map);
  });

// Load charger sites
fetch('sites.json')
  .then(res => res.json())
  .then(sites => {
    sites.forEach(site => {
        const popup = `
        <b>${site.site} near ${site.city}</b><br>
        <table>
          <tr><td>Distance Score:</td><td>${site.scores.distanceScore}</td></tr>
          <tr><td>Energy Score:</td><td>${site.scores.energyScore}</td></tr>
          <tr><td>Amenity Score:</td><td>${site.scores.amenityScore}</td></tr>
          <tr><td>Grid Score:</td><td>${site.scores.gridScore}</td></tr>
          <tr><td>Accessibility Score:</td><td>${site.scores.accessibilityScore}</td></tr>
          <tr><td><b>Total:</b></td><td><b>${site.totalScore}</b></td></tr>
        </table>
        `;

        const marker = L.circleMarker([site.latitude, site.longitude], {
            radius: 6,
            fillColor: site.color,
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        marker.bindPopup(popup);
    });
  });