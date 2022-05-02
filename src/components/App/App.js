import Person from "../Person";
import Backlog from "../Backlog";
import "./App.scss";

class App {
  async render() {
    await Person.render();
    await Backlog.render();	
  }
}

export default new App();
