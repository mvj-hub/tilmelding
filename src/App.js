import React, { useState, useEffect } from "react";

const forms = {
  spring2026: {
    id: "youngcrm_admission_859",
    script:
      "https://brandbjerg.youngcrm.com/admissions/embed/859/signup/script",
    title: "Forår 2026",
  },
  fall2026: {
    id: "youngcrm_admission_861",
    script:
      "https://brandbjerg.youngcrm.com/admissions/embed/861/signup/script",
    title: "Efterår 2026",
  },
  spring2027: {
    id: "youngcrm_admission_862",
    script:
      "https://brandbjerg.youngcrm.com/admissions/embed/862/signup/script",
    title: "Forår 2027",
  },
  fall2027: {
    id: "youngcrm_admission_863",
    script:
      "https://brandbjerg.youngcrm.com/admissions/embed/863/signup/script",
    title: "Efterår 2027",
  },
};

export default function SemesterForms() {
  const [activeForm, setActiveForm] = useState("spring2026"); // Forår 2026 valgt som default
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    if (!activeForm) return;

    const form = forms[activeForm];
    const container = document.getElementById(form.id);
    if (container) {
      container.innerHTML = "";

      const script = document.createElement("script");
      script.src = form.script;
      script.async = true;
      container.appendChild(script);
    }
  }, [activeForm]);

  // Inline styles for knapper
  const buttonStyle = (key) => ({
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor:
      activeForm === key
        ? "#ea8115" // aktiv farve
        : hoveredButton === key
        ? "#ea8115" // hover farve
        : "#bedbd5", // standard farve
    color: "#fff",
    fontWeight: "bold",
    margin: "5px",
  });

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.keys(forms).map((key) => (
          <button
            key={key}
            style={buttonStyle(key)}
            onClick={() => setActiveForm(key)}
            onMouseEnter={() => setHoveredButton(key)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {forms[key].title}
          </button>
        ))}
      </div>

      {activeForm && (
        <div style={{ marginTop: "20px" }}>
          <h3>{forms[activeForm].title}</h3>
          <div id={forms[activeForm].id}></div>
        </div>
      )}
    </div>
  );
}
