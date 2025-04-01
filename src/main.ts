import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Kurser</h1>
        
        <form id="addCourseForm">
            <label for="courseCode">Kurskod:</label>
            <input type="text" id="courseCode" required>

            <label for="courseName">Kursnamn:</label>
            <input type="text" id="courseName" required>

            <label for="courseProgression">Progression:</label>
            <select id="courseProgression" required>
                <option value="">Välj progression</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>

            <label for="courseSyllabus">Länk till kursplan:</label>
            <input type="url" id="courseSyllabus" required>

            <button type="submit">Lägg till kurs</button>
        </form>

        <h2>Min kurslista</h2>
        <ul id="courseList"></ul>
  </div>
`
interface Course {
  code: string;
  name: string;
  progression: "A" | "B" | "C";
  syllabus: string;
}

const mandatoryCourses: Course[] = [
  { code: "DT208G", name: "Programmering i TypeScript", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/" },
  { code: "DT207G", name: "Backend-baserad webbutveckling", progression: "B", syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/" }
];

function getCourses(): Course[] {
  const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
  
  const allCourses = [...mandatoryCourses, ...storedCourses].filter(
    (course, index, self) => index === self.findIndex(c => c.code === course.code)
  );

  return allCourses;
}

function saveCourses(courses: Course[]) {
  localStorage.setItem("courses", JSON.stringify(courses));
}

function printCourseDetails(course: Course): void {
  const courseList = document.getElementById("courseList");
  if (courseList) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${course.code} - ${course.name} - ${course.progression} <a href=${course.syllabus}" target="_blank">Kursplan</a>   
    `;
    courseList.appendChild(li);
  }
}

function printSavedCourses(): void {
  const courseList = document.getElementById("courseList");
  if(courseList) {
    courseList.innerHTML = "";
    getCourses().forEach(printCourseDetails);
  }
}

const courseForm = document.getElementById("addCourseForm") as HTMLFormElement;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const codeInput = document.getElementById("courseCode") as HTMLInputElement;
  const nameInput = document.getElementById("courseName") as HTMLInputElement;
  const progressionInput = document.getElementById("courseProgression") as HTMLInputElement;
  const syllabusInput = document.getElementById("courseSyllabus") as HTMLInputElement;

  const newCourse: Course = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionInput.value as "A" | "B" | "C",
    syllabus: syllabusInput.value,
   };

   const courses = getCourses();

   if (courses.some(course => course.code === newCourse.code)) {
    alert("Kurskoden måste vara unik!");
    return; 
  }

   courses.push(newCourse);
   saveCourses(courses);

   printSavedCourses();
   courseForm.reset();
})
printSavedCourses();