import { animated, useSpring } from '@react-spring/web';
import { getRandomValue } from '../../utils/helpers';

type Props = {
	name: string;
	onClick: () => void;

	position?: number;
};

const TagItem = (props: Props) => {
	const spring = useSpring({
		from: { opacity: 0, scale: 0 },
		to: { opacity: 1, scale: 1 },
		delay: (props.position || 0) * 500,
	});

	const colors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];
	const getRandomColor = () => getRandomValue(colors);

	return (
		<animated.li style={spring}>
			<button className={`badge badge-primary badge-${getRandomColor()}`} onClick={props.onClick}>
				{props.name}
			</button>
		</animated.li>
	);
};
export default TagItem;
