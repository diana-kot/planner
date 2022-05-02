import "regenerator-runtime/runtime";
import App from "./components/App";
import Person from "./components/Person";

(async () => {
    await App.render();
    Person.eventListener();
    // Person.eventListenerButton();
    Person.eventListenerButtonPrev();
    Person.eventListenerButtonNext();

    

  }
)();
