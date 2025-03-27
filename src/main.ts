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