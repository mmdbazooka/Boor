'use client';
import { useParams } from 'next/navigation';
export default function ErrorPage({ reset }: { reset: () => void }) {
  const { locale } = useParams();
  const fa = locale === 'fa';
  return (
    <div className="empty-state">
      <h1>{fa ? 'چیزی درست پیش نرفت.' : 'Something went off-script.'}</h1>
      <p>{fa ? 'دوباره امتحان کن.' : 'Let’s give it another try.'}</p>
      <button className="button button-dark" onClick={reset}>
        {fa ? 'تلاش دوباره' : 'Try again'}
      </button>
    </div>
  );
}
