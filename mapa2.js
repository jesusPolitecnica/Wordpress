/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    var display=false;
    var feature;
    var control = false;
    var contador = 0;
    var latlng = "";
    var map;
    var mark;
    var lstCordenadas = "";
    var html ="<div id='ContMap'>" 
            +"<h1>Mapa Politecnica</h1>"
            +"<hr></hr>"
            +"<div class='col-xs-5'><input id='txtBuscarMp' name='txtBuscarMp' type='text' class='form-control' /></div><div class='col-xs-3'><button type='button' class='btn'id='btnBuscar' >Buscar</button></div><div class='col-xs-5'></div></br>"
            +"<div class='col-xs-12' id='resultado'></div>"
            +"<div id='map'></div></br>"
            //+"<button type='button' id='saveMapa' class='btn btn-primary'>Guardar Mapa</button>"
            +"<input id='markCordenadas' name='markCordenadas' style='display:none;' /></div>";
    
   /* function renovarMapa(latlng,nombre,descripcion){
        map.remove();
        var lt = parseInt($.trim(latlng[0]));
        var lg = parseInt($.trim(latlng[1]));
        lt=lt+5;
        lg=lg-(-0.5);
        map = L.map('map').setView(lt,lg,1);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 14
        }).addTo(map);
        
        L.marker([latlng[0],latlng[1]], {draggable: false}).addTo(map).bindPopup(nombre+": "+descripcion);
   
    }*/
    
//    function ajax(parametros){
//        $.ajax({
//            type:'POST',
//            url:'../wp-content/plugins/maps/phpVariables.php',
//            data:parametros,
//            error:function(s){
//                alert("Error");
//            }
//        }).done(function(s){
//            alert(s);
//        })
//    }
    
    
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
            $(function(){
               $("#publish").mouseover(function(){
                   if(typeof mark !== "undefined" ){
                       latlng = mark.getLatLng().toString();
                       latlng=latlng.substring(7,latlng.length);
                       latlng= latlng.replace(")","");
                       latlng = latlng.split(",");
                       
                       lstCordenadas='"{"latitud":'+latlng[0]+',"longitud":'+latlng[1]+'}';
                       mark.setPopupContent($.trim($("#title").val()));
                       $("#markCordenadas").val(lstCordenadas);
                      
                        var d = $("#content").val();
                        d = d.split("[");
                        
                        if(typeof d[1] == "undefined"){
                            $("#content").val($("#content").val()+"\n [Mapa]");
                        }
                          
                          

                       
//                       parametros ={
//                           control : true,
//                           latitud : latlng[0],
//                           longitud : latlng[1],
//                           mark : $.trim($("#title").val())            
//                       }
                       
                       //ajax(parametros);
                   }

               })
               
               $("#btnCrearMapa").click(function(){
                  // $("#btnCrearMapa").attr("disabled","disabled");
                  if(!display){
                      $("#poststuff").append(html);
                      display = true;
                  }
                  
                   if(!control){
                       $("#ContMap").fadeIn();
                        $("#btnCrearMapa").text("Quitar Modulo Mapa");
                        control = true;
                    }else{
                        //$("#ContMap").css("display","none");
                        $("#ContMap").fadeOut();
                        $("#btnCrearMapa").text("Agregar Mapa");
                        control = false;
                    }
                    $("#btnBuscar").focus();
                    
                      map = L.map('map').
                        setView([41.66, -4.72], 
                        14);

                        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                            maxZoom: 18
                        }).addTo(map);
                    $("#saveMapa").click(function(){
                         alert("esto es una prueba");
                     })
                     
                     $("#btnBuscar").click(function(){
                         if($("#txtBuscarMp").val()!=""){
                             buscarDireccion();
                         }else{
                             alert("El campo de busqueda esta vacio");
                         }
                         
                     })
                    
                    $("#saveMapa").click(function(){
                        if(typeof lstCordenadas != undefined && lstCordenadas != ""){
                            alert(lstCordenadas);
                        }else{
                            alert("Debe poner almenos una marca en el mapa");
                        }
                        
                    })
                    function buscarDireccion(){
                        var  direccion = $("#txtBuscarMp").val();
                        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' +direccion, function(data) {
                            var items = [];

                            $.each(data,function(key, valor){
                                bb = valor.boundingbox;
                                items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + valor.tipo_osm + "\");return false;'>" + valor.display_name + '</a></li>');
                            })

                            $("#resultado").empty();
                            if (items.length != 0) {
                                $('<h3>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
                                $('<ul/>', {
                                    'class': 'my-new-list',
                                    html: items.join('')
                                }).appendTo('#resultado');
                            }else{
                                 $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
                            }
                        })

                    }

                    function onDragEnd(e){
                        alert("Prueba");
                    }

                    
                    function onMapClick(e) {
                    /* popup
                         .setLatLng((parseInt(latlng[0])+4),(parseInt(latlng[1])-45))
                         .setContent("You clicked the map at " + e.latlng.toString())
                         .openOn(map);*/

                         //alert("Prueba");
                         
                            latlng = e.latlng.toString();
                            latlng=latlng.substring(7,latlng.length);
                            latlng=latlng.substring(0,latlng.length-1);
                            //alert(latlng);

                            latlng=latlng.split(",");
                            var nombre = $.trim($("#title").val());
                            descripcion = $.trim($("#desMak").val());
                         if(contador == 0){
                            mark = new L.marker([latlng[0],latlng[1]], {draggable: true});
                            map.addLayer(mark);
                            mark.bindPopup(nombre).openPopup();
                            lstCordenadas='"{"latitud":'+latlng[0]+',"longitud":'+latlng[1]+'}';

                            $("#markCordenadas").val(lstCordenadas);
                            contador++;
                         }
                         
                         /*prueba = "{"+lstCordenadas+"}";
                         prueba= JSON.parse(prueba);
                         $.each(prueba,function(i,item){
                          alert(item.latitud);
                      })*/
                     //alert(prueba[nombre].latitud);
              //lstCordenadas.push("{latitud : 'latlgn[0]', longitud : 'latlng[1]'}")
             }

             map.on('dblclick', onMapClick);
             //map.on('mouseover',onDragEnd);
                 })
            })
               

 
