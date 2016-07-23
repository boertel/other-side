mapboxgl.accessToken = 'pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/boertel/ciqy9y3fl0001bpnohs9hdps8',
    center: [-122.40836709737778, 37.79942516278797],
    zoom: 16,
});

function projectPoint(lon, lat) {
    var point = map.project(new mapboxgl.LngLat(lon, lat));
    this.stream.point(point.x, point.y);
}
map.on('load', function() {
    map.addSource('data', {
        type: 'geojson',
        data: './map.geojson'
    });

    map.addLayer({
        'id': 'point',
        'type': 'circle',
        'source': 'data',
        'paint': {
            'circle-color': {
                'property': 'rating',
                'stops': [
                    [0, 'rgba(243, 38, 38, 0.7)'],
                    [5, 'rgba(43, 142, 43, 0.7)']
                ]
            },
            'circle-radius': {
                'stops': [
                    [10, 1],
                    [14, 8],
                ]
            },
        }
    });

    /*
    window.setTimeout(function() {
        var bounds = new mapboxgl.LngLatBounds();
        var features = map.queryRenderedFeatures({layers: ['point']});
        if (features.length) {
            features.forEach(function(feature) {
                bounds.extend(feature.geometry.coordinates);
            });
            map.fitBounds(bounds, {padding: 200});
        }
    }, 1000);
    */

});

