import React from "react";
import { Box, Text, Center, VStack } from "@chakra-ui/layout";
import { Button, Heading, HStack } from "@chakra-ui/react";

import { Course } from "./Course";
import { useTermData } from "../hooks/useTerms";

export function Term({
  id,
  title,
  courses,
  onCourseChange,
  onDeleteTerm,
  onAddCourse,
  onDeleteCourse,
}) {
  const { gpa, totalHours } = useTermData(courses);

  // TODO: This really needs refactoring
  const handleInputChange = (event, id) => {
    let fieldIndex;

    for (let i = 0; i < courses.length; i++) {
      const field = courses[i];
      if (id === field.id) {
        fieldIndex = i;
        break;
      }
    }

    const key = event.target.name;
    const field = { ...courses[fieldIndex] };
    field[key] = event.target.value;

    onCourseChange(id, field);
  };

  return (
    <Box border="1px solid #333" py="9" my="6" maxW="960px" mx="auto">
      <Heading mb="8" textAlign="center">
        {title}
      </Heading>
      {courses.map((field) => (
        <Course
          grade={field.grade}
          hours={field.hours}
          key={field.id}
          id={field.id}
          handleInputChange={handleInputChange}
          onDeleteCourse={(courseId) => onDeleteCourse(id, courseId)}
        />
      ))}
      <Center textAlign="center">
        <VStack>
          <Box fontSize="3xl">
            Term GPA:
            <Text as="span" fontWeight="bold">
              {gpa >= 0 ? " " + gpa : ""}
            </Text>
          </Box>
          <Text fontSize="20">Term hours: {totalHours}</Text>
          <HStack>
            <Button onClick={() => onAddCourse(id)}>Add Course</Button>
            <Button bgColor="tomato" onClick={() => onDeleteTerm(id)}>
              Delete Term
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
}
