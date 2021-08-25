import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page from "./Page";

const App = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Page} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
