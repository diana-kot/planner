import "regenerator-runtime/runtime";
import App from "./components/App";
import Person from "./components/Person";
import Backlog from "./components/Backlog";

(async () => {
  await App.render();

  //Person.eventListenerButton();
  Person.eventListenerButtonPrev();
  Person.eventListenerButtonNext();



 
  Backlog.eventListenerSearch();

  App.dragItems();
  App.dragZoneBaclog();
  App.dragZoneTask();
  
})();
