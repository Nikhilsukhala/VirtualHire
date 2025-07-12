import React, { useRef, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

const OfferLetter = () => {
  const pdfRef = useRef();

  // 🔁 Load dynamic values from localStorage
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [ctc, setCtc] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("candidateName") || "Candidate");
    setCompany(localStorage.getItem("company") || "Your Company");
    setPosition(localStorage.getItem("position") || "Software Engineer");
    setCtc(localStorage.getItem("ctc") || "₹X,00,000");
    setDate(localStorage.getItem("joiningDate") || "DD MMM YYYY");
  }, []);

  const downloadPDF = () => {
    html2pdf().from(pdfRef.current).save(`${name}_Offer_Letter.pdf`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px 20px",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <div ref={pdfRef} style={{
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "700px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ color: "#4F46E5", textAlign: "center", marginBottom: "30px" }}>
          🎉 Job Offer Letter
        </h1>

        <p><strong>To:</strong> {name}</p>
        <p><strong>Company:</strong> {company}</p>
        <p><strong>Position:</strong> {position}</p>
        <p><strong>CTC:</strong> {ctc}</p>
        <p><strong>Joining Date:</strong> {date}</p>

        <p style={{ marginTop: "30px", lineHeight: "1.6" }}>
          We are thrilled to extend you this offer for the position of <strong>{position}</strong> at <strong>{company}</strong>.
          Your profile, skills, and performance in the virtual interview process were impressive.
        </p>
        <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
          We believe you will be a valuable addition to our team and look forward to seeing you grow with us.
        </p>
        <br />
        <p>Warm regards,</p>
        <p><strong>HR Department</strong></p>
      </div>

      <button onClick={downloadPDF} style={{
        marginTop: "30px",
        padding: "12px 24px",
        backgroundColor: "#4F46E5",
        color: "#fff",
        fontSize: "1rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        📄 Download PDF
      </button>
    </div>
  );
};

export default OfferLetter;
