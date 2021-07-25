import React from "react";

class GradeField extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const creditOptions = [];
    creditOptions[0] = <option key="0">---</option>;

    for (let i = 1; i < 11; i++) {
      creditOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <div className="flex">
        <fieldset className="field">
          <label>Grade</label>
          <select
            name="grade"
            onChange={this.handleChange}
            data-key={this.props.dataKey}
          >
            <option value="">---</option>
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
          <select
            name="hours"
            onChange={this.handleChange}
            data-key={this.props.dataKey}
          >
            {creditOptions}
          </select>
        </fieldset>
      </div>
    );
  }
}

export default GradeField;
