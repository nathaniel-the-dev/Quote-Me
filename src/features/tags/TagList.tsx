import { memo } from 'react';
import Tag from '../../types/tag';
import TagItem from './TagItem';

const TagList = ({ tags, onClick }: { tags: Tag[]; onClick: (slug: string) => void }) => {
	return (
		<ul className="w-fit flex items-center gap-4 mx-auto">
			{tags.map((tag, i) => (
				<TagItem key={tag._id + i} position={i} name={tag.slug} onClick={() => onClick(tag.slug)} />
			))}
		</ul>
	);
};
export default memo(TagList);
