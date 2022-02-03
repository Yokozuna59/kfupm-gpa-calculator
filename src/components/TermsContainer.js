import React, { useState } from "react";

import { Box, Text, VStack } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/react";

import { Term } from "./Term";
import CurrentGradesField from "./CurrentGradesField";
import { useTerms } from "../hooks/useTerms";
import { useGpa } from "../hooks/useGpa";

export function TermsContainer() {
  const [currentGpa, setCurrentGpa] = useState(null);
  const [currentHours, setCurrentHours] = useState(null);
  const {
    terms,
    allCourses,
    addTerm,
    deleteTerm,
    addCourse,
    deleteCourse,
    handleCourseChange,
  } = useTerms();
  const { gpa: cumulativeGpa, totalHours } = useGpa(
    allCourses,
    currentGpa,
    currentHours
  );

  return (
    <Box my="6" maxW="960px" mx="auto">
      <CurrentGradesField
        onGpaChange={setCurrentGpa}
        onHoursChange={setCurrentHours}
      />
      {terms.map((term, index) => (
        // TODO: Use context to avoid prop drilling
        <Term
          title={"Term " + (index + 1)}
          key={term.id}
          id={term.id}
          courses={term.courses}
          onDeleteTerm={deleteTerm}
          onAddCourse={addCourse}
          onDeleteCourse={deleteCourse}
          onCourseChange={(courseId, course) =>
            handleCourseChange(term.id, courseId, course)
          }
        />
      ))}
      <VStack shouldWrapChildren="true" border="1px solid #333" py="3">
        <Text fontSize="25" textAlign="center">
          Cumulative GPA: {cumulativeGpa >= 0 ? " " + cumulativeGpa : ""}
        </Text>
        <Text fontSize="20">Total hours: {totalHours}</Text>
        <Button onClick={() => addTerm()}>Add Term</Button>
      </VStack>
    </Box>
  );
}
