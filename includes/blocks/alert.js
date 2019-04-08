const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { PanelBody, PanelRow, SelectControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

import classNames from 'classnames';

// TODO:
// 1. InnerBlocks renders a paragraph by default. This screws up the frontend because
//    paragraphs have bottom margin. It doesn't affect the backend because .editor-rich-text__tinymce
//    removes margin.
// 2. .editor-block-list__block-edit adds top and bottom margin to the list of blocks. 
//    This should be disabled as it does not do the same on the frontend.

registerBlockType( 'bootenberg/alert', {
    title: 'Alert',
    icon: 'universal-access-alt',
    category: 'bootstrap-components',
    attributes: {
		type: {
			type: 'string',
			default: 'info'
        },
        dismissible: {
            type: 'boolean',
            default: false
        },
        fade: {
            type: 'boolean',
            default: true
        }
	},
    edit({ className, attributes, setAttributes }) {
        const { type, dismissible, fade } = attributes;

        const updateType = type => setAttributes({ type });
        const updatedismissible = dismissible => setAttributes({ dismissible });
        const updateFade = fade => setAttributes({ fade });

        const alertClasses = classNames(
            'alert',
            'alert-' + type,
            {
                'alert-dismissible': dismissible,
                'fade': fade,
                'show': fade
            },
            className
        );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __( "Alert Settings", "bootenberg" ) }>
                        <PanelRow>
                            <SelectControl
                                label={ __( "Type", "bootenberg" ) }
                                value={type}
                                options={[
                                    { label: __( "Primary", "bootenberg" ), value: __( "primary", "bootenberg" ) },
                                    { label: __( "Secondary", "bootenberg" ), value: __( "secondary", "bootenberg" ) },
                                    { label: __( "Success", "bootenberg" ), value: __( "success", "bootenberg" ) },
                                    { label: __( "Danger", "bootenberg" ), value: __( "danger", "bootenberg" ) },
                                    { label: __( "Warning", "bootenberg" ), value: __( "warning", "bootenberg" ) },
                                    { label: __( "Info", "bootenberg" ), value: __( "info", "bootenberg" ) },
                                    { label: __( "Light", "bootenberg" ), value: __( "light", "bootenberg" ) },
                                    { label: __( "Dark", "bootenberg" ), value: __( "dark", "bootenberg" ) }
                                ]}
                                onChange={updateType}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( "Dismissible", "bootenberg" ) }
                                help={ __( "Note: The dismiss button is disabled in the editor.", "bootenberg" ) }
                                checked={!!dismissible}
                                onChange={updatedismissible}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( "Fade", "bootenberg" ) }
                                checked={!!fade}
                                onChange={updateFade}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div class={alertClasses} role="alert">
                    <InnerBlocks />
                    { dismissible && (
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    )}
                </div>
            </Fragment>
        );
    },
    save({ attributes }) {
        const { type, dismissible, fade } = attributes;

        const alertClasses = classNames(
            'alert',
            'alert-' + type,
            {
                'alert-dismissible': dismissible,
                'fade': fade,
                'show': fade
            }
        );

        return (
            <div class={alertClasses} role="alert">
                <InnerBlocks.Content />
                { dismissible && (
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                ) }
            </div>
        );
    },
} );