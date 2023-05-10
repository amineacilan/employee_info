import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyTable from "./MyTable";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FormCheck } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState();
  const [currency, setCurrency] = useState();
  const [pageType, setPageType] = useState("insert");
  const [formData, setFormData] = useState({}); // Employee class
  const [tableData, setTableData] = useState([]); // Employee List
  const titles = [
    "Name",
    "Surname",
    "E-mail",
    "Position",
    "Level of Position",
    "Country works for",
    "Salary",
    "Actions",
  ];
  const options = [
    { label: "Software Developer", value: "Developer" },
    { label: "System Analysts", value: "Analyst" },
    { label: "Network Administrators", value: "Network" },
    { label: "Database Administrators", value: "Database" },
    { label: "Computer Support Technicians", value: "Support" },
    { label: "Security Experts", value: "Security" },
    { label: "Project Managers", value: "PM" },
    { label: "Technology Consultants", value: "Consultants" },
  ];
  const currencies = ["₺", "€", "$"];
  const handleShow = () => {
    setShow(true);
    setPageType("insert");
  };

  const handleClose = () => setShow(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData((prevState) => [...prevState, formData]);
    setFormData({});
    setShow(false);
  };

  const handleEdit = () => {
    tableData[key] = formData;
    setShow(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="app">
      <h4 className="element">Welcome to Employee App</h4>
      <Button className="element" variant="primary" onClick={handleShow}>
        Add Employee
      </Button>
      {tableData.length == 0 ? (
        <Alert className="alert alert-warning" role="alert">
          No Data To Show
        </Alert>
      ) : (
        <MyTable
          head={titles.map((title) => title)}
          body={tableData.map((data, key) => [
            data.name,
            data.surname,
            data.email + `@gmail.com`,
            data.position,
            data.positionLevel,
            data.country,
            data.salary + ".000 " + currency,
            [
              <FontAwesomeIcon
                icon={faUserPen}
                className="auto"
                onClick={() => {
                  setFormData(data);
                  setKey(key);
                  setShow(true);
                  setPageType("edit");
                }}
              />,
              <FontAwesomeIcon
                icon={faTrash}
                className="auto"
                onClick={() => {
                  const tmpUsers = [...tableData];
                  tmpUsers.splice(key, 1);
                  setTableData(tmpUsers);
                }}
              />,
            ],
          ])}
        ></MyTable>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton>
          {pageType == "insert" ? (
            <Modal.Title>Insert Employee</Modal.Title>
          ) : (
            <Modal.Title>EDIT Employee</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {pageType == "insert" ? (
            <p>
              Welcome to the page of insert employee information. Please fill in
              the fields below.
            </p>
          ) : (
            <p>Please update the fields you want to change</p>
          )}

          <Form>
            <Row className="g-2">
              <Col md>
                <br />
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </Col>
              <Col md>
                <br />
                <Form.Control
                  type="text"
                  name="surname"
                  value={formData.surname || ""}
                  onChange={handleChange}
                  placeholder="Surname"
                />
              </Col>
            </Row>
            <Form.Group className="g-2">
              <br />
              <InputGroup className="g-2">
                <Form.Control
                  placeholder="Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
              </InputGroup>

              <br />
              <Row className="g-2">
                <Col md>
                  <Form.Label>Position:</Form.Label>
                  <Form.Select
                    name="position"
                    value={formData.position || ""}
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md>
                  <Form.Label>Level of Position:</Form.Label>
                  <Form.Select
                    name="positionLevel"
                    value={formData.positionLevel || ""}
                    onChange={handleChange}
                  >
                    <option value="Trainee">Trainee</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="TeamLead">Team Lead</option>
                    <option value="Director">Director</option>
                    <option value="Maneger">Maneger</option>
                    <option value="CEO">CEO</option>
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Row className="g-2">
                <Col md>
                  <Form.Label>Country works for:</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  >
                    <option value="Turkey">Turkey</option>
                    <option value="Germany">Germany</option>
                    <option value="Fransa">Fransa</option>
                  </Form.Select>
                </Col>
                <Col md>
                  <Form.Label>Salary:</Form.Label>
                  <InputGroup className="mb-3" size="sm">
                    <Form.Control
                      aria-label="Amount (to the nearest dollar)"
                      name="salary"
                      value={formData.salary || ""}
                      onChange={handleChange}
                    />
                    <InputGroup.Text>.000</InputGroup.Text>
                  </InputGroup>
                  <div>
                    {currencies.map((currency) => (
                      <Form.Check
                        reverse
                        inline
                        type="checkbox"
                        label={currency}
                        onClick={() => {
                          setCurrency(currency);
                        }}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {pageType == "insert" ? (
            <Button variant="primary" onClick={handleSubmit}>
              INSERT
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleEdit()}>
              SAVE
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
