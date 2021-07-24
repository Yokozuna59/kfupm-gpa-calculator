import React from "react";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center">GPA Calculator</h1>
        <Form></Form>
      </div>
    );
  }
}

class GradeField extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    return (
      <div>
        <fieldset className="field">
          <label>Grade</label>
          <select
            name="grade"
            onChange={this.handleChange}
            data-key={this.props.dataKey}
          >
            <option value="">Letter grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </fieldset>

        <fieldset className="field">
          <label>Credits</label>
          <input
            name="hours"
            onChange={this.handleChange}
            data-key={this.props.dataKey}
            type="number"
          ></input>
        </fieldset>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
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
        <h2>GPA: {gpa >= 0 ? gpa : ""}</h2>
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
        <button onClick={() => this.addField()}>Add</button>
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
    totalHours += hours;
    totalPoints += getGradePoints(grade) * hours;
  });

  return (totalPoints / totalHours).toFixed(3);
}

export default App;
