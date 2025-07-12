import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ❶  QUESTION BANK  (all keys LOWER-CASE) */
const questionsByCompany = {
  tcs: [
    "Tell me about yourself.",
    "Explain OOPs concepts.",
    "What is SDLC?"
  ],
  infosys: [
    "What are your strengths?",
    "How do you handle pressure?",
    "Describe your final-year project."
  ],
  google: [
    "What is Big-O notation?",
    "Tell me about a time you solved a hard problem.",
    "How would you design YouTube?"
  ],
  amazon: [
    "Describe a leadership principle you follow.",
    "How do you handle failure?",
    "Give an example of customer obsession."
  ]
};

const Interview = () => {
  const { company } = useParams();
  const navigate    = useNavigate();

  const safeCompany = company?.toLowerCase();
  const questions   = questionsByCompany[safeCompany];

  const [round,   setRound]   = useState(0);
  const [answer,  setAnswer]  = useState("");
  const [feedback,setFeedback]= useState("");
  const [result,  setResult]  = useState(null);   // "Pass" | "Fail" | null

  /* ❸  GUARD: company not found */
  if (!questions) {
    return (
      <div style={{ padding:40, textAlign:"center", color:"red" }}>
        <h2>❌ Company not found</h2>
        <p>Please return to the homepage and choose a valid company.</p>
      </div>
    );
  }

  /* ❹  SUBMIT HANDLER (GPT CALL) */
  const handleSubmit = async () => {
  if (!answer.trim()) {
    alert("Please type your answer.");
    return;
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
You're a supportive but professional technical interviewer.

Evaluate the candidate’s answer and decide if they should PASS this round.

🔒 FORMAT:
Feedback: <1-2 helpful sentences>
Result: Pass or Fail

🧠 RULES:
- Pass if the answer is relevant, shows effort, and touches on the topic.
- Fail only if it's clearly wrong, blank, or silly (like "haha", "idk", "asdf").

Respond in the exact format. Do not add anything extra.

Question: ${questions[round]}
Answer: ${answer}
`


          }
        ]
      })
    });

    const data     = await res.json();
    const fullText = data?.choices?.[0]?.message?.content || "";

console.log("🧠 GPT Raw:", fullText);

const feedbackMatch = fullText.match(/Feedback:\s*(.+?)\n/i);
const resultMatch   = fullText.match(/Result:\s*(Pass|Fail)/i);

// Smart fallback if GPT forgets Result
let parsedResult = "Fail";
if (resultMatch) {
  parsedResult = resultMatch[1].trim();
} else if (answer.length > 30) {
  // 🔁 If no "Result" but decent answer, default to Pass
  parsedResult = "Pass";
}

const parsedFeedback = feedbackMatch
  ? feedbackMatch[1].trim()
  : "Thanks for your answer!";

setFeedback(parsedFeedback);
setResult(parsedResult);

  } catch (err) {
    console.error("❌ GPT Error:", err);
    setFeedback("Sorry, something went wrong.");
    setResult("Fail");
  }
};

  /* ❺  NEXT-ROUND HANDLER */
  const nextRound = () => {
    if (round < questions.length - 1) {
      setRound(round + 1);
      setAnswer("");
      setFeedback("");
    } else {
      localStorage.setItem("candidateName", "Nikhil Sukhala"); // or ask via input later
localStorage.setItem("company", company);
localStorage.setItem("position", "Software Developer");
localStorage.setItem("ctc", "₹6,00,000");
localStorage.setItem("joiningDate", "01 August 2025");

navigate("/offer-letter");

    }
  };

  /* ❻  UI */
  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      padding:"60px 20px",
      background:"linear-gradient(120deg,#f3f4f6,#e5e7eb)",
      fontFamily:"Segoe UI, sans-serif"
    }}>
      <h2 style={{ marginBottom:10 }}>
        ✏️ {safeCompany.toUpperCase()} Interview — <span style={{ color:"#6D28D9" }}>Round {round+1}</span>
      </h2>

      <p style={{ fontWeight:"600", marginBottom:10 }}>{questions[round]}</p>

      <textarea
        rows="6"
        cols="60"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ padding:10, borderRadius:6, border:"1px solid #ccc", resize:"vertical" }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop:15, padding:"8px 20px",
          background:"#6D28D9", color:"#fff",
          border:"none", borderRadius:6, cursor:"pointer"
        }}
      >
        Submit Answer
      </button>

      {feedback && (
  <div style={{
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    maxWidth: 700,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  }}>
    <h3>🧠 AI Feedback</h3>
    <p>{feedback}</p>

    {result && (
      <p style={{
        fontWeight: "bold",
        color: result === "Pass" ? "green" : "red",
        fontSize: "1.2rem"
      }}>
        {result === "Pass" ? "✅ Passed" : "❌ Failed"}
      </p>
    )}
    {result === "Fail" && (
  <button onClick={() => setResult(null)} style={{
    marginTop: 10, background: "#EF4444", color: "white",
    border: "none", padding: "10px 20px", borderRadius: "6px"
  }}>
    Retry Round 🔁
  </button>
)}

    {result === "Pass" && (
      <button
        onClick={nextRound}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          backgroundColor: "#10B981",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        {round < questions.length - 1 ? "Next Round ➡️" : "Get Offer Letter 🎉"}
      </button>
    )}
  </div>
)}

    </div>
  );
};

export default Interview;

