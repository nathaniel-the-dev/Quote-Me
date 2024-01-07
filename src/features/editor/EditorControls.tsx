import { createApi } from 'unsplash-js';
import { HiArrowUpTray, HiFolderArrowDown } from 'react-icons/hi2';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

import { loadImage } from '../../utils/helpers';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const EditorControls = ({ selectedImage, textOptions, onUpdate, onSave, onClose }: any) => {
	const carouselContainer = useRef<HTMLDivElement>(null);
	const carouselWidth = carouselContainer.current?.offsetWidth || 0;

	const [activePanel, setActivePanel] = useState(0);
	const [bgImages, setBgImages] = useState<any[]>([]);

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
				query: `pattern,background`,
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
								<div className="form-control">
									<label className="label" htmlFor="fontFamily">
										Font Family
									</label>
									<select
										className="select select-sm select-bordered"
										name="fontFamily"
										id="fontFamily"
										defaultValue={textOptions.fontFamily}
										onChange={(e) =>
											onUpdate({ field: 'text', data: { fontFamily: e.target.value } })
										}
									>
										<option value="Inter">Inter</option>
									</select>
								</div>

								{/* Font Size */}
								<div className="form-control">
									<label className="label" htmlFor="fontSize">
										Font Size
									</label>
									<input
										className="input input-sm input-bordered"
										type="number"
										name="fontSize"
										id="fontSize"
										defaultValue={textOptions.fontSize}
										onChange={(e) =>
											onUpdate({ field: 'text', data: { fontSize: e.target.value } })
										}
									/>
								</div>

								{/* Text Align */}
								<div className="form-control">
									<label className="label" htmlFor="textAlign">
										Text Align
									</label>
									<select
										className="select select-sm select-bordered"
										name="textAlign"
										id="textAlign"
										defaultValue={textOptions.textAlign}
										onChange={(e) =>
											onUpdate({ field: 'text', data: { textAlign: e.target.value } })
										}
									>
										<option value="left">Left</option>
										<option value="center">Center</option>
										<option value="right">Right</option>
										<option value="justify">Justify</option>
									</select>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			<div className="modal-action bg-neutral-700 sticky bottom-0 left-0 p-2 mt-12 bg-opacity-50 rounded">
				<form method="dialog">
					<button className="btn btn-primary mr-2" onClick={onSave}>
						<HiFolderArrowDown />
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
