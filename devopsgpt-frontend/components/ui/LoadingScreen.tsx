"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {

  return (

    <motion.div

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
    >

      <div className="text-center">

        <motion.div

          animate={{
            rotate: 360
          }}

          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear"
          }}

          className="w-24 h-24 border-4 border-white border-t-transparent rounded-full mx-auto mb-8"
        />

        <h1 className="text-4xl font-bold text-white">

          Generating Infrastructure...

        </h1>

      </div>

    </motion.div>

  );
}