import { calculateGPA, calculateTotalHours } from "../utils";

export function useGpa(courses, currentGpa = 0, currentHours = 0) {
  let gpa = calculateGPA(courses);
  let totalHours = calculateTotalHours(courses);

  if (currentGpa && currentHours) {
    gpa = (
      (gpa * totalHours + parseFloat(gpa) * parseInt(currentHours)) /
      (totalHours + parseInt(currentHours))
    ).toFixed(3);

    totalHours += parseInt(currentHours);
  }

  return {
    gpa,
    totalHours,
  };
}
