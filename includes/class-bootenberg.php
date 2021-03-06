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

        add_action( 'init', array( $this, 'register_blocks' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
        add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_styles' ) );

        add_filter( 'block_categories', array( $this, 'block_categories' ), 10, 2 );

        //remove_filter( 'wp_editor_settings', 'gutenberg_disable_editor_settings_wpautop' );
    }

    public function register_blocks() {
        $blocks_url = plugins_url( 'assets/blocks.bundle.min.js', $this->file );
        wp_register_script( 'bootenberg-blocks', $blocks_url, array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ) );

        register_block_type( 'bootenberg/alert', array(
            'editor_script' => 'bootenberg-blocks'
        ) );
    }

    public function enqueue_styles() {
        $bootstrap_url = plugins_url( 'node_modules/bootstrap/dist/css/bootstrap.min.css', $this->file );

        wp_register_style( 'bootstrap', $bootstrap_url, null, '4.3.1', 'all' );
        wp_enqueue_style( 'bootstrap' );        
    }

    public function enqueue_scripts() {
        $bootstrap_url = plugins_url( 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', $this->file );
        
        wp_register_script( 'bootstrap', $bootstrap_url, array( 'jquery' ), '4.3.1', true );
        wp_enqueue_script( 'bootstrap' );
    }

    public function enqueue_block_editor_styles() {
        $bootenberg_url = plugins_url( 'assets/style-editor.css', $this->file );

        wp_register_style( 'bootenberg', $bootenberg_url, null, '0.0.1', 'all' );
        wp_enqueue_style( 'bootenberg' );
    }

    public function block_categories( $categories, $post ) {
        return array_merge( $categories, array(
            array(
                'slug' => 'bootstrap-components',
                'title' => __( 'Bootstrap Components', 'bootenberg' )
            )
        ) );
    }


    public static function instance( $file = '' ) {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self( $file );
        }

        return self::$_instance;
    }
}