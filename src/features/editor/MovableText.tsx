import { TextConfig } from 'konva/lib/shapes/Text';
import { useState, useRef, useEffect } from 'react';
import { Group, Rect, Text, Transformer } from 'react-konva';

type Props = {
	text: string;
	options: TextConfig;
	textRef: any;
	canvasSize: any;
	onUpdate: (options: any) => void;
};

const MovableText = ({ text, options, textRef, canvasSize, onUpdate }: Props) => {
	const [textSelected, setTextSelected] = useState(false);
	const trRef = useRef<any>(null);

	const textProperties = useRef({
		x: canvasSize.width / 2 - (Number(options.width) + Number(options.padding) || 0) / 2,
		y: canvasSize.height / 2 - (Number(options.height) + Number(options.padding) || 0) / 2,

		minWidth: 20,
	});

	function onTextSelected() {
		setTextSelected((prev) => !prev);
	}

	function onTextDragEnd(e: any) {
		onUpdate((prev: any) => ({
			...prev,
			x: e.target.x(),
			y: e.target.y(),
		}));
	}

	function onDragMove(e: any) {
		// Set drag bounds
		const dragBounds = {
			top: 0,
			right: canvasSize.width - textRef.current.width(),
			bottom: canvasSize.height - textRef.current.width(),
			left: 0,
		};

		trRef.current.x(Math.max(dragBounds.left, Math.min(dragBounds.right, e.target.x())));
	}

	function onTextTransformEnd() {
		// transformer is changing scale of the node
		// and NOT its width or height
		// but in the store we have only width and height
		// to match the data better we will reset scale on transform end
		const node = textRef.current;
		const scaleX = node.scaleX();
		const scaleY = node.scaleY();

		// we will reset it back
		node.scaleX(1);
		node.scaleY(1);
		onUpdate((prev: any) => ({
			...prev,
			x: node.x(),
			y: node.y(),
			// set minimal value
			width: Math.max(node.width() * scaleX, textProperties.current.minWidth),
			height: Math.max(node.height() * scaleY),
		}));
	}

	useEffect(() => {
		if (textSelected) {
			trRef.current?.nodes([textRef.current]);
			trRef.current?.getLayer()?.batchDraw();
		}
	}, [textSelected]);
	return (
		<>
			<Group>
				{textRef.current && (
					<Rect
						x={textRef.current.x()}
						y={textRef.current.y()}
						width={textRef.current.width()}
						height={textRef.current.height()}
						fill="white"
						stroke="white"
						strokeWidth={20}
						opacity={0.5}
					/>
				)}
				<Text
					id="quote-text"
					text={text}
					{...options}
					ref={textRef}
					x={textProperties.current.x}
					y={textProperties.current.y}
					onClick={onTextSelected}
					onTap={onTextSelected}
					onDragMove={onDragMove}
					onDragEnd={onTextDragEnd}
					onTransformEnd={onTextTransformEnd}
					draggable
				/>
			</Group>
			<Transformer
				ref={trRef}
				flipEnabled={false}
				rotateEnabled={false}
				boundBoxFunc={(oldBox, newBox) => {
					// set minimal width
					return Math.abs(newBox.width) < textProperties.current.minWidth ? oldBox : newBox;
				}}
			/>
		</>
	);
};
export default MovableText;
