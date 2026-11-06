// Ružové logo VIKINDELA (rovnaké ako na úvodnej obrazovke), použité vľavo hore na celom webe.
export default function SiteLogo({ className = '' }) {
  return (
    <img
      src="/vikindela-logo.png"
      alt="VIKINDELA"
      draggable="false"
      className={`logo-lift block h-[47px] w-auto select-none md:h-[clamp(55px,4.97vw,89px)] ${className}`}
    />
  )
}
