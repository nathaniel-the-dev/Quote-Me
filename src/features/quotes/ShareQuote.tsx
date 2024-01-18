import { HiArrowDownTray, HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import {
	EmailShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	LinkedinIcon,
	LinkedinShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';

import { useQuote } from '../../providers/QuoteProvider';

import CopyQuoteLink from './CopyQuoteLink';
import { useState } from 'react';
import Button from '../../ui/Button';
import ImageEditor from '../editor/ImageEditor';

const ShareQuote = () => {
	let subject = `Here is an Inspirational Quote for You...`;
	const { quote, openShareModal, toggleShareModal } = useQuote();

	const shareUrl = window.location.href + '?id=' + quote!._id;

	const [editorOpen, setEditorOpen] = useState(false);

	function toggleEditor() {
		setEditorOpen((prev) => !prev);
	}

	function handleModalClick(e: any) {
		e.stopPropagation();
		if (e.target.classList.contains('modal')) {
			toggleShareModal();
		}
	}

	if (!quote) return null;
	return (
		<>
			{createPortal(
				<dialog
					className="modal backdrop-blur-sm backdrop:bg-black bg-black bg-opacity-50"
					open={openShareModal}
					onClose={toggleShareModal}
					onClick={handleModalClick}
				>
					<div className="modal-box">
						<div className="modal-action">
							<form method="dialog">
								<button className="btn btn-sm btn-circle btn-ghost right-2 top-2 absolute">
									<HiXMark />
								</button>
							</form>
						</div>

						<div className="space-y-4 text-center">
							<h2 className="text-2xl font-bold">Share This Quote!</h2>
							<p>Share this quote with your friends!</p>

							<div className="flex items-center justify-center gap-3">
								<CopyQuoteLink shareUrl={shareUrl} />

								<Button
									className="btn-sm btn-ghost gap-1"
									icon={<HiArrowDownTray />}
									onClick={toggleEditor}
								>
									Download
								</Button>
							</div>

							<div className="flex items-center justify-center gap-3">
								<EmailShareButton
									className="btn-sm"
									url={shareUrl}
									subject={subject}
									body={`"${quote.text}" - ${quote.author.name}\n`}
								>
									<EmailIcon size={'2em'} round />
								</EmailShareButton>

								<FacebookShareButton className="btn-sm" url={shareUrl} hashtag="#InspirationalQuotes">
									<FacebookIcon size={'2em'} round />
								</FacebookShareButton>
								<TwitterShareButton className="btn-sm" url={shareUrl}>
									<TwitterIcon size={'2em'} round />
								</TwitterShareButton>
								<WhatsappShareButton className="btn-sm" url={shareUrl}>
									<WhatsappIcon size={'2em'} round />
								</WhatsappShareButton>
								<LinkedinShareButton className="btn-sm" url={shareUrl}>
									<LinkedinIcon size={'2em'} round />
								</LinkedinShareButton>
							</div>
						</div>
					</div>
				</dialog>,
				document.getElementById('root')!
			)}

			{createPortal(<ImageEditor data={{ quote }} show={editorOpen} onClose={toggleEditor} />, document.body)}
		</>
	);
};
export default ShareQuote;
