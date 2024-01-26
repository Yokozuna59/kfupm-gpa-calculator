import React, { useState } from "react";
import { Box, Text, Center, VStack, Flex } from "@chakra-ui/layout";
import { Button, Heading, HStack, Input } from "@chakra-ui/react";

import { Course } from "./Course";
import { useGpa } from "../hooks/useGpa";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

export function Term({
  id,
  title,
  courses,
  onCourseChange,
  onDeleteTerm,
  onAddCourse,
  onDeleteCourse,
}) {
  const { gpa, totalHours } = useGpa(courses);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [termTitle, setTermTitle] = useState(title);

  const toggleTitleField = () => setIsEditingTitle(!isEditingTitle);

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
    <Box
      maxW="960px"
      mx="auto"
      py="9"
      my="6"
      backgroundColor={"#2c323d"}
      rounded={"md"}
    >
      <Center>
        {isEditingTitle ? (
          <Input
            textAlign="center"
            w={"md"}
            value={termTitle}
            onBlur={toggleTitleField}
            onChange={(e) => setTermTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") toggleTitleField();
            }}
            autoFocus
          />
        ) : (
          <Flex justify={"center"} align={"center"}>
            <Heading mx={2}>{termTitle}</Heading>
            <EditIcon
              w={25}
              h={25}
              _hover={{ color: "#a1a1a1" }}
              onClick={toggleTitleField}
            />
          </Flex>
        )}
      </Center>

      {courses.map((field) => (
        <Course
          name={field.name}
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
            <Button rightIcon={<AddIcon />} onClick={() => onAddCourse(id)}>
              Add Course
            </Button>

            <Button
              bgColor="tomato"
              rightIcon={<DeleteIcon />}
              onClick={() => onDeleteTerm(id)}
            >
              Delete Term
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
}
