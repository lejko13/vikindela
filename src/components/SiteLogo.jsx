// Ružové logo VIKINDELA (rovnaké ako na úvodnej obrazovke), použité vľavo hore na celom webe.
export default function SiteLogo({ className = '' }) {
  return (
    <img
      src="/vikindela-logo.png"
      alt="VIKINDELA"
      draggable="false"
      className={`block h-[34px] w-auto select-none md:h-[clamp(40px,3.6vw,64px)] ${className}`}
    />
  )
}
