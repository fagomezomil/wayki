"use client";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";

import {
  X, Send, Loader2, ArrowDownCircleIcon,
  CircleHelp
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useChat } from "ai/react";

import LandingSections from "@/components/LandingSections";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Input } from "@/components/ui/input";


export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({
    api: "/api/gemini",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  }

  return (
    <div className="flex flex-col h-screen relative">
      <LandingSections />
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              
              className="rounded-full h-[90px] w-[90px] shadow-lg bg-[#206C60] hover:bg-[#133d37]"
            >
              {!isChatOpen ? (
                <CircleHelp style={{ width: '34px', height: '34px' }}  />
              ) : (
                <ArrowDownCircleIcon style={{ width: '34px', height: '34px' }} />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-28 z-50"
          >
            <div className="flex flex-row grid-cols-6 items-end">

              <Image
                src="/wayki.png"
                alt="Logo"
                width={150}
                height={400}
                className="col-span-1 h-[400px] w-auto mr-6"
              />
              <Card className="border-2 col-span-5  w-[800px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="w-[450px]">
                    <p className="text-4xl font-extrabold text-[#206C60]">Hola! Soy Wayki!</p>
                  </CardTitle>
                  <Button
                    onClick={toggleChat}
                    size="sm"
                    className="px-2 py-0 bg-neutral-400 hover:bg-neutral-600"
                  >
                    <X className="size-4" />
                    <span className="sr-only">Cerrar</span>
                  </Button>
                </CardHeader>
                  <div className="p-6 pt-0">
                    <p className="font-semibold text-xl text-neutral-600 w-11/12">Estoy aquí para hacer de tu proximo viaje a Tucumán una experiencia inolvidable. Si tienes alguna pregunta, no dudes en preguntarme.</p>
                    <hr className="my-2"/>
                    <p className="font-light text-sm text-neutral-400 italic w-11/12">Sabías que <strong className="font-bold">Wayki</strong> significa Amigo en Quechua? Wayki en antiguo dialecto Quechua significaba Amigo o compañero. Soy un modelo de Inteligencia artificial basada en el modelo de Gemini, programada para ser un informante turistico. Consultame.</p>

                  </div>
                <CardContent className="mt-6 p-4">
                  <ScrollArea className="h-[400px] text-gray-500 items-center justify-center text-[14px] flex gap-3 mx-2 px-2">
                    {messages?.length === 0 && (
                      <div>
                        <p>No hay mensajes aún</p>
                      </div>
                    )}
                    {messages?.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <div className={`inline-block rounded-lg 
                          ${message.role === "user" ? "bg-[#206C60] text-white text-wrap p-2 w-fit" : "bg-[#e6f7e0] p-2"}`}>
                          <ReactMarkdown
                          // eslint-disable-next-line 
                            children={message.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, children, ...props }) {
                                return inline ? (
                                  <code {...props} className="bg-[#D6E9CF] px-1 rounded" >{children}</code>
                                ) : (
                                  <pre>
                                    <code {...props} className="bg-[#D6E9CF] px-1 rounded">{children}</code>
                                  </pre>
                                );
                              },
                              ul: ({ children }) => (
                                <ul className="list-disc pl-4 space-y-1">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-4 space-y-1">{children}</ol>
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="w-full items-center flex justify-center gap-3">
                        <Loader2 className="animate-spin h-5 w-5 text-primary" />
                        <button className="underline" type="button" onClick={() => stop()}>
                          Detener
                        </button>
                      </div>
                    )}
                    {error && (
                      <div className="w-full items-center flex justify-center gap-3">
                        <div>Ocurrio un error</div>
                        <button className="underline" type="button" onClick={() => reload()}>Reintentar</button>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2"
                  >
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1" />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="icon"
                      className="size-9 bg-[#206C60] hover:bg-[#133d37]">
                      <Send className="size-5 " />
                    </Button>

                  </form>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
