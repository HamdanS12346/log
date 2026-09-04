type TargetLogoProps = {
  className?: string;
};

export function TargetLogo({ className }: TargetLogoProps) {
  return (
    <span className={className} aria-hidden="true">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    </span>
  );
}
