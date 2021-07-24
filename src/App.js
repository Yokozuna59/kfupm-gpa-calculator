import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>GPA Calculator</h1>
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
      <fieldset>
        <input
          placeholder="Letter grade 'eg A+' "
          name="grade"
          onChange={this.handleChange}
          data-key={this.props.dataKey}
        ></input>
        <input
          placeholder="Hours"
          name="hours"
          onChange={this.handleChange}
          data-key={this.props.dataKey}
        ></input>
      </fieldset>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        {
          grade: "A",
          hours: 3,
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  addField() {
    this.setState({
      gpa: null,
      fields: [
        ...this.state.fields,
        {
          grade: "",
          hours: 3,
        },
      ],
    });
  }

  handleChange(e) {
    const key = e.target.name;
    const index = e.target.attributes[2].value;

    const fields = [...this.state.fields];
    const field = { ...fields[index] };

    field[key] = e.target.value;

    fields[index] = field;

    this.setState({ fields });
  }

  handleClick() {
    this.setState({
      gpa: calculateGPA(this.state.fields),
    });
  }

  render() {
    return (
      <div>
        <form>
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
        <button onClick={() => this.handleClick()}>Calculate</button>
        <br></br>
        <button onClick={() => this.addField()}>Add</button>
        <h2>GPA: {this.state.gpa}</h2>
      </div>
    );
  }
}

function getGradePoints(letterGrade) {
  const myDict = {
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

  return myDict[letterGrade];
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
