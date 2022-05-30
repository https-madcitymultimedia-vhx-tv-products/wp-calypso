import { TERM_ANNUALLY } from '@automattic/calypso-products';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import JetpackProductCard from 'calypso/components/jetpack/card/jetpack-product-card';
import isJetpackCloud from 'calypso/lib/jetpack/is-jetpack-cloud';
import { ITEM_TYPE_PRODUCT } from 'calypso/my-sites/plans/jetpack-plans/constants';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import type { SelectorProduct } from 'calypso/my-sites/plans/jetpack-plans/types';

const SOCIAL_FREE_URL = isJetpackCloud()
	? '/pricing/jetpack-social/welcome'
	: 'https://wordpress.org/plugins/jetpack-social/'; // This may need to be updated (page doesn't exist yet).

const useSocialFreeItem = (): SelectorProduct => {
	const translate = useTranslate();

	return useMemo(
		() => ( {
			productSlug: 'jetpack-social-free',
			isFree: true,
			displayName: translate( 'Social' ),
			features: {
				items: [
					{ slug: 'not used', text: translate( 'Auto-publish on popular social media platforms' ) },
					{ slug: 'not used', text: translate( 'Schedule your posts' ) },
					{ slug: 'not used', text: translate( 'Preview content before sharing' ) },
					{
						slug: 'not used',
						text: translate( 'Central dashboard to manage all social platform connections' ),
					},
				],
			},
			type: ITEM_TYPE_PRODUCT, // not used
			term: TERM_ANNUALLY, // not used
			iconSlug: 'not used',
			shortName: 'not used',
			tagline: 'not used',
			description: 'not used',
		} ),
		[ translate ]
	);
};

export type CardWithPriceProps = {
	siteId: number | null;
};

const CardWithPrice: React.FC< CardWithPriceProps > = ( { siteId } ) => {
	const translate = useTranslate();
	const socialFreeProduct = useSocialFreeItem();

	const dispatch = useDispatch();
	const onButtonClick = useCallback( () => {
		dispatch(
			recordTracksEvent( 'calypso_product_jpsocialfree_click', {
				site_id: siteId ?? undefined,
			} )
		);
	}, [ dispatch, siteId ] );

	return (
		<JetpackProductCard
			className={ classNames( 'jetpack-social-free-card', {
				'is-jetpack-cloud': isJetpackCloud(),
			} ) }
			hideSavingLabel
			showNewLabel
			showAbovePriceText
			buttonPrimary
			item={ socialFreeProduct }
			headerLevel={ 3 }
			description={ translate(
				'Easily share your website content on your social media channels.'
			) }
			buttonLabel={ translate( 'Get Social' ) }
			buttonURL={ SOCIAL_FREE_URL }
			onButtonClick={ onButtonClick }
			collapseFeaturesOnMobile
		/>
	);
};

export default CardWithPrice;
