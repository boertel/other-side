mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJjbGtsaHN4aDYwbXI4M2ttdndzanF0aWE1In0.MjBSZq0Lb1FuZgUbSIu2RA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/boertel/ciqy9y3fl0001bpnohs9hdps8",
  center: [-122.40836709737778, 37.79942516278797],
  zoom: 15,
});

var office = [-122.40603893995284, 37.797831373796456];

function metersToPixelsAtMaxZoom(meters, latitude) {
  return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

map.on("load", function () {
  map.addSource("data", {
    type: "geojson",
    data: "./map.geojson",
  });

  map.addSource("radius", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: office,
          },
        },
      ],
    },
  });

  var RADIUS = 700;

  map.addLayer({
    id: "radius",
    type: "circle",
    source: "radius",
    paint: {
      "circle-color": "rgba(0, 0, 0, 0.1)",
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixelsAtMaxZoom(700, office[1])],
        ],
        base: 2,
      },
    },
  });

  map.addLayer({
    id: "point",
    type: "circle",
    source: "data",
    paint: {
      "circle-color": {
        property: "rating",
        stops: [
          [0, "rgba(243, 38, 38, 0.7)"],
          [5, "rgba(43, 142, 43, 0.7)"],
        ],
      },
      "circle-radius": {
        stops: [
          [10, 1],
          [14, 8],
        ],
      },
    },
  });
});
