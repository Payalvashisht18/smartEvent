// import { useState, useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";
// import "../pages/AuthAnimations.css";

// const FloatingThemeToggle = () => {
//   const { isDark, toggle } = useTheme();
//   const [spinning, setSpinning] = useState(false);
//   const [rippling, setRippling] = useState(false);

//   const handleClick = () => {
//     setSpinning(true);
//     setRippling(true);
//     toggle();
//     setTimeout(() => setSpinning(false), 500);
//     setTimeout(() => setRippling(false), 400);
//   };

//   return (
//     <>
//       {/* Orbit ring */}
//       <div className={`toggle-orbit ${!isDark ? "light-orbit" : ""}`}>
//         <div className="orbit-dot" />
//       </div>

//       <button
//         onClick={handleClick}
//         className={`theme-toggle-btn ${isDark ? "dark-mode" : "light-mode"} ${rippling ? "rippling" : ""}`}
//         title={`Switch to ${isDark ? "light" : "dark"} mode`}
//         aria-label="Toggle theme"
//       >
//         <span className={`toggle-icon ${spinning ? "spinning" : ""}`}>
//           {isDark ? "🌙" : "☀️"}
//         </span>
//       </button>
//     </>
//   );
// };

// export default FloatingThemeToggle;
