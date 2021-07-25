import { Text, Link } from "@chakra-ui/layout";

function Footer(props) {
  return (
    <footer>
      <Text mb="4" textAlign="center">
        Made with React.js 🌟 by{" "}
        <Link color="blue.300" href="https://github.com/mrbasel">
          Basel
        </Link>{" "}
        |
        <Link
          color="blue.300"
          href="https://github.com/mrbasel/react-gpa-calculator"
        >
          {" "}
          Source code
        </Link>
      </Text>
    </footer>
  );
}

export default Footer;
