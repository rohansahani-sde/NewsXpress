import { motion } from "framer-motion";

const MotionMain = motion.main;

export default function PageTransition({ children }) {
  return (
    <MotionMain
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="pb-16"
    >
      {children}
    </MotionMain>
  );
}
