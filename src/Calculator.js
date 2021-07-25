import React from "react";

import GradeField from "./GradeField";

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        {
          grade: "",
          hours: null,
        },
        {
          grade: "",
          hours: null,
        },
        {
          grade: "",
          hours: null,
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  addField() {
    this.setState({
      fields: [
        ...this.state.fields,
        {
          grade: "",
          hours: null,
        },
      ],
    });
  }

  handleChange(e) {
    const key = e.target.name;
    const index = e.target.attributes[1].value;

    const fields = [...this.state.fields];
    const field = { ...fields[index] };

    field[key] = e.target.value;

    fields[index] = field;

    this.setState({ fields });
  }

  render() {
    let gpa = calculateGPA(this.state.fields);

    return (
      <div>
        <form className="">
          {this.state.fields.map((field, k) => (
            <GradeField
              grade={field.grade}
              hours={field.hours}
              key={k}
              dataKey={k}
              handleChange={this.handleChange}
            />
          ))}
        </form>
        <button onClick={() => this.addField()}>Add course</button>
        <h2>GPA: {gpa >= 0 ? gpa : ""}</h2>
      </div>
    );
  }
}

function getGradePoints(letterGrade) {
  const letterGrades = {
    "A+": 4,
    A: 3.75,
    "B+": 3.5,
    B: 3,
    "C+": 2.5,
    C: 2,
    "D+": 1.5,
    D: 1,
    F: 0,
  };
  return letterGrades[letterGrade.toUpperCase()];
}

function calculateGPA(arr) {
  let totalHours = 0;
  let totalPoints = 0;

  arr.forEach((i) => {
    const hours = parseInt(i.hours);
    const grade = i.grade;

    if (hours && grade) {
      totalHours += hours;
      totalPoints += getGradePoints(grade) * hours;
    }
  });

  return (totalPoints / totalHours).toFixed(3);
}

export default Calculator;
