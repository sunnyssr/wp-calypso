/**
 * Module dependencies
 */
const util = require( './util' );
const assert = require( 'assert' );

/**
 * me
 */
describe( 'wpcom.me', function () {
	// Global instances
	const wpcom = util.wpcom();
	const me = wpcom.me();

	describe( 'wpcom.me.billingHistory', function () {
		it( 'should require billing history', function () {
			return new Promise( ( done ) => {
				me.billingHistory( function ( err, data ) {
					if ( err ) throw err;

					assert.ok( data );
					assert.equal( 'object', typeof data.billing_history );
					assert.ok( data.billing_history instanceof Array );

					assert.equal( 'object', typeof data.upcoming_charges );
					assert.ok( data.upcoming_charges instanceof Array );

					done();
				} );
			} );
		} );
	} );

	describe( 'wpcom.me.get', function () {
		it( 'should require user information object', () => {
			return new Promise( ( done ) => {
				me.get()
					.then( ( data ) => {
						// testing object
						assert.ok( data );
						assert.equal( 'object', typeof data );

						// testing user data
						assert.equal( 'number', typeof data.ID );

						done();
					} )
					.catch( done );
			} );
		} );

		it( 'should require user passing query parameter', () => {
			return new Promise( ( done ) => {
				me.get( { context: 'info' } )
					.then( ( data ) => {
						// testing object
						assert.ok( me );
						assert.equal( 'object', typeof data );

						// testing user data
						assert.equal( 'number', typeof data.ID );

						done();
					} )
					.catch( done );
			} );
		} );
	} );

	describe( 'wpcom.me.keyringConnections', function () {
		it( "should get current user' keyring connections", () => {
			return new Promise( ( done ) => {
				me.keyringConnections()
					.then( ( data ) => {
						assert.ok( data );
						assert.ok( data.connections instanceof Array );
						done();
					} )
					.catch( done );
			} );
		} );
	} );

	describe( 'wpcom.me.likes', function () {
		it( 'should require user likes', () => {
			return new Promise( ( done ) => {
				me.likes()
					.then( ( data ) => {
						assert.equal( 'number', typeof data.found );
						assert.equal( 'object', typeof data.likes );
						assert.ok( data.likes instanceof Array );

						done();
					} )
					.catch( done );
			} );
		} );
	} );

	describe( 'wpcom.me.postsList', function () {
		it( 'should get posts list that current user belongs to', function () {
			return new Promise( ( done ) => {
				me.postsList()
					.then( ( data ) => {
						assert.equal( 'number', typeof data.found );
						assert.ok( data.posts instanceof Array );
						done();
					} )
					.catch( done );
			} );
		} );
	} );

	describe( 'wpcom.me.publicizeConnections', function () {
		it( "should get current user' publicize connections", () => {
			return new Promise( ( done ) => {
				me.publicizeConnections()
					.then( ( data ) => {
						assert.ok( data );
						assert.ok( data.connections instanceof Array );
						done();
					} )
					.catch( done );
			} );
		} );
	} );

	describe( 'wpcom.me.sites', function () {
		// eslint-disable-next-line jest/expect-expect
		it( 'should require user sites object', () => {
			return new Promise( ( done ) => {
				me.sites()
					.then( () => done() )
					.catch( done );
			} );
		} );
	} );
} );
