import { ConsentGate } from './ConsentGate'

export function ExternalFormEmbed({ src }: { src: string }) {
  return (
    <ConsentGate
      category="embedded"
      fallbackTitle="Form blocked"
      fallbackDescription="Please allow embedded content to view this external form."
    >
      <iframe src={src} className="min-h-[600px] w-full rounded-md" />
    </ConsentGate>
  )
}
