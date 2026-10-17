const gradeFor = (mark) => {
  if (mark >= 80) return { grade: "A+", point: 5.0 };
  if (mark >= 70) return { grade: "A", point: 4.0 };
  if (mark >= 60) return { grade: "A-", point: 3.5 };
  if (mark >= 50) return { grade: "B", point: 3.0 };
  if (mark >= 40) return { grade: "C", point: 2.0 };
  if (mark >= 33) return { grade: "D", point: 1.0 };
  return { grade: "F", point: 0.0 };
};

document.getElementById("resultForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.getElementById("error");
  const results = document.getElementById("results");
  error.textContent = "";
  results.innerHTML = "";

  const subjects = ["Bangla", "English", "Math", "Science", "Islam"];
  const marks = {};
  for (const subject of subjects) {
    const field = form.elements[subject];
    const value = Number(field.value);
    if (field.value === "" || !Number.isFinite(value) || value < 0 || value > 100) {
      error.textContent = "Please enter a mark between 0 and 100 for every subject.";
      return;
    }
    marks[subject] = value;
  }

  let totalPoints = 0;
  let failed = false;
  for (const subject of subjects) {
    const result = gradeFor(marks[subject]);
    totalPoints += result.point;
    if (result.grade === "F") failed = true;
    const row = document.createElement("div");
    row.className = "result";
    const name = document.createElement("span");
    name.textContent = subject;
    const grade = document.createElement("span");
    grade.className = "grade";
    grade.textContent = marks[subject] + " marks — Grade " + result.grade;
    row.append(name, grade);
    results.appendChild(row);
  }

  const total = subjects.reduce((sum, subject) => sum + marks[subject], 0);
  const summary = document.createElement("div");
  summary.className = "summary";
  summary.textContent = "Total: " + total + "/500 · Average: " + (total / subjects.length).toFixed(1) + "/100 · " + (failed ? "Result: Fail" : "Result: Pass");
  results.appendChild(summary);
});