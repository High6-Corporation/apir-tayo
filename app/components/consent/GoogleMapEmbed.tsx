import { ConsentGate } from './ConsentGate'

export function GoogleMapEmbed({ src }: { src: string }) {
  return (
    <ConsentGate
      category="embedded"
      fallbackTitle="Google Map blocked"
      fallbackDescription="Please allow embedded content to view this map."
    >
      <iframe
        src={src}
        className="h-[400px] w-full rounded-md"
        loading="lazy"
      />
    </ConsentGate>
  )
}
