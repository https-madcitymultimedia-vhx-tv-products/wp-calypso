import { useQuery } from 'react-query';
import wpcomRequest from 'wpcom-proxy-request';
import type { GlobalStylesObject } from '../types';

const useFontPairingVariations = ( siteId: number | string, stylesheet: string ) => {
	const { data } = useQuery< any, unknown, GlobalStylesObject[] >(
		[ 'global-styles-font-pairings', siteId, stylesheet ],
		async () =>
			wpcomRequest< GlobalStylesObject[] >( {
				path: `/sites/${ encodeURIComponent( siteId ) }/global-styles-variation/font-pairings`,
				method: 'GET',
				apiNamespace: 'wpcom/v2',
				query: new URLSearchParams( { stylesheet } ).toString(),
			} ),
		{
			refetchOnMount: 'always',
			staleTime: Infinity,
			enabled: !! ( siteId && stylesheet ),
		}
	);

	return data;
};

export default useFontPairingVariations;