const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { PanelBody, PanelRow, SelectControl, ToggleControl } = wp.components;

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
    category: 'layout',
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
                    <PanelBody title="Alert Settings">
                        <PanelRow>
                            <SelectControl
                                label="Type"
                                value={type}
                                options={[
                                    { label: "Primary", value: "primary" },
                                    { label: "Secondary", value: "secondary" },
                                    { label: "Success", value: "success" },
                                    { label: "Danger", value: "danger" },
                                    { label: "Warning", value: "warning" },
                                    { label: "Info", value: "info" },
                                    { label: "Light", value: "light" },
                                    { label: "Dark", value: "dark" }
                                ]}
                                onChange={updateType}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Dismissible"
                                help="Note: The dismiss button is disabled in the editor."
                                checked={!!dismissible}
                                onChange={updatedismissible}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Fade"
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