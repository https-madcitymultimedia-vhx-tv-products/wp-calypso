import { useLaunchpad } from '@automattic/data-stores';
import Checklist from './checklist';

export interface LaunchpadProps {
	siteSlug: string;
	checklistSlug?: string | 0 | null | undefined;
	makeLastTaskPrimaryAction?: boolean;
}

const Launchpad = ( { siteSlug, checklistSlug, makeLastTaskPrimaryAction }: LaunchpadProps ) => {
	const { isFetchedAfterMount, data } = useLaunchpad( siteSlug || '', checklistSlug );

	const tasks = data.checklist || [];

	return (
		<div className="launchpad__checklist-wrapper">
			{ isFetchedAfterMount ? (
				<Checklist tasks={ tasks } makeLastTaskPrimaryAction={ makeLastTaskPrimaryAction } />
			) : (
				<Checklist.Placeholder />
			) }
		</div>
	);
};

export default Launchpad;
