import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Videoplayer`.
 */
export type VideoplayerProps = SliceComponentProps<Content.VideoplayerSlice>;

/**
 * Component for "Videoplayer" Slices.
 */

function convertToEmbedUrl(youtubeUrl: string): string {
  // Regular expression to extract the video ID from the URL
  const videoIdMatch = youtubeUrl.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
  );

  // If video ID is found, construct the embed URL
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    // Handle the case where the URL is not a valid YouTube watch URL
    throw new Error("Invalid YouTube URL");
  }
}

const Videoplayer = ({ slice }: VideoplayerProps): JSX.Element => {
  const youtubeUrl = slice.primary.video.embed_url as string;
  let embedUrl = "";
  try {
    embedUrl = convertToEmbedUrl(youtubeUrl);
    console.log(embedUrl, "url"); // Output: https://www.youtube.com/embed/Q8Ypj4EzBy0
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col"
    >
      <div className="flex flex-col gap-4">
        <RichTextWithComponents richText={slice.primary.heading} />
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      {isFilled.embed(slice.primary.video) && (
        <iframe
          className="w-full h-[600px] object-contain"
          src={embedUrl}
          width="1600"
          height="600"
          title="UNBELIEVABLE 525 zercher deadlift"
          allowFullScreen
        ></iframe>
      )}
    </BoundedFull>
  );
};

export default Videoplayer;
