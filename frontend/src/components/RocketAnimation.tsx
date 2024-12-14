import React from "react";
import { motion } from "framer-motion";

interface RocketAnimationProps {
  altitude: number;
}

const RocketAnimation: React.FC<RocketAnimationProps> = ({ altitude }) => {
  const rocketStyle = {
    width: "50px",
    height: "100px",
    backgroundColor: "gray",
    borderRadius: "10px",
  };

  const fireStyle = {
    width: "30px",
    height: "50px",
    backgroundColor: "orange",
    borderRadius: "50%",
    position: "absolute" as const,
    bottom: "-50px",
    left: "10px",
  };

  return (
    <div className="flex justify-center items-center h-64 relative">
      <motion.div
        style={rocketStyle}
        animate={{ y: -altitude / 100 }} // Scale altitude to move rocket
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div style={fireStyle}></div>
      </motion.div>
    </div>
  );
};

export default RocketAnimation;
