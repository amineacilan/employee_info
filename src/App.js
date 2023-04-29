import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData((prevState) => [...prevState, formData]);
    setFormData({});
    console.log(setFormData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>
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
          <Modal.Title>Insert Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Welcome to the page of insert employee information. Please fill in the
          fields below.
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
                    <option value="Developer">Software Developer</option>
                    <option value="Analyst">System Analysts</option>
                    <option value="Network">Network Administrators</option>
                    <option value="Database">Database Administrators</option>
                    <option value="Support">
                      Computer Support Technicians
                    </option>
                    <option value="Security">Security Experts</option>
                    <option value="PM">Project Managers</option>
                    <option value="Consultants">Technology Consultants</option>
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
                    <InputGroup.Text>.000 ₺</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

              {/*  <Form.Label>Email address</Form.Label> */}
              {/*  <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            INSERT
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>E-mail</th>
            <th>Position</th>
            <th>Level of Position</th>
            <th>Country works for</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.surname}</td>
              <td>{data.email}@gmail.com</td>
              <td>{data.position}</td>
              <td>{data.positionLevel}</td>
              <td>{data.country}</td>
              <td>{data.salary}.000 ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
