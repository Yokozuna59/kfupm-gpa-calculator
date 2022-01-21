import { calculateGPA, calculateTotalHours } from "../utils";

export function useGpa(courses, currentGpa = 0, currentHours = 0) {
  let gpa = calculateGPA(courses);
  let totalHours = calculateTotalHours(courses);

  if (currentGpa && currentHours) {
    gpa = (
      (gpa * totalHours +
        parseFloat(this.state.currentGrades.gpa) *
          parseInt(this.state.currentGrades.hours)) /
      (totalHours + parseInt(this.state.currentGrades.hours))
    ).toFixed(3);

    totalHours += parseInt(this.state.currentGrades.hours);
  }

  return {
    gpa,
    totalHours,
  };
}
