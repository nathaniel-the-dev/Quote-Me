// @ts-ignore
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { useEffect, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

import EditorDisplay from './EditorDisplay';
import EditorControls from './EditorControls';

const ImageEditor = ({ data, show, onClose }: any) => {
	const canvas = useRef<fabric.Canvas>(null);
	const quoteText = `"${data.quote?.text || 'Hello World'}"\n\n - ${data.quote?.author?.name || 'Anonymous'}`;

	const [selectedImage, setSelectedImage] = useState<HTMLImageElement | undefined>(undefined);
	const [textOptions, setTextOptions] = useState({
		fill: 'black',
		fontSize: 24,
		fontWeight: 'normal',
		fontFamily: 'Inter',
		textAlign: 'center',
		lineHeight: 1.2,
	});

	function onUpdate({ field, data }: any) {
		if (field === 'image') {
			setSelectedImage(data);
		}

		if (field === 'text') {
			setTextOptions((prev) => ({ ...prev, ...data }));
		}
	}

	function onSave(e: any) {
		e.preventDefault();

		const url = canvas.current?.toDataURL({ format: 'png', quality: 1 });
		if (!url) return;

		const link = document.createElement('a');
		link.href = url;
		link.download = 'quote.png';
		link.click();
		link.remove();
	}

	function handleModalClick(e: any) {
		e.stopPropagation();
		if (e.target.classList.contains('modal')) {
			onClose();
		}
	}

	useEffect(() => {
		if (!selectedImage) return;

		const dominantColor = new ColorThief().getColor(selectedImage);
		const luminance = chroma(dominantColor).luminance();
		onUpdate({ field: 'text', data: { fill: luminance > 0.33 ? 'black' : 'white' } });
	}, [selectedImage]);

	return (
		<dialog
			className="modal backdrop-blur-sm bg-black bg-opacity-50"
			open={show}
			onClose={onClose}
			onClick={handleModalClick}
		>
			<div className="modal-box h-[80vh] max-w-[90vw]">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost right-2 top-2 absolute">
						<HiXMark />
					</button>
				</form>

				<div className="grid h-full grid-cols-3 gap-4">
					<EditorDisplay
						canvasRef={canvas}
						selectedImage={selectedImage}
						quoteText={quoteText}
						textOptions={textOptions}
					/>
					<EditorControls
						selectedImage={selectedImage}
						textOptions={textOptions}
						onUpdate={onUpdate}
						onSave={onSave}
						onClose={onClose}
					/>
				</div>
			</div>
		</dialog>
	);
};
export default ImageEditor;
