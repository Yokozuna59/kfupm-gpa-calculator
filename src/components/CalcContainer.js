import React from "react";

import { Box, Text, VStack } from "@chakra-ui/layout";

import { nanoid } from "nanoid";
import { Button } from "@chakra-ui/react";

import Calculator from "./Calculator";
import CurrentGradesField from "./CurrentGradesField";
import { calculateGPA, calculateTotalHours, getTermIndex } from "../utils";

class CalcContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGrades: { gpa: null, hours: null },
      terms: [
        {
          id: nanoid(4),
          fields: [
            { grade: "", hours: null, id: nanoid(4) },
            { grade: "", hours: null, id: nanoid(4) },
            { grade: "", hours: null, id: nanoid(4) },
          ],
        },
      ],
    };

    this.deleteTerm = this.deleteTerm.bind(this);
  }

  addTerm() {
    this.setState({
      terms: [
        ...this.state.terms,
        { id: nanoid(4), fields: [{ grade: "", hours: null, id: nanoid(4) }] },
      ],
    });
  }

  deleteTerm(termId) {
    if (this.state.terms.length === 1) return;

    const filteredArray = this.state.terms.filter((elem) => elem.id !== termId);
    this.setState({ terms: filteredArray });
  }

  addCourse(termId) {
    const termsCopy = this.state.terms.slice();
    const termIndex = getTermIndex(this.state.terms, termId);

    termsCopy[termIndex].fields.push({ grade: "", hours: null, id: nanoid(4) });
    this.setState({
      terms: termsCopy,
    });
  }

  deleteCourse(termId, courseId) {
    const termsCopy = this.state.terms.slice();
    const termIndex = getTermIndex(this.state.terms, termId);

    if (termsCopy[termIndex].fields.length === 1) return;

    termsCopy[termIndex].fields = termsCopy[termIndex].fields.filter(
      (elem) => elem.id !== courseId
    );

    this.setState({
      terms: termsCopy,
    });
  }

  handleInputChange(termId, courseId, field) {
    const terms = this.state.terms.slice();
    const termIndex = getTermIndex(this.state.terms, termId);

    terms[termIndex].fields.forEach((e, index) => {
      if (e.id === courseId) {
        terms[termIndex].fields[index] = field;
      }
    });

    this.setState({
      terms: terms,
    });
  }

  handleCurrentGpaChange(gpa) {
    this.setState({
      currentGrades: { gpa: gpa, hours: this.state.currentGrades.hours },
    });
  }

  handleCurrentHoursChange(hours) {
    this.setState({
      currentGrades: { gpa: this.state.currentGrades.gpa, hours: hours },
    });
  }

  render() {
    const allFields = [];
    for (const term of this.state.terms) {
      for (const field of term.fields) {
        allFields.push(field);
      }
    }

    let cumGPA = calculateGPA(allFields);
    let totalHours = calculateTotalHours(allFields);

    if (this.state.currentGrades.hours && this.state.currentGrades.gpa) {
      cumGPA = (
        (cumGPA * totalHours +
          parseFloat(this.state.currentGrades.gpa) *
            parseInt(this.state.currentGrades.hours)) /
        (totalHours + parseInt(this.state.currentGrades.hours))
      ).toFixed(2);

      totalHours += parseInt(this.state.currentGrades.hours);
    }

    return (
      <Box my="6" maxW="960px" mx="auto">
        <CurrentGradesField
          handleCurrentGpaChange={(e) => this.handleCurrentGpaChange(e)}
          handleCurrentHoursChange={(e) => this.handleCurrentHoursChange(e)}
        />
        {this.state.terms.map((term, index) => (
          <Calculator
            title={"Term " + (index + 1)}
            key={term.id}
            id={term.id}
            fields={term.fields}
            deleteTerm={this.deleteTerm}
            handleAddCourse={(id) => this.addCourse(id)}
            handleDeleteCourse={(courseId) =>
              this.deleteCourse(term.id, courseId)
            }
            handleInputChange={(courseId, field) =>
              this.handleInputChange(term.id, courseId, field)
            }
          />
        ))}
        <VStack shouldWrapChildren="true" border="1px solid #333" py="3">
          <Text fontSize="25" textAlign="center">
            Cumulative GPA: {cumGPA >= 0 ? " " + cumGPA : ""}
          </Text>
          <Text fontSize="20">Total hours: {totalHours}</Text>
          <Button onClick={() => this.addTerm()}>Add Term</Button>
        </VStack>
      </Box>
    );
  }
}

export default CalcContainer;
