let map;

function initMap() {
  // Check if Geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 15
        });

        // Add a marker at the user's location
        const marker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'You Are Here!'
        });

        // Reverse geocode the user's location
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: userLocation }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              // Display the formatted address on the map
              const infowindow = new google.maps.InfoWindow({
                content: results[0].formatted_address
              });
              infowindow.open(map, marker);
            } else {
              console.error('No results found');
            }
          } else {
            console.error(`Geocoder failed due to: ${status}`);
          }
        });
      },
      (error) => {
        // Handle the error and ask for permission
        if (error.code === error.PERMISSION_DENIED) {
          alert("To use this feature, please enable location services in your browser settings.");
        } else {
          console.error('Error getting user location:', error.message);
        }
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}
