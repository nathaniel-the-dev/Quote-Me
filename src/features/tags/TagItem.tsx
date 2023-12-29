import { animated, useSpring } from '@react-spring/web';
import { getRandomValue } from '../../utils/helpers';

type Props = {
	name: string;
	onClick: (slug: string) => void;

	position?: number;
};

const badgeColors = [
	'badge-primary',
	'badge-secondary',
	'badge-accent',
	'badge-info',
	'badge-success',
	'badge-warning',
	'badge-error',
];

const TagItem = (props: Props) => {
	const spring = useSpring({
		from: { opacity: 0, scale: 0 },
		to: { opacity: 1, scale: 1 },
		delay: (props.position || 0) * 100,
	});

	return (
		<animated.li style={spring}>
			<button className={`badge ${getRandomValue(badgeColors)}`} onClick={() => props.onClick(props.name)}>
				{'#' + props.name}
			</button>
		</animated.li>
	);
};
export default TagItem;
