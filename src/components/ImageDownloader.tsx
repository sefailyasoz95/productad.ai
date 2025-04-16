import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

type ImageDownloaderProps = {
	base64Image: string;
	fileName?: string;
	altText?: string;
	imageType?: string;
};

export default function ImageDownloader({
	base64Image,
	fileName = "downloaded-image",
	altText = "Downloadable image",
	imageType = "png",
}: ImageDownloaderProps) {
	const [isHovering, setIsHovering] = useState(false);

	// Make sure the base64 string is properly formatted for displaying
	const imageSource = base64Image.startsWith("data:") ? base64Image : `data:image/${imageType};base64,${base64Image}`;

	const handleDownload = () => {
		// Create an invisible anchor element
		const link = document.createElement("a");
		link.href = imageSource;
		link.download = `${fileName}.${imageType}`;
		document.body.appendChild(link);

		// Trigger the download
		link.click();

		// Clean up
		document.body.removeChild(link);
	};

	return (
		<Button className='flex-1 bg-brand-purple hover:bg-brand-purple/90' onClick={handleDownload}>
			<Download className='mr-2 h-4 w-4' />
			Download
		</Button>
	);
}
