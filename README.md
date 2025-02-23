# Medi-Genie

Medi-Genie is an innovative AI-powered tool designed to simplify and make medical reports more accessible to everyone, regardless of their medical knowledge. Many medical reports are filled with complex terminology that can be hard for non-medical users to understand. This project aims to bridge that gap, offering a user-friendly platform that transforms intricate medical jargon into easily digestible, actionable insights.


## Inspiration
Medical reports are often filled with complex medical jargon, making it difficult for non-medical users to understand their health status.  
Inspired by the need to make healthcare more accessible and transparent, we built an AI-powered tool that simplifies medical reports, making them easy to read and interpret.  

## What it does
✅ Securely log in using **Auth0** (Google, Email, Yahoo, Facebook, Twitter)  
✅ Upload medical reports in PDF, Image, or Text formats  
✅ Utilize **GenAI** to extract key insights and explain medical terms in simple language  
✅ Highlight **abnormal vs. normal** values in test reports  
✅ Offer **personalized health suggestions** based on report data  
✅ Track health trends over time with historical report storage  
✅ Generate reports in **multiple languages**, allowing accessibility for diverse users  

## How we built it
🚀 **Tech Stack Used:**  
- **Frontend:** React.js (for user interaction with uploading file and report)  
- **Backend:** Python (Flask)  
- **Database:** MongoDB (stores reports & analysis)  
- **AI and Textract:** for text analysis & simplification  
- **Authentication:** Auth0 (secure login via Google, Email, Yahoo, Facebook, or Twitter)  
- **Storage:** Local storage for file uploads  

## Challenges we ran into
🔹 Struggled with poor text extraction due to low-quality scans and complex medical terminology.  
🔹 Difficulty extracting text from PDFs with embedded images or multi-column layouts.  
🔹 Needed to prevent malicious file uploads and manage large file sizes.  

## Accomplishments that we're proud of
🏆 Implemented secure authentication & role-based access control (RBAC) using **Auth0** to manage user access and permissions seamlessly.  
🏆 Leveraged **MongoDB Atlas** for real-time data storage, fast queries with indexing, and secure database access using IP whitelisting.  
🏆 Integrated OpenAI’s **GenAI** for text summarization, intelligent recommendations, and conversational AI to enhance medical report analysis.  
🏆 Built a seamless **React-Frontend** and **Flask-Backend** communication for a smooth user experience.  
🏆 Enabled multi-format report uploads with precise text extraction.  

## What we learned
📌 The importance of natural language processing (NLP) in simplifying medical jargon  
📌 Handling data security and privacy in medical applications  
📌 Optimizing AI models for better accuracy in text extraction and analysis  
📌 Enhancing user experience for better engagement and accessibility  

## What's next for MediGenie
🎯 **Voice-Based Summarization:** Provide AI-generated voice summaries for reports  
🎯 **More AI-powered Insights:** Expand to detecting potential health risks and anomalies  
🎯 **Mobile App Version:** Build an iOS & Android app for on-the-go accessibility  
🎯 **Integration with Wearables:** Sync data from smartwatches for real-time health monitoring  
