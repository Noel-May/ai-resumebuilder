// Helper function to get value by ID
function getValue(id) {
  return document.getElementById(id).value.trim();
}

// Update the live resume preview
function updatePreview() {
  const name = getValue("name") || "Your Name";
  const title = getValue("title") || "Your Job Title";
  const summary = getValue("summary") || "Your professional summary will appear here.";
  const skills = getValue("skills") || "Your skills will appear here";
  const education = getValue("education") || "Your education will appear here";
  const certificates = getValue("certificates") || "Your certificates will appear here";
  const languages = getValue("languages") || "Languages you speak will appear here";

  const previewHTML = `
    <h2>${name} — ${title}</h2>

    <h3><i class="fas fa-user-graduate"></i> Summary</h3>
    <p>${summary}</p>

    <h3><i class="fas fa-lightbulb"></i> Skills</h3>
    <p>${skills}</p>

    <h3><i class="fas fa-graduation-cap"></i> Education</h3>
    <p>${education}</p>

    <h3><i class="fas fa-certificate"></i> Certificates</h3>
    <p>${certificates}</p>

    <h3><i class="fas fa-language"></i> Languages</h3>
    <p>${languages}</p>
  `;

  document.getElementById("resumePreview").innerHTML = previewHTML;
}

// Save draft to localStorage
function saveDraft() {
  const data = {
    name: getValue("name"),
    title: getValue("title"),
    summary: getValue("summary"),
    skills: getValue("skills"),
    education: getValue("education"),
    certificates: getValue("certificates"),
    languages: getValue("languages"),
    jobDesc: getValue("jobDesc")
  };
  localStorage.setItem("resumeDraft", JSON.stringify(data));
  alert("✅ Draft saved locally!");
}

// Load draft from localStorage
function loadDraft() {
  const saved = localStorage.getItem("resumeDraft");
  if (!saved) { alert("❌ No saved draft found"); return; }
  const data = JSON.parse(saved);

  document.getElementById("name").value = data.name || "";
  document.getElementById("title").value = data.title || "";
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("skills").value = data.skills || "";
  document.getElementById("education").value = data.education || "";
  document.getElementById("certificates").value = data.certificates || "";
  document.getElementById("languages").value = data.languages || "";
  document.getElementById("jobDesc").value = data.jobDesc || "";

  updatePreview();
}

// Match Job Description (basic keyword match)
function matchJob() {
  const jobDesc = getValue("jobDesc").toLowerCase();
  const resumeText = `
    ${getValue("name")} ${getValue("title")} ${getValue("summary")} 
    ${getValue("skills")} ${getValue("education")} 
    ${getValue("certificates")} ${getValue("languages")}
  `.toLowerCase();

  const jobWords = jobDesc.split(/\s+/);
  let matched = 0;
  jobWords.forEach(word => {
    if (resumeText.includes(word)) matched++;
  });

  const matchPercentage = Math.min(100, Math.round((matched / jobWords.length) * 100));
  alert(`✅ Job match: ${matchPercentage}%`);
}

// Export preview to PDF
function exportPdf() {
  const preview = document.getElementById("resumePreview");
  html2canvas(preview).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  });
}

// Export preview to DOCX (basic)
function exportDocx() {
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                 "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                 "xmlns='http://www.w3.org/TR/REC-html40'>" +
                 "<head><meta charset='utf-8'><title>Resume</title></head><body>";
  const footer = "</body></html>";
  const content = header + document.getElementById("resumePreview").innerHTML + footer;

  const blob = new Blob(['\ufeff', content], {type: 'application/msword'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Event listeners
document.getElementById("resumeForm").addEventListener("input", updatePreview);
document.getElementById("saveDraft").addEventListener("click", saveDraft);
document.getElementById("loadDraft").addEventListener("click", loadDraft);
document.getElementById("matchJob").addEventListener("click", matchJob);
document.getElementById("exportPdf").addEventListener("click", exportPdf);
document.getElementById("exportDocx").addEventListener("click", exportDocx);

// Initial preview
updatePreview();
