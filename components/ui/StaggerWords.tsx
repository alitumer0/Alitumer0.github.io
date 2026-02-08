"use client";

import { motion } from "framer-motion";

type StaggerWordsProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function StaggerWords({ text, className, delay = 0 }: StaggerWordsProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.35em] inline-block overflow-hidden align-top">
          <motion.span
            initial={{ y: "120%", opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: 0.65,
              delay: delay + index * 0.05,
              ease: [0.2, 0.82, 0.2, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
