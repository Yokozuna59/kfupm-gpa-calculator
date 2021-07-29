function getGradePoints(letterGrade) {
  const letterGrades = {
    "A+": 4,
    A: 3.75,
    "B+": 3.5,
    B: 3,
    "C+": 2.5,
    C: 2,
    "D+": 1.5,
    D: 1,
    F: 0,
  };
  return letterGrades[letterGrade.toUpperCase()];
}

function calculateTotalHours(arr) {
  let totalHours = 0;
  arr.forEach((elem) => {
    if (elem.hours) totalHours += parseInt(elem.hours);
  });
  return totalHours;
}

function calculateGPA(arr) {
  let totalHours = 0;
  let totalPoints = 0;

  arr.forEach((i) => {
    const hours = parseInt(i.hours);
    const grade = i.grade;

    if (hours && grade) {
      totalHours += hours;
      totalPoints += getGradePoints(grade) * hours;
    }
  });

  return (totalPoints / totalHours).toFixed(3);
}

function getTermIndex(terms, targetId) {
  let found = false;
  let index = 0;
  while (!found) {
    if (terms[index].id === targetId) found = true;
    else index++;
  }

  return index;
}

module.exports = {
  calculateGPA,
  calculateTotalHours,
  getTermIndex,
};
