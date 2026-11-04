import type { Mood } from '@/lib/projects';
export function Artwork({
  mood = 'minimal',
  name,
  className = '',
}: {
  mood?: Mood;
  name?: string;
  className?: string;
}) {
  return (
    <div className={`artwork art-${mood} ${className}`} aria-hidden="true">
      <div className="art-grain" />
      {mood === 'minimal' ? (
        <>
          <div className="sculpture sculpture-one" />
          <div className="sculpture sculpture-two" />
          <div className="sculpture-shadow" />
        </>
      ) : mood === 'bold' ? (
        <>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="art-star">✳</div>
        </>
      ) : (
        <>
          <div className="sun-disc" />
          <div className="bottle">
            <div className="bottle-cap" />
            <span>sol.</span>
            <small>
              DAILY RITUAL
              <br />
              01 — BOTANICAL
            </small>
          </div>
          <div className="bottle bottle-back" />
        </>
      )}
      {name && (
        <div className="art-word">
          {name}
          <span>®</span>
        </div>
      )}
      <div className="art-corner">BOOR STUDIO — 001</div>
    </div>
  );
}
