"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi2";
import { Container } from "@/components/ui/container";

const faqs = [
  {
    question: "How can I submit my own eco-innovation?",
    answer: "You can submit your idea by creating an account and clicking the 'Join Community' or 'Share Idea' button. Our guided submission process will help you detail your innovation's impact and requirements.",
  },
  {
    question: "Is EcoSpark Hub free to use?",
    answer: "Yes, the core EcoSpark Hub platform is free for individual innovators and community members. We also offer specialized tools and verified badges for professional teams and large-scale projects.",
  },
  {
    question: "How do you verify the environmental impact?",
    answer: "Our expert panel of sustainability scientists reviews every submission against science-backed metrics. Ideas that meet our rigorous standards receive the 'Verified Innovation' badge and increased visibility.",
  },
  {
    question: "Can I find collaborators for my project?",
    answer: "Absolutely! EcoSpark is built on collaboration. Each project page features a discussion hub where you can find team members, mentors, and partners with the specific skills you need.",
  },
  {
    question: "What happens after my idea is verified?",
    answer: "Verified innovations gain access to our Global Partner Network, exclusive funding opportunities, and featured placement on our platform to help scale your impact globally.",
  },
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4"
          >
            EcoSpark Hub FAQs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Got questions about our platform? Get all the answers you need to start your sustainability journey with confidence!
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
                  boxShadow: isActive ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "none",
                }}
                className={`rounded-[2rem] border-b border-slate-100 dark:border-slate-800 transition-all duration-300 ${
                  isActive ? "border-transparent" : ""
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                >
                  <span
                    className={`text-lg md:text-xl font-bold transition-colors ${
                      isActive ? "text-emerald-600" : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive
                        ? "border-emerald-500 text-emerald-500"
                        : "border-slate-300 dark:border-slate-600 text-slate-400"
                    }`}
                  >
                    {isActive ? <HiMinus className="w-5 h-5" /> : <HiPlus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-sm hover:underline">
            View All FAQs
          </button>
        </motion.div>
      </Container>
    </section>
  );
};
