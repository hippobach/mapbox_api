mapboxgl.accessToken =
  'pk.eyJ1IjoicGh1Y3ZhYmFjaHV0YyIsImEiOiJjbHY1aGUyODcwMm1lMmpvYjhmb29tNHhrIn0.AvQWgGX-wobH54rkKS0NHA';

function setUpMap(center) {
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 5,
  });
}

function successLocation(position) {
  var map = setUpMap([position.coords.longitude, position.coords.latitude]);
  var marker = new mapboxgl.Marker({
    color: 'red',
    draggable: true,
    anchor: 'bottom',
  })
    .setLngLat([position.coords.longitude, position.coords.latitude])
    .addTo(map);

  var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    anchor: 'right',
  })
    .setLngLat([105.85, 21.0])
    .setHTML('<h1>Xin chào Hà Nội!</h1>')
    .addTo(map);

  // add navigation control
  map.addControl(
    new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
    })
  );

  // detect user location
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial',
  });
  map.addControl(scale);
  scale.setUnit('metric');

  // fullscreen
  map.addControl(new mapboxgl.FullscreenControl());

  // display popup when user click on map
  map.on('click', function (e) {
    var popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .setHTML('<h1>vị trí nhấn là: ' + e.lngLat + '</h1>')
      .addTo(map);
  });

  // create a blue marker when user double-clicks on map
  map.on('dblclick', function (e) {
    new mapboxgl.Marker({
      color: 'blue',
      draggable: true,
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);
  });

  // add control mapbox directions
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    'bottom-left'
  );

  // select language for mapbox
  document.getElementById('buttons').addEventListener('click', (event) => {
    const language = event.target.id.substr('button-'.length);
    // Use setLayoutProperty to set the value of a layout property in a style layer.
    // The three arguments are the id of the layer, the name of the layout property, and the new property value.
    map.setLayoutProperty('country-label', 'text-field', [
      'get',
      `name_${language}`,
    ]);
  });
}

function errorLocation() {
  var map = setUpMap([-2.24, 53.48]);
  var marker = new mapboxgl.Marker({
    color: 'red',
    draggable: true,
    anchor: 'bottom',
  })
    .setLngLat([-2.24, 53.48])
    .addTo(map);
}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});
