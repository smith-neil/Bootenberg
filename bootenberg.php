<?php

/*
* Plugin Name: Bootenberg
*/

if ( !defined( 'ABSPATH' ) ) exit;

require_once( 'includes/class-bootenberg.php' );

function Bootenberg_Init() {
    $instance = Bootenberg::instance( __FILE__ );

    return $instance;
}

Bootenberg_Init();