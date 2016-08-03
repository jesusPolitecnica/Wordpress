var feature;
function modal(){
    $(".modal").fadeIn();  
    control=true;
}

$(function(){
    $(".close").click(function(){
        $(".modal").fadeOut();
        control=false;
    })

    $(".myButton").click(function(){
        $(".modal").fadeOut();
        control=false;
    })

    $("#mapaCreado").click(function(){
        $(".bodyM").html($("#map").html());
        $(".modal").fadeIn();  
    })

    $(".btnBuscar").click(function(){
        buscarDireccion();
    })

    $("#clear").click(function(){
        $(".resultado").empty();
        $(this).css("display","none");
    })
})

var map = L.map('map').
setView([41.66, -4.72], 
14);
 
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);


function crearMapa(){
    var map = L.map('map').setView([41.66, -4.72], 14);     
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);
}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        map.removeLayer(feature);
    }
    if (tipo_osm == "node") {
    feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(map);
    map.fitBounds(bounds);
    map.setZoom(18);
    }else{
         var loc3 = new L.LatLng(lat1, lng2);
         var loc4 = new L.LatLng(lat2, lng1);

     /*feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(map);*/
     map.fitBounds(bounds);
    }
}



function buscarDireccion(){
    var  direccion = $("#cajaBuscar").val();
    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' +direccion, function(data) {
        var items = [];

        $.each(data,function(key, valor){
            bb = valor.boundingbox;
            items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + valor.tipo_osm + "\");return false;'>" + valor.display_name + '</a></li>');
        })

        $(".resultado").empty();
        if (items.length != 0) {
            $('<h3>', { html: "Resultados de la b&uacute;queda:" }).appendTo('.resultado');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('.resultado');
        }else{
             $('<p>', { html: "Ningun resultado encontrado." }).appendTo('.resultado');
        }
    })
     $(".resultado").css({
        'background-color':'white'
     })
     $("#clear").css("display","block");

}
//window.onload = crearMapa;


L.control.scale().addTo(map);
//L.marker([41.66, -4.71], {draggable: true}).addTo(map);

var popup = L.popup();
latlng = "";

//formato = "marka:{latitid: 41.66, longitud: -4.71,draggable:true,descripcion:'prueba'}"
lstCordenadas = "";

function onMapClick(e) {
       /* popup
            .setLatLng((parseInt(latlng[0])+4),(parseInt(latlng[1])-45))
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
*/
        modal();
        $(".myButton").click(function(){
            $(".modal").fadeOut();
            //alert("Prueba");
            latlng = e.latlng.toString();
            latlng=latlng.substring(7,latlng.length);
            latlng=latlng.substring(0,latlng.length-1);
            //alert(latlng);

            latlng=latlng.split(",");
            nombre = $.trim($("#nomMak").val());
            descripcion = $.trim($("#desMak").val());
            L.marker([latlng[0],latlng[1]], {draggable: true}).addTo(map).bindPopup(nombre+": "+descripcion);   
            lstCordenadas='"'+nombre+'":{"latitud":'+latlng[0]+',"longitud":'+latlng[1]+',"descripcion":"'+descripcion+'"}';
            /*prueba = "{"+lstCordenadas+"}";
            prueba= JSON.parse(prueba);
            $.each(prueba,function(i,item){
                alert(item.latitud);
            })*/
            //alert(prueba[nombre].latitud);
        })      
        
        
        //lstCordenadas.push("{latitud : 'latlgn[0]', longitud : 'latlng[1]'}")
        
        

}

map.on('dblclick', onMapClick);
