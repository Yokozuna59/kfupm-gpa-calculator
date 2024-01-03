import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const emptyCourse = { grade: "", hours: null, id: nanoid(4) }

// TODO: This should be split into two hooks
export function useTerms() {
  const [terms, setTerms] = useState(() => {
    const savedTerms = localStorage.getItem('terms');
    return savedTerms ? JSON.parse(savedTerms) : [{
      id: nanoid(4),
      courses: [emptyCourse],
    }];
  });
  const allCourses = terms.map((term) => term.courses).flat();

  useEffect(() => {
    localStorage.setItem('terms', JSON.stringify(terms));
  }, [terms]);

  const addTerm = () => {
    setTerms([
      ...terms,
      {
        id: nanoid(4),
        courses: [emptyCourse],
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
        emptyCourse,
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
    allCourses,
    addTerm,
    deleteTerm,
    addCourse,
    deleteCourse,
    handleCourseChange,
  };
}
