// import { useTheme } from "../context/ThemeContext";

// const ThemeToggle = ({ floating = false }) => {
//   const { isDark, toggle } = useTheme();

//   const baseStyle = {
//     cursor: "pointer",
//     border: "none",
//     fontFamily: "inherit",
//   };

//   if (floating) {
//     return (
//       <button
//         onClick={toggle}
//         aria-label="Toggle theme"
//         style={{
//           ...baseStyle,
//           position: "fixed",
//           top: "18px",
//           right: "18px",
//           zIndex: 9999,
//           width: "44px",
//           height: "44px",
//           borderRadius: "50%",
//           background: isDark ? "rgba(30,30,36,0.95)" : "rgba(255,252,245,0.95)",
//           border: `1.5px solid ${isDark ? "rgba(201,168,76,0.4)" : "rgba(154,122,48,0.35)"}`,
//           backdropFilter: "blur(12px)",
//           fontSize: "20px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.15)",
//           transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12) rotate(12deg)"; }}
//         onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
//       >
//         {isDark ? "🌙" : "☀️"}
//       </button>
//     );
//   }

//   // Inline toggle for Navbar — pill style
//   return (
//     <button
//       onClick={toggle}
//       aria-label="Toggle theme"
//       style={{
//         ...baseStyle,
//         position: "relative",
//         width: "56px",
//         height: "28px",
//         borderRadius: "14px",
//         background: isDark
//           ? "rgba(201,168,76,0.15)"
//           : "linear-gradient(135deg, #fde68a, #fcd34d)",
//         border: `1.5px solid ${isDark ? "rgba(201,168,76,0.4)" : "rgba(202,138,4,0.5)"}`,
//         padding: 0,
//         display: "flex",
//         alignItems: "center",
//         flexShrink: 0,
//         transition: "background 0.35s ease, border-color 0.35s ease",
//       }}
//     >
//       {/* Sliding thumb */}
//       <div style={{
//         position: "absolute",
//         top: "3px",
//         left: isDark ? "3px" : "27px",
//         width: "20px",
//         height: "20px",
//         borderRadius: "50%",
//         background: isDark
//           ? "linear-gradient(135deg, #E8C97A, #C9A84C)"
//           : "linear-gradient(135deg, #f59e0b, #d97706)",
//         boxShadow: isDark
//           ? "0 2px 6px rgba(201,168,76,0.5)"
//           : "0 2px 6px rgba(245,158,11,0.6)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: "11px",
//         lineHeight: 1,
//         transition: "left 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.35s ease",
//         userSelect: "none",
//       }}>
//         {isDark ? "🌙" : "☀️"}
//       </div>
//     </button>
//   );
// };

// export default ThemeToggle;
