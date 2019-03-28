<?php

class Bootenberg {
    private static $_instance = null;

    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
    }

    public function enqueue_styles() {
        
    }

    public function enqueue_scripts() {
        
    }


    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }
}