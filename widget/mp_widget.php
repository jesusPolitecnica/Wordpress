<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of mp_widget
 *
 * @author Politecnica
 */
class mp_widget extends WP_Widget {
    
    function mp_widget(){
        // Constructor del Widget.
        $widget_ops = array('classname' => 'mp_widget', 'description' => "Descripción de Mi primer Widget" );
        $this->WP_Widget('mp_widget', "Mi primer Widget", $widget_ops);
    }

    function widget($args,$instance){
        // Contenido del Widget que se mostrará en la Sidebar
//        echo $before_widget;    ../../wp-content/plugins/maps/widget/
        ?>
<!--            <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'/>
            <link href='../wordpress/wp-content/plugins/maps/widget/mp_widget.css' rel='stylesheet' type='text/css'/>
            <link href='../wordpress/wp-content/plugins/maps/leaflet.css' rel='stylesheet' type='text/css'/>
            <script src='../wordpress/wp-content/plugins/maps/jquery-2.1.4.min.js'></script>
            <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
            <script src='../wordpress/wp-content/plugins/maps/leaflet-src.js'></script>
            <script src='../wordpress/wp-content/plugins/maps/leaflet.js'></script>
            <script src='../wordpress/wp-content/plugins/maps/widget/mp_widget.js'></script>
            -->
<!--            <div id="map">
                
            </div>
            <div id="prueba"><?php var_dump( get_post_meta( 230, 'Prueba', true ) );?></div>
            <script>
                //alert("id = <?php echo get_the_ID(); ?>");
                console.log("<?php echo get_post_meta( 230, 'Prueba', true )?>");    
            </script>-->
        <?php
//        echo $after_widget;
    }


    function form($instance){
        // Formulario de opciones del Widget, que aparece cuando añadimos el Widget a una Sidebar
        ?>
         <p>
            <label for="<?php echo $this->get_field_id('mpw_texto'); ?>">Texto del Widget</label>
            <input class="widefat" id="<?php echo $this->get_field_id('mpw_texto'); ?>" name="<?php echo $this->get_field_name('mpw_texto'); ?>" type="text" value="<?php echo esc_attr($instance["mpw_texto"]); ?>" />
         </p>  
         <?php
    }    
}
?>