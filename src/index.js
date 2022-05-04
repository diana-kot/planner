import "regenerator-runtime/runtime";
import App from "./components/App";
import Person from "./components/Person";
import Backlog from "./components/Backlog";

(async () => {
  await App.render();

  //Person.eventListenerButton();
  Person.eventListenerButtonPrev();
  Person.eventListenerButtonNext();

  Person.dragoverPersonTask();
  Person.dropPersonTask();
  Person.dragenterTasks();
  Person.dragleaveTasks();

  //Person.dragendTasksPerson()

  // Person.dragstartTasks();

  //Backlog.dragoverTasks();
  Backlog.eventListenerSearch();
  //Backlog.dragstartBaclogTasks();
  // Backlog.dragendTasks();
  Backlog.dropBacklogTask();

  Backlog.serchButton();

  App.drop();
  App.dragleave();
  App.dragenter();
  App.dragover();
  App.dragend();
  App.dragstart();
  App.drag();
})();
