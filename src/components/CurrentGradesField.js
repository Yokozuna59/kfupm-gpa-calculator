import {
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
  Box,
} from "@chakra-ui/react";

function CurrentGradesField(props) {
  return (
    <Flex justifyContent="center" wrap="wrap" my="2" textAlign="center">
      <Box m="1">
        <Text mb="2" fontSize="16">
          Current GPA:
        </Text>
        <NumberInput
          min={0}
          max={4}
          step={0.1}
          name="gpa"
          onChange={(e) => props.handleCurrentGpaChange(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box m="1">
        <Text mb="2">Hours completed:</Text>
        <NumberInput
          min={1}
          max={150}
          name="hours"
          placeholder="Hours completed"
          onChange={(e) => props.handleCurrentHoursChange(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
}

export default CurrentGradesField;
