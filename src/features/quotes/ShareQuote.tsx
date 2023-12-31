import { useState } from 'react';
import { HiCheck, HiDocumentDuplicate, HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import {
	EmailShareButton,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
	LinkedinIcon,
	EmailIcon,
} from 'react-share';

import { useQuote } from '../../providers/QuoteProvider';
import { copyToClipBoard } from '../../utils/helpers';
import DownloadQuote from './DownloadQuote';
import CopyQuoteLink from './CopyQuoteLink';

const ShareQuote = () => {
	const { quote, openShareModal, toggleShareModal } = useQuote();

	const shareUrl = window.location.href + '?id=' + quote!._id;

	if (!quote) return null;
	return createPortal(
		<dialog className="modal" open={openShareModal} onClose={toggleShareModal}>
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
						<DownloadQuote quote={quote} />

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
	);
};
export default ShareQuote;
