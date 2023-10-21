import React, { useState } from "react";
import "./UserDashboard.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

export const CreateTrip = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to a backend API
  };

  // For handling date
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // For handling time input
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // For handling number of seats
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };

  return (
    <div className="CreateTrip-wrapper">
      <div className="create-trip-container">
        <Form className="">
          <Row className="align-items-center px-3 py-3">
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInput">Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Date"
              />
            </Col>
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInputGroup">Time</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="inlineFormInputGroup"
                  type="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                />
              </InputGroup>
            </Col>
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInput">Seats</Form.Label>
              <Form.Control
                type="number"
                value={selectedNumber}
                onChange={handleNumberChange}
              />
            </Col>
            <Col xs="auto" className="px-3">
            <div className="UDB-btn">
                <button className="vvd"><span>Create Trip</span></button>
                </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="trip-table-container">
      <table id="table-trips">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
            <td>Row 2, Cell 3</td>
          </tr>
          <tr>
            <td>Row 3, Cell 1</td>
            <td>Row 3, Cell 2</td>
            <td>Row 3, Cell 3</td>
            <td>Row 3, Cell 3</td>
          </tr>
          <tr>
            <td>Row 4, Cell 1</td>
            <td>Row 4, Cell 2</td>
            <td>Row 4, Cell 3</td>
            <td>Row 4, Cell 3</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CreateTrip;
{
  /* <form onSubmit={handleSubmit} className="">
  <div className="date-container">
    <label htmlFor="date">Date: </label>
    <input
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      placeholder="Date"
    />
  </div>
  <div className="time-container">
    <label htmlFor="time">Enter Time</label>
    <input
      type="time"
      value={selectedTime}
      onChange={handleTimeChange}
    />
  </div>
  <div className="seats-wrapper">
    <label htmlFor="seats">Enter Seats available:</label>
    <input
      type="number"
      value={selectedNumber}
      onChange={handleNumberChange}
    />
  </div>
  <button type="submit">Add trip</button>
</form> */
}
