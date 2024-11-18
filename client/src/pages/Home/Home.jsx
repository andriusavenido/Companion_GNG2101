import { ReactSVG } from "react-svg";
import companionLogo from "../../assets/svg/Rainbow.svg";
import uploadIcon from "../../assets/svg/File_Add.svg";
import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
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
    responseIsLoading
  } = useChatHandler();

  const messagesEndRef = useRef(null); //reference used to snap to for scrolling
  const fileInputRef = useRef(null); //reference for file input

  //enter key
  const handleKeyDown = (e) => {
    //CANNOT enter if its loading
    if (e.key === "Enter" && input.trim() && !responseIsLoading) {
      e.preventDefault();
      setBeganConversation(true);
      //send message
      sendMessage();
      setInput(""); // clear input after sending
    }
  };

  useEffect(()=>{
    if (messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({behaviour:"smooth"});
    }
  },[messages])

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
          <div className={styles.logoText}>
            <ReactSVG  className={styles.logoIcon} src={companionLogo}/>
          <h1>
            Companion <span>a tool for Ally</span>
          </h1>
          </div>
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
      {beganConversation &&  <h2>Companion v1.0<p className={styles.superspan}>powered by GPT-4o</p></h2>}
      {beganConversation && <div className={styles.messages}>
        {messages.map((message) =>(
          <div key = {message.id} className={`${styles.message} ${message.sender ==='user' ? styles.user: styles.bot}`}>
            {parseMessageToJSX(message.text)}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
        </div>}

      <div className={styles.inputBar}>
        <input
          className={styles.textInput}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={responseIsLoading?"Companion is working hard!":"Send a message..."}
          onKeyDown={handleKeyDown}
          disabled={responseIsLoading}
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

/**
 * Custom Formatting function (to handle list reponses etc)
 * @param {*} messageText 
 * @returns 
 */
function parseMessageToJSX(messageText) {
  const lines = messageText.split('\n');

  return lines.map((line, index) => {
    // Check if line has more than one space (add padding for extra whitespace)
    if (line.trim().length === 0) {
      return <div key={index} className={styles.line_space}/>;
    }

    // Render bold text (e.g., **bold**)
    if (line.startsWith('**') && line.endsWith('**')) {
      return <strong key={index}>{line.slice(2, -2)}</strong>;
    }
    
    // Render italic text (e.g., *italic*)
    if (line.startsWith('*') && line.endsWith('*')) {
      return <em key={index}>{line.slice(1, -1)}</em>;
    }

    // Render bullet points (e.g., - bullet point)
    if (line.startsWith('- ')) {
      return <ul key={index}><li>     {line.slice(2)}</li></ul>;
    }

    // Replace bold (**bold**) and italic (*italic*) in the middle of text
    const lineElements = [];
    let parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g); // Split by bold/italic
    parts.forEach((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        lineElements.push(<strong key={idx}>{part.slice(2, -2)}</strong>);
      } else if (part.startsWith('*') && part.endsWith('*')) {
        lineElements.push(<em key={idx}>{part.slice(1, -1)}</em>);
      } else {
        lineElements.push(part);
      }
    });

    // Return the parts as a single JSX element
    return <p key={index}>{lineElements}</p>;
  });
}

export default Home;
