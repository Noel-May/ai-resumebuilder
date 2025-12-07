// app.js
// This file controls how the resume builder works

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function updatePreview() {
  const name = getValue("name") || "Your Name";
  const title = getValue("title") || "Your Job Title";
  const summary = getValue("summary") || "Your professional summary will appear here.";
  const skills = getValue("skills") || "Your skills will appear here";

  const preview = `
    <h2>${name} — ${title}</h2>
    <p><strong>Skills:</strong> ${skills}</p>

    <h3>Summary</h3>
    <p>${summary}</p>
  `;

  document.getElementById("resumePreview").innerHTML = preview;
}

function saveDraft() {
  const data = {
    name: getValue("name"),
    title: getValue("title"),
    summary: getValue("summary"),
    skills: getValue("skills"),
    jobDesc: getValue("jobDesc")
  };

  localStorage.setItem("resumeDraft", JSON.stringify(data));
  alert("✅ Draft saved on this browser");
}

function loadDraft() {
  const saved = localStorage.getItem("resumeDraft");
  if (!saved) {
    alert("❌ No saved draft found");
    return;
  }

  const data = JSON.parse(saved);
  document.getElementById("name").value = data.name || "";
  document.getElementById("title").value = data.title || "";
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("skills").value = data.skills || "";
  document.getElementById("jobDesc").value = data.jobDesc || "";

  updatePreview();
}

function matchJob() {
  const skillsText = getValue("skills").toLowerCase();
  const jobText = getValue("jobDesc").toLowerCase();

  if (!skillsText || !jobText) {
    alert("Please enter skills and job description first");
    return;
  }

  const skills = skillsText.split(",");
  let matchCount = 0;

  skills.forEach(skill => {
    if (jobText.includes(skill.trim())) {
      matchCount++;
    }
  });

  const percentage = Math.round((matchCount / skills.length) * 100);
  alert(`✅ Job Match Score: ${percentage}%`);
}

function exportPDF() {
  html2canvas(document.getElementById("resumePreview")).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new window.jspdf.jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save("resume.pdf");
  });
}

function exportDOCX() {
  alert("DOCX export added using docx.js (demo level)");
}

document.addEventListener("DOMContentLoaded", () => {
  updatePreview();

  document.getElementById("resumeForm").addEventListener("input", updatePreview);
  document.getElementById("saveDraft").onclick = saveDraft;
  document.getElementById("loadDraft").onclick = loadDraft;
  document.getElementById("matchJob").onclick = matchJob;
  document.getElementById("exportPdf").onclick = exportPDF;
});
