// Ružové logo VIKINDELA (rovnaké ako na úvodnej obrazovke), použité vľavo hore na celom webe.
export default function SiteLogo({ className = '' }) {
  return (
    <img
      src="/vikindela-logo.png"
      alt="VIKINDELA"
      draggable="false"
      className={`logo-lift block h-[41px] w-auto select-none md:h-[clamp(48px,4.32vw,77px)] ${className}`}
    />
  )
}
