import React from "react";
import { Box, Text, Center, VStack } from "@chakra-ui/layout";
import { Button, Heading, HStack } from "@chakra-ui/react";

import GradeField from "./GradeField";
import { calculateGPA, calculateTotalHours } from "./utils";

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDeleteTerm = this.handleDeleteTerm.bind(this);
  }

  handleDeleteCourse(id) {
    this.props.handleDeleteCourse(this.props.id, id);
  }

  handleDeleteTerm() {
    this.props.deleteTerm(this.props.id);
  }

  handleInputChange(event, id) {
    let fieldIndex;

    for (let i = 0; i < this.props.fields.length; i++) {
      const field = this.props.fields[i];
      if (id === field.id) {
        fieldIndex = i;
        break;
      }
    }

    const key = event.target.name;
    const field = { ...this.props.fields[fieldIndex] };

    field[key] = event.target.value;

    this.props.handleInputChange(id, field);
  }

  render() {
    const gpa = calculateGPA(this.props.fields);
    const totalHours = calculateTotalHours(this.props.fields);

    return (
      <Box border="1px solid #333" py="9" my="6" maxW="960px" mx="auto">
        <Heading mb="8" textAlign="center">
          {this.props.title}
        </Heading>
        {this.props.fields.map((field) => (
          <GradeField
            grade={field.grade}
            hours={field.hours}
            key={field.id}
            id={field.id}
            handleInputChange={this.handleInputChange}
            deleteField={this.props.handleDeleteCourse}
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
              <Button onClick={() => this.props.handleAddCourse(this.props.id)}>
                Add course
              </Button>
              <Button bgColor="tomato" onClick={() => this.handleDeleteTerm()}>
                Delete Term
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    );
  }
}

export default Calculator;
