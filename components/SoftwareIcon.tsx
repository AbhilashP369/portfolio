export default function SoftwareIcon({ name, className = "w-3.5 h-3.5" }: { name: string, className?: string }) {
  const n = name.toLowerCase();

  const AdobeIcon = ({ letters, bg, fg }: { letters: string, bg: string, fg: string }) => (
    <svg className={className} viewBox="0 0 24 24">
      <rect x="0" y="0" width="24" height="24" rx="4" fill={bg} />
      <text x="12" y="16.5" fontSize="13" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill={fg} stroke="none">
        {letters}
      </text>
    </svg>
  );

  if (n.includes("premiere")) return <AdobeIcon letters="Pr" bg="#00005C" fg="#EA77FF" />;
  if (n.includes("after effects")) return <AdobeIcon letters="Ae" bg="#00005C" fg="#9999FF" />;
  if (n.includes("photoshop")) return <AdobeIcon letters="Ps" bg="#001E36" fg="#31A8FF" />;
  if (n.includes("illustrator")) return <AdobeIcon letters="Ai" bg="#330000" fg="#FF9A00" />;
  if (n.includes("lightroom")) return <AdobeIcon letters="Lr" bg="#001E36" fg="#31A8FF" />;

  if (n.includes("davinci")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#111111" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="#FF3366" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#33CCFF" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#FFCC00" />
      </svg>
    );
  }

  if (n.includes("capcut")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="#000000" />
        <polygon points="6,6 18,12 6,18" fill="#FFFFFF" />
        <polygon points="5,5 17,11 5,17" fill="#FFFFFF" opacity="0.3" />
      </svg>
    );
  }

  if (n.includes("procreate") || n.includes("painting") || n.includes("canvas")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="#1A1A1A" />
        <path d="M12 18l6-6 2 2-6 6-2-2z" fill="#FF3366"/>
        <path d="M17 13l-1.5-6L3 3l4 13L12 17l5-4z" fill="#33CCFF" opacity="0.8"/>
        <path d="M3 3l6 6" stroke="#FFCC00" strokeWidth="2"/>
        <circle cx="10.5" cy="10.5" r="1.5" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Default generic tech/software icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
