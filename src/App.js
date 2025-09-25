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
  const [activeForm, setActiveForm] = useState("spring2026");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const buttonStyle = (key) => ({
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor:
      activeForm === key || hoveredButton === key ? "#ea8115" : "#bedbd6",
    color: "#fff", // altid hvid tekst
    fontWeight: "bold",
    fontFamily: "basier square regular",
    fontSize: windowWidth < 600 ? "14px" : "16px",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  });

  const gridStyle = {
    display: "grid",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
    gridTemplateColumns:
      windowWidth < 600
        ? "repeat(2, 1fr)"
        : "repeat(auto-fit, minmax(120px, auto))",
    maxWidth: windowWidth < 600 ? "400px" : "none",
    margin: "0 auto",
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "basier square regular",
        textAlign: "center",
      }}
    >
      {/* Sticky knapper */}
      <div
        style={{
          ...gridStyle,
          position: "sticky",
          top: 0,
          backgroundColor: "transparent", // gennemsigtig baggrund
          zIndex: 1000,
          padding: "10px 0",
        }}
      >
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

      {/* Formular scrollboks */}
      {activeForm && (
        <div
          style={{
            marginTop: "20px",
            maxHeight: "500px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#fff", // hvid baggrund til formularen
          }}
        >
          <div id={forms[activeForm].id}></div>
        </div>
      )}
    </div>
  );
}
