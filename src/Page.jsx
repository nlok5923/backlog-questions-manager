import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import {
  addLink,
  fetchLinks,
  deleteQuestion
} from "./service";
import {
  Container,
  Segment,
  Button,
  Grid,
  Header,
  Modal,
  Form,
  Icon,
} from "semantic-ui-react";

const App = () => {
  const [open, setOpen] = useState(false);
  const [linkInfo, setLinkInfo] = useState({ name: "", url: "" });
  const [links, setLinks] = useState([]);

  const ttStyle = {
      height: "auto",
      width: "100%",
      objectFit: "cover"
  }

  const saveLink = (e) => {
    setLinkInfo({ ...linkInfo, [e.target.name]: e.target.value });
  };

  const saveLinkToDB = async () => {
    if (linkInfo.name !== "" && linkInfo.url !== "") await addLink(linkInfo);
    fetchAvailaibleLinks();
    setOpen(false);
  };

  const fetchAvailaibleLinks = async () => {
    const Alllinks = await fetchLinks();
    console.log(Alllinks);
    setLinks(Alllinks);
  };

  const deleteit = (id) => deleteQuestion(id);

  useEffect(() => {
    fetchAvailaibleLinks();
  }, []);

  return (
    <>
      <div style={{ height: "100vh", margin: "0 20% 0 20%" }}>
        <Container textAlign="center">
          <img src="/images/tt.png" alt="time table" style={ttStyle} />
        </Container>
        <div>
          <Container>
            <Header as="h1" textAlign="center">
              All your class links
            </Header>
            <Segment>
              <Grid stackable columns={1} padded>
                <Grid.Column>
                  {links.map((link) => (
                    <div>
                    <Link to={{ pathname: link.url }} target="_blank">
                      <Button
                        fluid
                        style={{ marginTop: "15px", display:"inline" }}
                        content={link.name}
                        icon="linkify"
                        color="blue"
                        labelPosition="right"
                      />
                    </Link>
                    <Button color="red" icon="trash" onClick={() => deleteit(link.id)} /> 
                    </div>
                  ))}
                </Grid.Column>
              </Grid>
            </Segment>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
                  Icon
                  floated="right"
                  content="Add class Link"
                  color="green"
                  icon="add"
                />
              }
            >
              <Modal.Header>Question Information</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label> Enter question name </label>
                    <input
                      placeholder="Enter course name"
                      name="name"
                      onChange={(e) => saveLink(e)}
                    />
                    <label>Enter url </label>
                    <input
                      placeholder="Enter link"
                      name="url"
                      onChange={(e) => saveLink(e)}
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button Icon onClick={() => saveLinkToDB()} positive>
                  <Icon name="save" />
                  Save
                </Button>
              </Modal.Actions>
            </Modal>
          </Container>
        </div>
      </div>
    </>
  );
};

export default App;
