import getURL from "~/helper/helper";

const CopyLinkButton = ({ id }) => {
  const copyContent = async () => {
    try {
      const contentUrl = getURL(`/view/${id ?? ""}`);
      await navigator.clipboard.writeText(contentUrl);
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    }
  };

  return <button onClick={copyContent}>Copy Link</button>;
};

export default CopyLinkButton;
