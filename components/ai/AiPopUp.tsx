"use client";

import { useState } from "react";
import AiChat from "./AiChat";
import AiIcon from "./AiIcon";

export default function AiPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-md:bottom-1 max-md:right-1">
      {isOpen ? (
        <AiChat handleClose={handleClose} />
      ) : (
        <AiIcon handleOpen={handleOpen} />
      )}
    </div>
  );
}
