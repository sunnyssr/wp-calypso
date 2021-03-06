/**
 * External dependencies
 */

import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import * as driverHelper from '../driver-helper';
import AsyncBaseContainer from '../async-base-container';
import GutenbergEditorComponent from '../gutenberg/gutenberg-editor-component';

export default class SiteEditorComponent extends AsyncBaseContainer {
	constructor( driver, url, editorType = 'iframe' ) {
		super( driver, By.css( '.edit-site-header' ), url );
		this.editorType = editorType;

		this.editoriFrameLocator = By.css( '.calypsoify.is-iframe iframe' );
		this.editorCanvasiFrameLocator = By.css( 'iframe[name="editor-canvas"]' );
	}

	static async Expect( driver, editorType ) {
		const page = new this( driver, null, editorType );
		await page._expectInit();
		return page;
	}

	async _preInit() {
		if ( this.editorType !== 'iframe' ) {
			return;
		}
		await this.driver.switchTo().defaultContent();
		await driverHelper.waitUntilAbleToSwitchToFrame( this.driver, this.editoriFrameLocator );
		await this.driver.sleep( 2000 );
	}

	async _postInit() {
		await this.driver.sleep( 2000 );
	}

	async runInCanvas( fn ) {
		await driverHelper.waitUntilAbleToSwitchToFrame( this.driver, this.editorCanvasiFrameLocator );
		const result = await fn();
		await this.driver.switchTo().parentFrame();
		return result;
	}

	async waitForTemplatePartsToLoad() {
		await this.runInCanvas( async () => {
			await driverHelper.waitUntilElementNotLocated(
				this.driver,
				By.css( '.wp-block-template-part .components-spinner' )
			);
		} );
	}

	async waitForTemplateToLoad() {
		await this.runInCanvas( () =>
			driverHelper.waitUntilElementLocatedAndVisible(
				this.driver,
				By.css( '.edit-site-block-editor__block-list' )
			)
		);
	}

	async openBlockInserterAndSearch( searchTerm ) {
		await this.runInCanvas( async () => {
			await driverHelper.scrollIntoView(
				this.driver,
				By.css( '.block-editor-writing-flow' ),
				'start'
			);
		} );
		const inserterToggleLocator = By.css(
			'.edit-site-header .edit-site-header-toolbar__inserter-toggle'
		);
		const inserterMenuLocator = By.css( '.block-editor-inserter__menu' );
		const inserterSearchInputLocator = By.css( 'input.block-editor-inserter__search-input' );

		if ( await driverHelper.isElementNotLocated( this.driver, inserterMenuLocator ) ) {
			await driverHelper.clickWhenClickable( this.driver, inserterToggleLocator );
			// "Click" twice - the first click seems to trigger a tooltip, the second opens the menu
			// See https://github.com/Automattic/wp-calypso/issues/43179
			if ( await driverHelper.isElementNotLocated( this.driver, inserterMenuLocator ) ) {
				await driverHelper.clickWhenClickable( this.driver, inserterToggleLocator );
			}

			await driverHelper.waitUntilElementLocatedAndVisible( this.driver, inserterMenuLocator );
		}
		await driverHelper.setWhenSettable( this.driver, inserterSearchInputLocator, searchTerm );
	}

	async addBlock( title ) {
		const {
			ariaLabel,
			prefix,
			blockClass,
			initsWithChildFocus,
		} = new GutenbergEditorComponent().getBlockLocatorSettings( title );

		const inserterBlockItemLocator = By.css(
			`.edit-site-editor__inserter-panel .block-editor-block-types-list button.editor-block-list-item-${ prefix }${ blockClass }`
		);

		const insertedBlockLocator = By.css(
			`.block-editor-block-list__block.${
				initsWithChildFocus ? 'has-child-selected' : 'is-selected'
			}[aria-label*='${ ariaLabel }']`
		);

		await this.openBlockInserterAndSearch( title );
		await driverHelper.waitUntilElementLocatedAndVisible( this.driver, inserterBlockItemLocator );
		// The normal click is needed to avoid hovering the element, which seems
		// to cause the element to become stale.
		await driverHelper.clickWhenClickable( this.driver, inserterBlockItemLocator );

		return await this.runInCanvas( async () => {
			await driverHelper.waitUntilElementLocatedAndVisible( this.driver, insertedBlockLocator );
			return await this.driver.findElement( insertedBlockLocator ).getAttribute( 'id' );
		} );
	}
}
