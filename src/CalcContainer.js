import React from "react";

import { Box, Text, VStack } from "@chakra-ui/layout";
import Calculator from "./Calculator";
import { nanoid } from "nanoid";
import { Button } from "@chakra-ui/react";

class CalcContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [
        { id: nanoid(4), fields: [{ grade: "", hours: null, id: nanoid(4) }] },
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

  deleteTerm(id) {
    if (this.state.terms.length === 1) return;

    const filteredArray = this.state.terms.filter((elem) => elem.id !== id);
    this.setState({ terms: filteredArray });
  }

  addCourse(id) {
    let arrCopy = this.state.terms.slice();

    let index = 0;
    for (let i = 0; i < this.state.terms.length; i++) {
      const term = this.state.terms[i];
      if (term.id === id) {
        index = i;
        break;
      }
    }
    arrCopy[index].fields.push({ grade: "", hours: null, id: nanoid(4) });
    console.log(arrCopy);
    this.setState({
      terms: arrCopy,
    });
  }

  deleteCourse(termId, courseId) {
    let arrCopy = this.state.terms.slice();

    let index = 0;
    for (let i = 0; i < this.state.terms.length; i++) {
      const term = this.state.terms[i];
      if (term.id === termId) {
        index = i;
        break;
      }
    }

    if (arrCopy[index].fields.length === 1) return;

    arrCopy[index].fields = arrCopy[index].fields.filter((elem) => elem.id !== courseId);
    console.log(arrCopy);

    this.setState({
      terms: arrCopy,
    });
  }

  handleInputChange() {}

  render() {
    return (
      <Box my="6" maxW="960px" mx="auto">
        {this.state.terms.map((e, index) => (
          <Calculator
            title={"Term " + (index + 1)}
            key={e.id}
            id={e.id}
            fields={e.fields}
            deleteTerm={this.deleteTerm}
            handleAddCourse={(id) => this.addCourse(id)}
            handleDeleteCourse={(courseId) => this.deleteCourse(e.id, courseId)}
          />
        ))}
        <VStack>
          <Text fontSize="25" textAlign="center">
            Cumulative GPA:{" "}
          </Text>
          <Button onClick={() => this.addTerm()}>Add term</Button>
        </VStack>
      </Box>
    );
  }
}

export default CalcContainer;
