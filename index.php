<?php
/*plugin name: Maps Politecnica
plugin url: http://localhost
Description: Plugin creado para el manejo de mapas
Author: Jesús Daniel Pardo Serrato
Author url: http://localhost
version: 1.0
License: GLP2 */


//add_action("admin_print_styles","addStyle");
add_action('post_submitbox_misc_actions','agregarArchvios');




function agregarArchvios(){
            ?>
<link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
<link href='../wp-content/plugins/maps/css/conexion.css' rel='stylesheet' type='text/css'/>
<link href='../wp-content/plugins/maps/leaflet.css' rel='stylesheet' type='text/css'/>
<script src='../wp-content/plugins/maps/jquery-2.1.4.min.js'></script>
<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
<script src='../wp-content/plugins/maps/leaflet-src.js'></script>
<script src='../wp-content/plugins/maps/leaflet.js'></script>
<script src='../wp-content/plugins/maps/mapa2.js'></script>

<button type='button' id='btnCrearMapa' class='btn btn-primary btn-block'>Agregar Mapa</button>


<?php
}


?>

<?php 

//function mpw_create_widget(){    
//    include_once(plugin_dir_path( __FILE__ ).'/widget/mp_widget.php');
//    register_widget('mp_widget');
//}
//add_action('widgets_init','mpw_create_widget'); 



function cargarMap(){
    require_once("../wordpress/wp-content/plugins/maps/phpVariables.php");
    
    ?>
<!--    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
    <link href='../wordpress/wp-content/plugins/maps/css/showMaps.css' rel='stylesheet' type='text/css'/>
    <link href='../wordpress/wp-content/plugins/maps/leaflet.css' rel='stylesheet' type='text/css'/>
    <script src='../wordpress/wp-content/plugins/maps/jquery-2.1.4.min.js'></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
    <script src='../wordpress/wp-content/plugins/maps/leaflet-src.js'></script>
    <script src='../wordpress/wp-content/plugins/maps/leaflet.js'></script>
    <script src='../wordpress/wp-content/plugins/maps/showMap.js'></script>-->

    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
    <link href='../../../../../../showMaps.css' rel='stylesheet' type='text/css'/>
    <link href='../../../../../leaflet.css' rel='stylesheet' type='text/css'/>
    <script src='../../../../../jquery-2.1.4.min.js'></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
    <script src='../../../../../leaflet-src.js'></script>
    <script src='../../../../../leaflet.js'></script>
    <script src='../../../../../showMap.js'></script>

    <div id = "map"></div>
    
    <script>
        var postmeta = <?php echo json_encode(get_post_meta( get_the_ID(), 'coordenadas', true )); ?>;
        
        //posmeta = JSON.parse(postmeta);
//        $.each(posmeta,function(i,item){
//            alert(item["latitud"])
//        })
        alert(postmeta)
        $(function(){
            $("#map").append(postmeta);
        })
    </script>
<?php
}

add_shortcode('Mapa', 'cargarMap');
?>




<!--
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>

        <style>
            #btnMapa{
                position: absolute;
                z-index:9999;
            }
        </style>

</head>
<body>
    <button id="btnMapa" type='button'>Prueba</button>
<scritp>
    alert("Prueba");
</scritp>
</body>
</html>
-->

<?php
?>