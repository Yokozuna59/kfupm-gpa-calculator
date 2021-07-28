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

  render() {
    return (
      <Box my="6" maxW="960px" mx="auto">
        {this.state.terms.map((e, index) => (
          <Calculator
            title={"Term " + (index + 1)}
            key={e.id}
            id={e.id}
            deleteTerm={this.deleteTerm}
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
