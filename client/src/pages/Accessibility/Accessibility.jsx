import styles from './Accessibility.module.css';

const Accessibility = () => {
    return (
        <div className={styles.Accessibility}>
            <h1 className={styles.header}>Accessibility</h1>
            <p className={styles.description}>
                Here are some valuable resources to learn more about the accessibility guidelines and standards that this tool follows:
            </p>
            <ul className={styles.guidelines}>
                {/* Accessibility Links */}
                <li className={styles.guideline}>
                    <a
                        href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WCAG Guidelines
                    </a>
                </li>
                <li className={styles.guideline}>
                    <a
                        href="https://www.section508.gov/manage/laws-and-policies/"
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Section 508 Standards
                    </a>
                </li>
                <li className={styles.guideline}>
                    <a
                        href="https://www.ada.gov/law-and-regs/design-standards/"
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ADA Design Standards
                    </a>
                </li>
                <li className={styles.guideline}>
                    <a
                        href="https://developers.google.com/web/fundamentals/accessibility"
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Accessibility Fundamentals
                    </a>
                </li>
            </ul>
            {/* Embedded Video */}
            <div className={styles.videoContainer}>
                <iframe
                    title="Introduction to Accessibility"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/SsKr_kYsUYI"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default Accessibility;
