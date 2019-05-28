        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

        function initMap() {

            let ubicacionNegocio = {
                lat: 5.6876508999999995,
                lng: -76.6548408
            }

            var map = new google.maps.Map(document.getElementById('map'), {
                center: ubicacionNegocio,
                zoom: 15,

            });

            
            new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29),
                position: ubicacionNegocio,
            }).setVisible(true);



            var card = document.getElementById('pac-card');
            var input = document.getElementById('pac-input');
            var types = document.getElementById('type-selector');
            var strictBounds = document.getElementById('strict-bounds-selector');

            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

            var autocomplete = new google.maps.places.Autocomplete(input);

            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            autocomplete.bindTo('bounds', map);

            // Set the data fields to return when the user selects a place.
            autocomplete.setFields(
                ['address_components', 'geometry', 'icon', 'name']);

            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            });

            // En esta sección está el código que ingresa los nuevos markers
            var locations = [{
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -31.563910,
                    lng: 147.154312
                },
                {
                    lat: -33.718234,
                    lng: 150.363181
                },
                {
                    lat: -33.727111,
                    lng: 150.371124
                },
                {
                    lat: -33.848588,
                    lng: 151.209834
                },
                {
                    lat: -33.851702,
                    lng: 151.216968
                },
                {
                    lat: -34.671264,
                    lng: 150.863657
                },
                {
                    lat: -35.304724,
                    lng: 148.662905
                },
                {
                    lat: -36.817685,
                    lng: 175.699196
                },
                {
                    lat: -36.828611,
                    lng: 175.790222
                },
                {
                    lat: -37.750000,
                    lng: 145.116667
                },
                {
                    lat: -37.759859,
                    lng: 145.128708
                },
                {
                    lat: -37.765015,
                    lng: 145.133858
                },
                {
                    lat: -37.770104,
                    lng: 145.143299
                },
                {
                    lat: -37.773700,
                    lng: 145.145187
                },
                {
                    lat: -37.774785,
                    lng: 145.137978
                },
                {
                    lat: -37.819616,
                    lng: 144.968119
                },
                {
                    lat: -38.330766,
                    lng: 144.695692
                },
                {
                    lat: -39.927193,
                    lng: 175.053218
                },
                {
                    lat: -41.330162,
                    lng: 174.865694
                },
                {
                    lat: -42.734358,
                    lng: 147.439506
                },
                {
                    lat: -42.734358,
                    lng: 147.501315
                },
                {
                    lat: -42.735258,
                    lng: 147.438000
                },
                {
                    lat: -43.999792,
                    lng: 170.463352
                }
            ]
            var markers = locations.map(function (location, i) {
                let mar = new google.maps.Marker({
                    map: map,
                    position: location,
                    anchorPoint: new google.maps.Point(0, -29),
                    // label: labels[i % labels.length]
                });

                // console.log(mar);


                return mar.setVisible(true);
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });





            autocomplete.addListener('place_changed', function () {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();

                console.log(place);

                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No hay detalles disponibles para este lugar: '" + place.name + "'");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    // console.log(place.geometry.location);

                    map.setZoom(17); // Why 17? Because it looks good.
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindowContent.children['place-icon'].src = place.icon;
                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-address'].textContent = address;
                infowindow.open(map, marker);
            });

            // Sets a listener on a radio button to change the filter type on Places
            // Autocomplete.
            function setupClickListener(id, types) {
                var radioButton = document.getElementById(id);
                radioButton.addEventListener('change', function () {
                    autocomplete.setTypes(types);
                });
            }

            setupClickListener('changetype-all', []);
            setupClickListener('changetype-address', ['address']);
            setupClickListener('changetype-establishment', ['establishment']);
            setupClickListener('changetype-geocode', ['geocode']);

            document.getElementById('use-strict-bounds')
                .addEventListener('click', function () {
                    console.log('Checkbox clicked! New state=' + this.checked);
                    autocomplete.setOptions({
                        strictBounds: this.checked
                    });
                });
        }