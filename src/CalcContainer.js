import React from "react";

import { Box } from "@chakra-ui/layout";
import Calculator from "./Calculator";

class CalcContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termCount: 1,
    };
  }

  addTerm() {}

  deleteTerm() {}

  render() {
    return (
      <Box my="6" maxW="960px" mx="auto">
        {[...Array(this.state.termCount)].map((e, index) => (
          <Calculator title={"Term " + (index + 1)} />
        ))}
      </Box>
    );
  }
}

export default CalcContainer;
