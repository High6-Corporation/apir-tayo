import { ConsentGate } from './ConsentGate'

export function YouTubeEmbed({ src }: { src: string }) {
  return (
    <ConsentGate
      category="embedded"
      fallbackTitle="YouTube video blocked"
      fallbackDescription="Please allow embedded content to watch this video."
    >
      <iframe
        src={src}
        className="aspect-video w-full rounded-md"
        allowFullScreen
      />
    </ConsentGate>
  )
}
