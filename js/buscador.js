new Vue({
    el:'#app',
    data:{
        is_error:false,
        direccion:''
    },
    // 4.6485128,-74.163164,17
    // 4.6475062,-74.1596815,15.01
    mounted() {


        let limites_predeterminados = new google.maps.LatLngBounds(
            // new google.maps.LatLng(4.6485128,-74.163164),
            // new google.maps.LatLng(4.6475062,-74.1596815)
            );

        let opciones = {
            // bounds: limites_predeterminados,
            types: ['address']
        }
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('direccion'), opciones);
        autocomplete.addListener('place_changed', () =>{
            // infowindow.close();
            // marker.setVisible(false);
            var place = autocomplete.getPlace();

            this.direccion = place

            console.log(place);

            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                this.is_error = true;
                // window.alert("No hay detalles disponibles para este lugar: '" + place.name + "'");
                return;
            }
        });
        
    },
})