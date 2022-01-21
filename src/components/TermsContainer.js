import React, { useState } from "react";

import { Box, Text, VStack } from "@chakra-ui/layout";

import { nanoid } from "nanoid";
import { Button } from "@chakra-ui/react";

import Term from "./Term";
import CurrentGradesField from "./CurrentGradesField";
import { useTerms } from "../hooks/useTerms";

export function TermsContainer() {
  const [currentGpa, setCurrentGpa] = useState(null);
  const [currentHours, setCurrentHours] = useState(null);
  const {
    terms,
    addTerm,
    deleteTerm,
    addCourse,
    deleteCourse,
    handleCourseChange,
  } = useTerms();

  return (
    <Box my="6" maxW="960px" mx="auto">
      {/* <CurrentGradesField
        onGpaChange={(e) => setCurrentGpa(e.target.value)}
        onHoursChange={(e) => setCurrentHours(e.target.value)}
      /> */}
      {terms.map((term, index) => (
        <Term
          title={"Term " + (index + 1)}
          key={term.id}
          id={term.id}
          courses={term.courses}
          deleteTerm={deleteTerm}
          addCourse={addCourse}
          deleteCourse={deleteCourse}
          handleCourseChange={(courseId, course) =>
            handleCourseChange(term.id, courseId, course)
          }
        />
      ))}
      <VStack shouldWrapChildren="true" border="1px solid #333" py="3">
        <Text fontSize="25" textAlign="center">
          Cumulative GPA: 0{/* {cumGPA >= 0 ? " " + cumGPA : ""} */}
        </Text>
        <Text fontSize="20">Total hours: {0}</Text>
        <Button onClick={() => addTerm()}>Add Term</Button>
      </VStack>
    </Box>
  );
}
