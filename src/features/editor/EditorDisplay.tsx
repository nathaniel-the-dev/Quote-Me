import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useEffect, useState } from 'react';

const EditorDisplay = ({ selectedImage, quoteText, options, modalBox }: any) => {
	const textMaxWidth = (modalBox.current?.clientWidth || 0) * 0.75;

	const { editor, onReady } = useFabricJSEditor();

	useEffect(() => {
		editor?.canvas.setDimensions({ width: modalBox.current?.clientWidth, height: modalBox.current?.clientHeight });

		var rect = new fabric.Rect({
			left: 100,
			top: 100,
			fill: 'red',
			width: 20,
			height: 20,
		});

		// "add" rectangle onto canvas
		editor?.canvas.add(rect);
	}, [fabric, editor, modalBox]);

	return (
		<div id="editor" className="col-span-2" ref={modalBox}>
			<FabricJSCanvas onReady={onReady} />
		</div>
	);
};
export default EditorDisplay;
