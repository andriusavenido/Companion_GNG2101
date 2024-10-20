import styles from './Accessibility.module.css';

const Accessibility = () => {
    return (
        <div className={styles.Accessibility}>
            <h1 className={styles.h1}>Accessibility</h1>
            <p className={styles.Accessibility}>
                Here are a few resources to learn more on the guidelines that this tool follows 
            </p>
            <ul className={styles.guidelines}>
                <li className={styles.guideline}>
                    <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className={styles.a}>WCAG guidelines</a>
                </li>
                <li className={styles.guideline}><a className={styles.a} href="https://www.section508.gov/manage/laws-and-policies/">Section 508</a></li>
                <li className={styles.guideline}><a href="https://www.ada.gov/law-and-regs/design-standards/"className={styles.a}>ADA</a></li>
            </ul>
        </div>
    );
}

export default Accessibility;