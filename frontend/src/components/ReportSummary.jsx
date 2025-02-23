import React, { useState } from "react";
import styles from "./ReportSummary.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ReportSummary = ({ fileUrl, fileType, analysisReport, fileName }) => {
    const { user } = useAuth0();
    const user_email = user?.email || "unknown@example.com";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // React Router navigation function

    // Go back to the initial state of /analyze using the navigate trick
    const goback_btn = () => {
        navigate("/temp", { replace: true }); // Navigate to a temporary route
        setTimeout(() => navigate("/analyze", { replace: true }), 10); // Navigate back to /analyze
    };

    // Function to get today's date in "YYYY-MM-DD" format
    const getFormattedDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Function to replace **text** with <strong>text</strong> for proper rendering
    const formatBoldText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    const saveSummary = async () => {
        const apiUrl = "http://127.0.0.1:5000/insert";
        const requestData = {
            user_email: user_email,
            date_added: getFormattedDate(),
            file_name: fileName,
            analysis_report: analysisReport,
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error("Failed to save summary");

            const result = await response.json();
            console.log("API Response:", result);
            alert("Summary saved successfully! ✅");
            setIsModalOpen(false);

        } catch (error) {
            console.error("Error saving summary:", error);
            alert("Failed to save summary ❌");
        }
    };

    return (
        <div className={styles.reportContainer}>
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

            {/* AI Summary Section */}
            <div className={styles.summaryContainer}>
                <h2>AI Summary</h2>
                <ul className={styles.summaryList}>
                    {analysisReport.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: formatBoldText(item) }}></li>
                    ))}
                </ul>
                <button className={styles.saveButton} onClick={() => setIsModalOpen(true)}>Save Summary</button>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalContent}>
                        <h3>Are you sure you want to save this report to Database?</h3>
                        <div className={styles.modalActions}>
                            <button className={styles.submitButton} onClick={saveSummary}>Submit</button>
                            <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportSummary;
