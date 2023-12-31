import { useState } from 'react';
import { HiDocumentDuplicate, HiCheck } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { copyToClipBoard } from '../../utils/helpers';

const CopyQuoteLink = ({ shareUrl }: { shareUrl: string }) => {
	const [copied, setCopied] = useState(false);

	function copyLink() {
		copyToClipBoard(shareUrl);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}
	return (
		<Button
			className="btn-sm btn-ghost gap-1"
			icon={!copied ? <HiDocumentDuplicate /> : <HiCheck />}
			onClick={copyLink}
			disabled={copied}
		>
			{!copied ? 'Copy Link' : 'Copied!'}
		</Button>
	);
};
export default CopyQuoteLink;
