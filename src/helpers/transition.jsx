import { motion } from "framer-motion";

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
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--navs-color)",
            zIndex: 9999,
            transformOrigin: "left",
          }}
        ></motion.div>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--navs-color)",
            zIndex: 9999,
            transformOrigin: "right",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src="/logo-transition.png"
            initial={{ right: "90%" }}
            animate={{ right: "-90%", transition: { duration: 0.8 } }}
            style={{
              position: "absolute",
              width: "clamp(200px, 20rem, 350px)",
            }}
          />
        </motion.div>
      </>
    );
  };
};

export default transition;
