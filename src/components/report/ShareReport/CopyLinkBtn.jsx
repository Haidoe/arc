import { useState } from "react";
import getURL from "~/helper/helper";

const CopyLinkButton = ({ id }) => {
  //This is to put delay after the button is clicked
  const [isCopied, setIsCopied] = useState(false);

  const copyContent = async () => {
    try {
      const contentUrl = getURL(`/view/${id ?? ""}`);
      await navigator.clipboard.writeText(contentUrl);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    }
  };

  if (isCopied) {
    return <p> Successfully Copied </p>;
  }

  return <button onClick={copyContent}>Copy Link</button>;
};

export default CopyLinkButton;
