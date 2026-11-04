import Link from 'next/link';
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="34"
      height="38"
      viewBox="0 0 34 38"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 3h11v11h7a10 10 0 0 1 0 20H3V3Z" fill="currentColor" />
      <path d="M20 3h11v10H20z" fill="currentColor" />
      <circle cx="20" cy="24" r="4" fill="var(--logo-cutout, #f7f6f2)" />
    </svg>
  );
}
export function Logo({ href, light = false }: { href: string; light?: boolean }) {
  return (
    <Link href={href} aria-label="Boor" className={`logo ${light ? 'logo-light' : ''}`}>
      <Mark />
      <span>
        boor<span className="logo-dot">®</span>
      </span>
    </Link>
  );
}
