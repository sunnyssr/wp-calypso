/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary

import React, { useState } from 'react';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { Popover, SlotFillProvider, DropZoneProvider } from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';

/**
 * Internal dependencies
 */
import './style.scss';
import Sidebar from './components/sidebar';
import SettingsSidebar from './components/settings-sidebar';
import SettingsButton from './components/settings-button';

/* eslint-disable no-restricted-syntax */
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/format-library/build-style/style.css';
/* eslint-enable no-restricted-syntax */

export function Gutenboard() {
	const [ blocks, updateBlocks ] = useState( [] );
	const [ isSettingsSidebarActive, updateIsSettingsSidebarActive ] = useState( true );

	function handleToggleSettingsSidebar() {
		updateIsSettingsSidebarActive( ! isSettingsSidebarActive );
	}

	return (
		<>
			<div>
				<a href="/gutenboarding/onboard">Onboard!</a>
			</div>
			<div>
				<SlotFillProvider>
					<DropZoneProvider>
						<BlockEditorProvider
							value={ blocks }
							onInput={ updateBlocks }
							onChange={ updateBlocks }
						>
							<div className="editor-styles-wrapper">
								<BlockEditorKeyboardShortcuts />

								<SettingsButton
									onClick={ handleToggleSettingsSidebar }
									isToggled={ isSettingsSidebarActive }
								/>

								<SettingsSidebar isActive={ isSettingsSidebarActive } />
								<Sidebar.Slot />

								<WritingFlow>
									<ObserveTyping>
										<BlockList />
									</ObserveTyping>
								</WritingFlow>
							</div>
							<Popover.Slot />
						</BlockEditorProvider>
					</DropZoneProvider>
				</SlotFillProvider>
			</div>
		</>
	);
}

registerCoreBlocks();
