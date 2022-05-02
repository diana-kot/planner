import "regenerator-runtime/runtime";
import App from "./components/App";
import Person from "./components/Person";


App.render()(
  async () => {
    await App.render();
    Person.eventListener();
   
  }
)();
