import chroma from 'chroma-js';
import { animated, useSpring } from '@react-spring/web';
import { getRandomValue } from '../../utils/helpers';

type Props = {
	name: string;
	onClick: (slug: string) => void;

	position?: number;
};

const TagItem = (props: Props) => {
	const spring = useSpring({
		from: { opacity: 0, scale: 0 },
		to: { opacity: 1, scale: 1 },
		delay: (props.position || 0) * 100,
	});

	const bgColor = chroma.random();
	const textColor = bgColor.luminance() > 0.5 ? 'black' : 'white';

	return (
		<animated.li style={spring}>
			<button
				className={`badge py-0.5`}
				style={{ backgroundColor: bgColor.hex(), color: textColor }}
				onClick={() => props.onClick(props.name)}
			>
				{'#' + props.name}
			</button>
		</animated.li>
	);
};
export default TagItem;
