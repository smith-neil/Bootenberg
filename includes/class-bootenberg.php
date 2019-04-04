<?php

class Bootenberg {
    private static $_instance = null;

    public $file;
    public $dir;
    public $url;
    public $assets_dir;
    public $assets_url;

    public function __construct( $file = '' ) {
        $this->file = $file;
        $this->dir = dirname( $this->file );
		$this->assets_dir = trailingslashit( $this->dir ) . 'assets';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/assets/', $this->file ) ) );

        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
    }

    public function enqueue_styles() {
        $bootstrap_url = plugins_url( 'node_modules/bootstrap/dist/css/bootstrap.min.css', $this->file );

        wp_register_style( 'bootstrap', $bootstrap_url, null, '4.3.1', 'all' );
        wp_enqueue_style( 'bootstrap' );
    }

    public function enqueue_scripts() {
        $bootstrap_url = plugins_url( 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', $this->file );
        
        wp_register_script( 'bootstrap', $bootstrap_url, null, '4.3.1', true );
        wp_enqueue_script( 'bootstrap' );
    }


    public static function instance( $file = '' ) {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self( $file );
        }

        return self::$_instance;
    }
}