import { motion } from "framer-motion";

const motionDivStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "var(--secondary-color)",
  zIndex: 99999999,
  transform: "translateZ(0)",
  width: "100vw",
  height: "100vh",
};

const transition = (Component) => {
  return (props) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return <Component {...props} />;

    return (
      <>
        <Component {...props} />
        <motion.div
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{
            opacity: 0,
            visibility: "hidden",
          }}
          exit={{
            opacity: 1,
            visibility: "visible",
            transition: { duration: 0.2 },
          }}
          style={{
            ...motionDivStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            style={{
              backgroundImage: "url('/logo-transition.png')",
              width: "14rem",
              aspectRatio: "16/9",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, visibility: "visible" }}
          animate={{
            opacity: 0,
            visibility: "hidden",
            transition: { delay: 0.3 },
          }}
          exit={{ opacity: 0, visibility: "hidden" }}
          transition={{ duration: 0.3 }}
          style={{
            ...motionDivStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{
              translateX: 0,
              transition: { delay: 0, duration: 0 },
            }}
            exit={{ translateX: 0, transition: { delay: 0, duration: 0 } }}
            animate={{
              translateX: "calc(100vw + 14rem)",
              transition: {
                duration: 0.6,
                ease: [1, 0.2, 0.2, 1],
              },
            }}
            style={{
              backgroundImage: "url('/logo-transition.png')",
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
