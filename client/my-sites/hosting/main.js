/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestAtomicSFTPDetails } from 'state/data-getters';
import { getSelectedSiteId } from 'state/ui/selectors';

const Hosting = ( { atomicSFTPDetails } ) => {
	return (
		<p>
			SFTP Username:{' '}
			{ atomicSFTPDetails && atomicSFTPDetails.data && (
				<span>{ atomicSFTPDetails.data.username }</span>
			) }
		</p>
	);
};

export default connect( state => {
	const atomicSFTPDetails = requestAtomicSFTPDetails( getSelectedSiteId( state ) );

	return {
		atomicSFTPDetails,
	};
} )( Hosting );
