import { ReactSVG } from "react-svg";
import companionLogo from "../../assets/svg/Rainbow.svg";
import uploadIcon from "../../assets/svg/File_Add.svg";
import styles from "./Home.module.css";
import { useRef, useState } from "react";
import useChatHandler from "../../hooks/useChatHandler";

const Home = () => {
  const [beganConversation, setBeganConversation] = useState(false);
  const {
    messages,
    input,
    setInput,
    sendMessage,
    handleFileUpload,
    uploadedFile,
  } = useChatHandler();

  const messagesEndRef = useRef(null); //reference used to snap to for scrolling
  const fileInputRef = useRef(null); //reference for file input

  //enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      setBeganConversation(true);
      //send message
      setInput(""); // clear input after sending
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const csvFiles = files.filter((file) => file.type === "text/csv"); //mime type

    if (csvFiles.length > 0 && !uploadedFile) {
      handleFileUpload(csvFiles[0]);
    }
  };

  const clearUpLoadedFile = () => {
    handleFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.page}>
      {!beganConversation && (
        <div className={styles.introduction}>
          <h1>
            Companion <span>a tool for Ally</span>
          </h1>
          <p>
            Hi there! I'm Companion, your virtual assistant here to help you
            enhance your course content's accessibility. How can I help?
          </p>
          <ul>
            <li>
              <strong>Ask me about accessibility:</strong> Need tips or
              guidelines? Just ask!
            </li>
            <li>
              <strong>Get personalized recommendations:</strong> Share your
              course details and layouts and I’ll provide tailored advice.
            </li>
            <li>
              <strong>Feedback on your content:</strong> Upload your Ally
              prompted .csv files, and I’ll analyze them for you, and let you
              know how you can improve your Canvas course.{" "}
            </li>
          </ul>
          <p>
            {" "}
            Simply type your question, request, or file below and let's get
            started on making your content more accessible together!{" "}
          </p>
        </div>
      )}

      {beganConversation && <div className={styles.messages}>
        
        
        </div>}

      <div className={styles.inputBar}>
        <input
          className={styles.textInput}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          onKeyDown={handleKeyDown}
        />
        <div
          className={styles.fileDrop}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <ReactSVG src={uploadIcon}></ReactSVG>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (!uploadedFile && e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            style={{ display: "none" }}
            id="fileUpload"
            ref = {fileInputRef}
          />
          {uploadedFile && <p>{truncateFilename(uploadedFile.name, 15)}</p>}

          {!uploadedFile && <p>Upload .csv file</p>}
        </div>
      </div>
      {uploadedFile && (
        <button className={styles.deleteButton} onClick={clearUpLoadedFile}>
          Delete uploaded file
        </button>
      )}
    </div>
  );
};

function truncateFilename(filename, maxLength) {
  if (filename.length <= maxLength) {
    return filename;
  }
  return `${filename.slice(0, maxLength - 3)}...`;
}

export default Home;
