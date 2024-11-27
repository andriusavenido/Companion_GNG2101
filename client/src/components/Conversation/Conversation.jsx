import { useNavigate } from "react-router-dom";
import { useHistoryContext } from "../../context/HistoryContext";
import useHistoryManager from "../../hooks/useHistoryManager";
import styles from "./Conversation.module.css";
const Conversation = ({title,messages,timestamp,handleDelete}) => {

    const {setMessageHistory} = useHistoryContext();
    const navi = useNavigate();

    const handleContinue =()=>{
        setMessageHistory(messages);
        navi("/");
    }

    return (  <div className={styles.Conversation}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <p className={styles.timestamp}>{new Date(timestamp).toLocaleString()}</p>
        </div>
        {/* Button to handle actions like delete */}
        <div className={styles.actions}>
          <button
            className={styles.deleteButton}
            onClick={handleContinue}
          >
           Continue conversation...
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div> );
}
 
export default Conversation;