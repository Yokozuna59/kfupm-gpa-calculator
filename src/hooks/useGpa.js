import { calculateGPA, calculateTotalHours } from "../utils";

export function useGpa(courses, currentGpa = 0, currentHours = 0) {
  let gpa = parseFloat(calculateGPA(courses));
  let totalHours = parseInt(calculateTotalHours(courses), 10);

  if (currentGpa && currentHours) {
    gpa = (
      (gpa * totalHours + parseFloat(currentGpa) * parseInt(currentHours, 10)) /
      (totalHours + parseInt(currentHours, 10))
    ).toFixed(3);

    totalHours += parseInt(currentHours, 10);
  }

  return {
    gpa,
    totalHours,
  };
}
