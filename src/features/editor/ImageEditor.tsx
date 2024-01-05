import { useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

import EditorDisplay from './EditorDisplay';
import EditorControls from './EditorControls';

const ImageEditor = ({ data, show, onClose }: any) => {
	const modalBox = useRef<HTMLDivElement>(null);

	const quoteText = `"${data.quote?.text || 'Hello World'}"\n\n - ${data.quote?.author?.name || 'Anonymous'}`;
	const [options, setOptions] = useState({
		// Text options
		fill: 'black',
		fontSize: 18,
		fontFamily: 'Inter',
		align: 'center',
		padding: 20,
		lineHeight: 1.2,
	});

	function onSave(e: any) {
		e.preventDefault();

		// const url = stageRef.current?.getStage().toDataURL();

		const link = document.createElement('a');
		// link.href = url;
		link.download = 'quote.png';
		link.click();
	}

	return (
		<dialog className="modal backdrop-blur-sm bg-black bg-opacity-50" open={show} onClose={onClose}>
			<div className="modal-box h-[80vh] max-w-[90vw]">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost right-2 top-2 absolute">
						<HiXMark />
					</button>
				</form>

				<div className="grid h-full grid-cols-3 gap-4">
					<EditorDisplay />
					<EditorControls />
				</div>
			</div>
		</dialog>
	);
};
export default ImageEditor;
