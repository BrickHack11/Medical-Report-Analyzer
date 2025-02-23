import React from "react";
import styles from "./ReportSummary.module.css";
import { FaArrowLeft } from "react-icons/fa";

const ReportSummary = ({ fileUrl, fileType, analysisReport, fileName }) => {
    const goback_btn = () => {
        window.history.back();
        // window.location.href = "/analyze";
        // window.location.origin
    };

    // Function to convert markdown-style bold (**text**) into <strong>text</strong>
    const formatBoldText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    return (
        <div className={styles.reportContainer}>
            {/* Left Side: Display PDF or Image */}
            <div className={styles.left_side}>
                <div className={styles.left_headings}>
                    <FaArrowLeft className={styles.left_icon} onClick={goback_btn} />
                    <span className={styles.left_label}>File Name:</span>
                    <span className={styles.left_fileName}>{fileName}</span>
                </div>
                <div className={styles.filePreview}>
                    {fileType === "pdf" ? (
                        <iframe src={fileUrl} title="Uploaded PDF" className={styles.pdfViewer}></iframe>
                    ) : (
                        <div className={styles.scrollContainer}>
                            <img src={fileUrl} alt="Uploaded Report" className={styles.imagePreview} />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: AI-Generated Summary */}
            <div className={styles.summaryContainer}>
                <h2>AI Summary</h2>
                <ul className={styles.summaryList}>
                    {analysisReport.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: formatBoldText(item) }}></li>
                    ))}
                </ul>
                <button className={styles.saveButton}>Save Summary</button>
            </div>
        </div>
    );
};

export default ReportSummary;
