import { motion } from "framer-motion";

const motionDivStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "var(--secondary-color)",
  zIndex: 9999,
  transform: "translateZ(0)",
};

const transition = (Component) => {
  return (props) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return <Component {...props} />;

    const transitionDuration = window.innerWidth > 700 ? 1.3 : 0.8;
    const delay = window.innerWidth > 700 ? 1 : 0.7;

    return (
      <>
        <Component {...props} />
        <motion.div
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{
            opacity: 0,
            visibility: "hidden",
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 1,
            visibility: "visible",
            transition: { duration: 0.2 },
          }}
          style={motionDivStyle}
        />
        <motion.div
          initial={{ opacity: 1, visibility: "visible" }}
          animate={{
            opacity: 0,
            visibility: "hidden",
            transition: { delay: 1 },
          }}
          exit={{ opacity: 0, visibility: "hidden" }}
          transition={{ duration: 0.2 }}
          style={{
            ...motionDivStyle,
            transformOrigin: "right",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{
              translateX: "calc(100vw + 14rem)",
              transition: { duration: 1 },
            }}
            style={{
              backgroundImage: "url('/logo-transition.webp')",
              width: "14rem",
              aspectRatio: "16/9",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </motion.div>
      </>
    );
  };
};

export default transition;
