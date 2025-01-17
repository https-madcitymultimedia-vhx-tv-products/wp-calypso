import { USER_PROFILE_LINKS_ADD } from 'calypso/state/action-types';
import { registerHandlers } from 'calypso/state/data-layer/handler-registry';
import { http } from 'calypso/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'calypso/state/data-layer/wpcom-http/utils';
import {
	addUserProfileLinksDuplicate,
	addUserProfileLinksError,
	addUserProfileLinksMalformed,
	addUserProfileLinksSuccess,
	receiveUserProfileLinks,
} from 'calypso/state/profile-links/actions';

import 'calypso/state/profile-links/init';

/**
 * Dispatches a request to add profile links for the current user
 *
 * @param   {Object} action Redux action
 * @returns {Object} Dispatched http action
 */
export const addUserProfileLinks = ( action ) =>
	http(
		{
			apiVersion: '1.2',
			method: 'POST',
			path: '/me/settings/profile-links/new',
			body: {
				links: action.profileLinks,
			},
		},
		action
	);

/**
 * Dispatches a user profile links add success and receive actions and when the request succeeded.
 * This will also cover some specific error cases:
 * - duplicate links
 * - malformed links
 *
 * @param   {Object} action Redux action
 * @param   {Array}  data   Response from the endpoint
 * @returns {Object} Dispatched user profile links add action
 */
export const handleAddSuccess = ( action, data ) => {
	const actions = [ addUserProfileLinksSuccess( action.profileLinks ) ];

	if ( data.duplicate ) {
		actions.push( addUserProfileLinksDuplicate( data.duplicate ) );
	} else if ( data.malformed ) {
		actions.push( addUserProfileLinksMalformed( data.malformed ) );
	} else {
		actions.push( receiveUserProfileLinks( data.profile_links ) );
	}

	return actions;
};

/**
 * Dispatches a user profile links add error action when the request failed.
 *
 * @param   {Object} action              Redux action
 * @param   {Object} action.profileLinks Profile links
 * @param   {Object} error               Error returned
 * @returns {Object} Dispatched user profile links add error action
 */
export const handleAddError = ( { profileLinks }, error ) =>
	addUserProfileLinksError( profileLinks, error );

registerHandlers( 'state/data-layer/wpcom/me/settings/profile-links/new/index.js', {
	[ USER_PROFILE_LINKS_ADD ]: [
		dispatchRequest( {
			fetch: addUserProfileLinks,
			onSuccess: handleAddSuccess,
			onError: handleAddError,
		} ),
	],
} );
