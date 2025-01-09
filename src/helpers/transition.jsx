import { motion } from "framer-motion";

const motionDivStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "var(--secondary-color)",
  zIndex: 999999,
  transform: "translateZ(0)",
};

const transition = (Component) => {
  return (props) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return <Component {...props} />;

    return (
      <>
        <Component {...props} />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            ...motionDivStyle,
            transformOrigin: "left",
          }}
        ></motion.div>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0, transition: { delay: 0.5 } }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            ...motionDivStyle,
            transformOrigin: "right",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src="/logo-transition.avif"
            alt="logo"
            initial={{ translateX: "calc(-100vw - 14rem)" }}
            animate={{
              translateX: "calc(100vw + 14rem)",
              transition: { duration: 0.8 },
            }}
            style={{
              position: "absolute",
              width: "14rem",
            }}
          />
        </motion.div>
      </>
    );
  };
};

export default transition;
