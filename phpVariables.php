<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$control = false;
$latitud = "";
$longitud = "";
$mark= "";
if(isset($_POST["control"])){
    $control = $_POST["control"];
}

if($control){
    $latitud = $_POST["latitud"];
    $longitud = $_POST["longitud"];
    $mark= $_POST["mark"];
}
