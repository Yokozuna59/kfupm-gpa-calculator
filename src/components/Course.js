import React from "react";
import { Select, Flex, Input, Button } from "@chakra-ui/react";

const letterGrades = ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

export function Course({ id, handleInputChange, onDeleteCourse }) {
  return (
    <Flex mx="4" my="4">
      <Input placeholder="Course" width="30%" my="2" mx="2"></Input>
      <Select
        name="grade"
        onChange={handleInputChange}
        placeholder="Grade"
        w="30%"
        my="2"
        mx="2"
      >
        {letterGrades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </Select>

      <Select
        name="hours"
        onChange={handleInputChange}
        placeholder="Credits"
        w="30%"
        my="2"
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </Select>

      <Button
        mx="2"
        my="2"
        px="3"
        size="sx"
        bgColor="tomato"
        color="white"
        onClick={() => onDeleteCourse(id)}
      >
        X
      </Button>
    </Flex>
  );
}
