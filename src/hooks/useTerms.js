import { nanoid } from "nanoid";
import { useState } from "react";
import { calculateGPA, calculateTotalHours } from "../utils";

export function useTerms() {
  const [terms, setTerms] = useState([
    {
      id: nanoid(4),
      courses: [{ grade: "", hours: null, id: nanoid(4) }],
    },
  ]);

  const addTerm = () => {
    setTerms([
      ...terms,
      {
        id: nanoid(4),
        courses: [{ grade: "", hours: null, id: nanoid(4) }],
      },
    ]);
  };
  const deleteTerm = (termId) => {
    if (terms.length === 1) return;

    const filteredTerms = terms.filter((term) => term.id !== termId);
    setTerms(filteredTerms);
  };

  const addCourse = (termId) => {
    const termsCopy = terms.slice(0);
    const targetTermIndex = terms.findIndex((term) => term.id === termId);
    const targetTerm = terms[targetTermIndex];
    // const termCourses = targetTerm.courses;

    termsCopy[targetTermIndex] = {
      id: targetTerm.id,
      courses: [
        ...targetTerm.courses,
        { grade: "", hours: null, id: nanoid(4) },
      ],
    };

    setTerms(termsCopy);
  };
  const deleteCourse = (termId, courseId) => {
    const termsCopy = terms.slice(0);
    const targetTermIndex = terms.findIndex((term) => term.id === termId);
    const targetTerm = terms[targetTermIndex];

    if (targetTerm.courses.length === 1) return;

    termsCopy[targetTermIndex] = {
      id: targetTerm.id,
      courses: targetTerm.courses.filter((course) => course.id !== courseId),
    };
    setTerms(termsCopy);
  };

  // This needs refactoring..
  const handleCourseChange = (termId, courseId, field) => {
    const termsCopy = terms.slice(0);
    const targetTermIndex = terms.findIndex((term) => term.id === termId);
    const targetTerm = termsCopy[targetTermIndex];

    targetTerm.courses.forEach((course, index) => {
      if (course.id === courseId) {
        targetTerm.courses[index] = field;
      }
    });
    setTerms(termsCopy);
  };

  return {
    terms,
    addTerm,
    deleteTerm,
    addCourse,
    deleteCourse,
    handleCourseChange,
  };
}

export function useTermData(courses) {
  const gpa = calculateGPA(courses);
  const totalHours = calculateTotalHours(courses);

  return {
    gpa,
    totalHours,
  };
}
