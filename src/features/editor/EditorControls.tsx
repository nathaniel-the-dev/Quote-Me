import { createApi } from 'unsplash-js';
import { HiArrowUpTray, HiOutlineFolderArrowDown } from 'react-icons/hi2';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

import { debounce, loadImage } from '@/utils/helpers';
import Select from '@/ui/Select';
import Input from '@/ui/Input';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const EditorControls = ({ selectedImage, textOptions, onUpdate, onSave, onClose }: any) => {
	const carouselContainer = useRef<HTMLDivElement>(null);
	const carouselWidth = carouselContainer.current?.offsetWidth || 0;

	const [activePanel, setActivePanel] = useState(0);
	const [bgImages, setBgImages] = useState<any[]>([]);

	function onInputChange(field: string, delay = 0) {
		return debounce((e: any) => onUpdate({ field: 'text', data: { [field]: e.target.value } }), delay);
	}

	function onFileChange(e: any) {
		if (!e.target.files || e.target.files.length === 0) {
			onUpdate({ field: 'image', data: bgImages[0] });
			return;
		}
		const reader = new FileReader();
		reader.onload = async (event: any) => {
			const result = await loadImage(event.target.result);
			onUpdate({ field: 'image', data: result });
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	useEffect(() => {
		(async function () {
			// Get background images from unsplash
			const random = await unsplash.photos.getRandom({
				query: `inspirational pattern background`,
				orientation: 'squarish',
				count: 10,
			});
			if (random.response) {
				const response = random.response as any[];
				const results = await Promise.all(response.map((image) => loadImage(image.urls.regular)));

				setBgImages(results);
				onUpdate({ field: 'image', data: results[0] });
			}
		})();
	}, []);

	return (
		<div id="controls" className="grow flex flex-col overflow-auto">
			<h2 className="mb-6 text-2xl font-semibold text-center">Customize your quote</h2>

			<div className="grow">
				{/* Image controls */}
				<div className="collapse collapse-arrow mb-4 border border-gray-300">
					<input
						type="radio"
						name="controls"
						checked={activePanel === 0}
						onChange={() => setActivePanel(0)}
					/>
					<div className="collapse-title">
						<h3 className="text-lg font-medium">Customize Image</h3>
					</div>
					<div className="collapse-content">
						<section ref={carouselContainer}>
							<p className="">Select the background you want for your quote.</p>

							{/* Add image drag and drop features to this element */}
							<Swiper
								className="my-3"
								modules={[Navigation]}
								style={{ width: carouselWidth }}
								slidesPerView={2.5}
								spaceBetween={10}
								navigation={{
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev',
								}}
							>
								{bgImages.map((image, i) => (
									<SwiperSlide key={image.src}>
										<a
											className={
												'block cursor-pointer rounded overflow-hidden' +
												(bgImages.indexOf(selectedImage) === i
													? ' border-2 border-primary'
													: '')
											}
											onClick={() => onUpdate({ field: 'image', data: image })}
										>
											<img
												src={image.src}
												alt="Background Image"
												className="object-cover h-full"
											/>
										</a>
									</SwiperSlide>
								))}

								<button className="swiper-button-next btn btn-primary after:!text-sm after:!text-white"></button>
								<button className="swiper-button-prev btn btn-primary after:!text-sm after:!text-white"></button>
							</Swiper>

							<div className="divider">OR</div>

							<div>
								<label htmlFor="customImage" className="btn btn-primary btn-block shadow">
									<HiArrowUpTray /> Choose Image
								</label>
								<input
									type="file"
									name="customImage"
									id="customImage"
									accept="image/*"
									onChange={onFileChange}
									hidden
								/>
							</div>
						</section>
					</div>
				</div>

				<div className="collapse collapse-arrow border border-gray-300">
					<input
						type="radio"
						name="controls"
						checked={activePanel === 1}
						onChange={() => setActivePanel(1)}
					/>
					<div className="collapse-title">
						<h3 className="text-lg font-medium">Customize Text</h3>
					</div>
					<div className="collapse-content">
						{/* Text controls */}
						<section className="grow">
							<div className="flex flex-col h-full gap-3">
								{/* Font Family */}
								<Select
									label="Font Family"
									options={[{ value: 'Inter', label: 'Inter' }]}
									value={textOptions.fontFamily}
									onChange={onInputChange('fontFamily')}
								/>

								{/* Text Color */}
								<Input
									label="Text Color"
									type="color"
									value={textOptions.fill}
									onChange={onInputChange('fill', 300)}
								/>

								{/* Font Size */}
								<Input
									label="Font Size"
									type="number"
									value={textOptions.fontSize}
									onChange={onInputChange('fontSize')}
								/>

								{/* Text Align */}
								<Select
									label="Text Align"
									options={[
										{ value: 'left', label: 'Left' },
										{ value: 'center', label: 'Center' },
										{ value: 'right', label: 'Right' },
										{ value: 'justify', label: 'Justify' },
									]}
									value={textOptions.textAlign}
									onChange={onInputChange('textAlign')}
								/>

								{/* Font Weight */}
								<Select
									label="Font Weight"
									options={[
										{ value: 'normal', label: 'Normal' },
										{ value: 'bold', label: 'Bold' },
									]}
									value={textOptions.fontWeight}
									onChange={onInputChange('fontWeight')}
								/>
							</div>
						</section>
					</div>
				</div>
			</div>

			<div className="modal-action sticky bottom-0 left-0 p-2 mt-12 bg-opacity-50 rounded">
				<form method="dialog">
					<button className="btn btn-primary mr-2" onClick={onSave}>
						<HiOutlineFolderArrowDown />
						Export
					</button>

					<button className="btn btn-ghost" onClick={onClose}>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
};
export default EditorControls;
