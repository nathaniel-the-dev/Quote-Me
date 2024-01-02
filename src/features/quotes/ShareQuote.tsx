import { HiArrowDownTray, HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { EmailShareButton, EmailIcon } from 'react-share';

import { useQuote } from '../../providers/QuoteProvider';

import CopyQuoteLink from './CopyQuoteLink';
import { useState } from 'react';
import Button from '../../ui/Button';
import ImageEditor from '../editor/ImageEditor';

const ShareQuote = () => {
	const { quote, openShareModal, toggleShareModal } = useQuote();

	const shareUrl = window.location.href + '?id=' + quote!._id;

	// const [editorOpen, setEditorOpen] = useState(false);
	const [editorOpen, setEditorOpen] = useState(true);

	function toggleEditor() {
		setEditorOpen((prev) => !prev);
	}

	if (!quote) return null;
	return (
		<>
			{createPortal(
				<dialog
					className="modal backdrop-blur-sm bg-black bg-opacity-50"
					open={openShareModal}
					onClose={toggleShareModal}
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
									subject={`Here is an Inspirational Quote for You..."`}
									body={`"${quote.text}" - ${quote.author.name}\n`}
								>
									<EmailIcon size={'2em'} round />
								</EmailShareButton>
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
