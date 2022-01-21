import React from "react";
import { Box, Text, Center, VStack } from "@chakra-ui/layout";
import { Button, Heading, HStack } from "@chakra-ui/react";

import Course from "./Course";
import { calculateGPA, calculateTotalHours } from "../utils";

export default class Term extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleDeleteCourse(id) {
    this.props.handleDeleteCourse(this.props.id, id);
  }

  handleInputChange(event, id) {
    let fieldIndex;

    for (let i = 0; i < this.props.courses.length; i++) {
      const field = this.props.courses[i];
      if (id === field.id) {
        fieldIndex = i;
        break;
      }
    }

    const key = event.target.name;
    const field = { ...this.props.courses[fieldIndex] };

    field[key] = event.target.value;

    this.props.handleCourseChange(id, field);
  }

  render() {
    const gpa = calculateGPA(this.props.courses);
    const totalHours = calculateTotalHours(this.props.courses);

    return (
      <Box border="1px solid #333" py="9" my="6" maxW="960px" mx="auto">
        <Heading mb="8" textAlign="center">
          {this.props.title}
        </Heading>
        {this.props.courses.map((field) => (
          <Course
            grade={field.grade}
            hours={field.hours}
            key={field.id}
            id={field.id}
            handleInputChange={this.handleInputChange}
            deleteCourse={(courseId) =>
              this.props.deleteCourse(this.props.id, courseId)
            }
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
              <Button onClick={() => this.props.addCourse(this.props.id)}>
                Add Course
              </Button>
              <Button
                bgColor="tomato"
                onClick={() => this.props.deleteTerm(this.props.id)}
              >
                Delete Term
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    );
  }
}
