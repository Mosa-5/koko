export const WatchItIcon = () => (
  <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="inline-block aspect-square md:w-[32px] w-[20px]">
    {/* Camera body with lens hole carved out via evenodd */}
    <path fillRule="evenodd" clipRule="evenodd"
      d="M3.5 6.5 H14 A1.5 1.5 0 0 1 15.5 8 V13 A1.5 1.5 0 0 1 14 14.5 H3.5 A1.5 1.5 0 0 1 2 13 V8 A1.5 1.5 0 0 1 3.5 6.5 Z
         M8 8.3 A2.2 2.2 0 1 0 8.001 8.3 Z"
      fill="var(--color-main-color)"/>
    {/* Side arm / viewfinder */}
    <path d="M15.5 8.8 L18.5 7 L18.5 14 L15.5 12.2Z" fill="var(--color-main-color)"/>
  </svg>
);
