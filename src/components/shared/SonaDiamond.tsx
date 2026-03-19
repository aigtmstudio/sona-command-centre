interface SonaDiamondProps {
  size?: number
  className?: string
}

export default function SonaDiamond({ size = 14, className }: SonaDiamondProps) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="-3 0 90 90"
        style={{ width: '100%', height: '100%', display: 'block', fill: 'currentColor' }}
      >
        <path d="M38.093 3.106C40.06 1.138 43.25 1.138 45.218 3.106L83.436 41.324C85.404 43.292 85.404 46.482 83.436 48.449L45.215 86.671C43.247 88.638 40.057 88.638 38.09 86.671L-0.129 48.452C-2.096 46.485 -2.096 43.295 -0.129 41.327L38.093 3.106Z" />
      </svg>
    </span>
  )
}
