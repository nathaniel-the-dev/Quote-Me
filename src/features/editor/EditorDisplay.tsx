import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useEffect, useRef } from 'react';

const EditorDisplay = ({ canvasRef, selectedImage, quoteText, textOptions }: any) => {
	const { editor, onReady } = useFabricJSEditor();
	const isReady = useRef(false);

	function onCanvasReady(canvas: fabric.Canvas) {
		isReady.current = true;
		canvasRef.current = canvas;
		onReady(canvas);
	}

	useEffect(() => {
		if (!editor || !isReady.current) return;

		const existingText = editor.canvas.getObjects('textbox')[0];
		if (existingText?.name === 'quote') {
			existingText.setOptions(textOptions);
			editor.canvas.requestRenderAll();
		} else {
			const text = new fabric.Textbox(quoteText, {
				name: 'quote',
				width: editor.canvas.width! * 0.75,
				originX: 'center',
				originY: 'center',
				lockRotation: true,
				editable: false,

				...editor.canvas.getCenter(),
				...textOptions,
			});

			editor.canvas.add(text);
		}
	}, [textOptions]);

	useEffect(() => {
		if (!editor || !isReady.current) return;

		if (selectedImage) {
			const bgImage = new fabric.Image(selectedImage, {
				name: 'bgImage',
				left: 0,
				top: 0,
				width: editor.canvas.width,
				height: editor.canvas.height,
			});
			editor.canvas.setBackgroundImage(bgImage, () => editor.canvas.renderAll());
		} else {
			editor.canvas.setBackgroundColor('white', () => editor.canvas.renderAll());
		}
	}, [selectedImage]);

	return (
		<div id="editor" className="col-span-2">
			<FabricJSCanvas onReady={onCanvasReady} className="size-full" />
		</div>
	);
};
export default EditorDisplay;
