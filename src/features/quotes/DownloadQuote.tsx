import { createApi } from 'unsplash-js';
import chroma from 'chroma-js';
import { HiArrowDownTray } from 'react-icons/hi2';
import Button from '../../ui/Button';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const DownloadQuote = ({ quote }: any) => {
	async function download() {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		let imgColor: string | undefined;

		const img = new Image(512, 512);
		img.onload = () => {
			if (ctx) {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);

				// Add text to image
				const color = chroma(imgColor!);
				const luminance = color.luminance();

				ctx.font = 'bold 24px sans-serif';
				ctx.fillStyle = luminance > 0.5 ? 'black' : 'white';
				ctx.textAlign = 'center';
				ctx.fillText(`"${quote!.text}"`, canvas.width / 2, canvas.height / 2);

				const link = document.createElement('a');
				link.download = 'quote.png';
				link.href = canvas.toDataURL();
				link.click();
			}
		};

		// Get background image from unsplash
		const image = await unsplash.photos.getRandom({
			query: `inspiration,background`,
			orientation: 'squarish',
		});
		if (image.response) {
			img.src = (image.response as any).urls.small;
			img.style.objectFit = 'cover';
			img.crossOrigin = 'anonymous';

			imgColor = (image.response as any).color;
		}
	}
	return (
		<Button className="btn-sm btn-ghost gap-1" icon={<HiArrowDownTray />} onClick={download}>
			Download
		</Button>
	);
};
export default DownloadQuote;
