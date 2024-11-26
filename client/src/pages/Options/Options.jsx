import { useOptionsContext } from "../../context/OptionsContext";
import styles from "./Options.module.css";

const Options = () => {
    const {theme,setTheme}=useOptionsContext();

    const handleThemeChange = (e) =>{
        setTheme(e.target.value);
    }
    return ( <div>
        <div className={styles.options}>
             <label >Theme: </label>
                <select id="theme" name="theme" value = {theme}onChange={handleThemeChange}>
                    <option value="default">Default</option>
                    <option value="light">Light</option>
                    <option value="highcontrast">High Contrast</option>
                </select>
            </div>
    </div> );
}
 
export default Options;