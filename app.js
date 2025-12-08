const resumeForm = document.getElementById("resumeForm");
const resumePreview = document.getElementById("resumePreview");

// Update preview with animation
function updatePreview() {
  const name = document.getElementById("name").value || "Your Name";
  const title = document.getElementById("title").value || "Your Job Title";
  const summary = document.getElementById("summary").value || "Professional summary here.";
  const skills = document.getElementById("skills").value.split(",").map(s => s.trim()).filter(Boolean);
  const education = document.getElementById("education").value || "Education here";
  const certificates = document.getElementById("certificates").value || "Certificates here";
  const languages = document.getElementById("languages").value || "Languages here";

  let skillHTML = "";
  skills.forEach((s,i) => {
    skillHTML += `<span class="badge" style="animation-delay:${i*0.1}s">${s}</span>`;
  });

  resumePreview.innerHTML = `
    <h2>${name} — ${title}</h2>
    <h3>Summary</h3><p>${summary}</p>
    <h3>Skills</h3>${skillHTML}
    <h3>Education</h3><p>${education}</p>
    <h3>Certificates</h3><p>${certificates}</p>
    <h3>Languages</h3><p>${languages}</p>
  `;
}

// Save/load draft
function saveDraft() {
  const data = {};
  ["name","title","summary","skills","education","certificates","languages","jobDesc"].forEach(id => {
    data[id] = document.getElementById(id).value;
  });
  localStorage.setItem("resumeDraft", JSON.stringify(data));
  alert("Draft saved!");
}

function loadDraft() {
  const data = JSON.parse(localStorage.getItem("resumeDraft"));
  if(!data){ alert("No draft found!"); return; }
  Object.keys(data).forEach(id => { document.getElementById(id).value = data[id]; });
  updatePreview();
}

// Job match
function matchJob() {
  const jobDesc = document.getElementById("jobDesc").value.toLowerCase();
  const text = Object.values({
    name: document.getElementById("name").value,
    title: document.getElementById("title").value,
    summary: document.getElementById("summary").value,
    skills: document.getElementById("skills").value,
    education: document.getElementById("education").value,
    certificates: document.getElementById("certificates").value,
    languages: document.getElementById("languages").value
  }).join(" ").toLowerCase();
  
  const words = jobDesc.split(/\s+/).filter(Boolean);
  let matched = words.filter(w=>text.includes(w)).length;
  alert(`Job match: ${Math.round((matched/words.length)*100)}%`);
}

// Export PDF
function exportPdf() {
  html2canvas(resumePreview).then(canvas=>{
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height*pdfWidth)/imgProps.width;
    pdf.addImage(imgData,"PNG",0,0,pdfWidth,pdfHeight);
    pdf.save("resume.pdf");
  });
}

// Export DOCX
function exportDocx() {
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                 "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                 "xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title></head><body>";
  const footer = "</body></html>";
  const content = header+resumePreview.innerHTML+footer;
  const blob = new Blob(['\ufeff', content],{type:'application/msword'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "resume.docx";
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// Event listeners
resumeForm.addEventListener("input", updatePreview);
document.getElementById("saveDraft").addEventListener("click", saveDraft);
document.getElementById("loadDraft").addEventListener("click", loadDraft);
document.getElementById("matchJob").addEventListener("click", matchJob);
document.getElementById("exportPdf").addEventListener("click", exportPdf);
document.getElementById("exportDocx").addEventListener("click", exportDocx);

// Initial preview
updatePreview();

// ------------------------
// Background particles
// ------------------------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*4+1,
    dx: (Math.random()-0.5)*1,
    dy: (Math.random()-0.5)*1
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x>canvas.width)p.x=0;
    if(p.x<0)p.x=canvas.width;
    if(p.y>canvas.height)p.y=0;
    if(p.y<0)p.y=canvas.height;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
