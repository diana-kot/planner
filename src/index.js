import "regenerator-runtime/runtime";
import App from "./components/App";
import Person from "./components/Person";
import Backlog from "./components/Backlog";

(async () => {
  await App.render();
  Person.dragoverPersonTask();
  Person.dropPersonTask();
   Person.dragenterTasks();
  Person.dragleaveTasks();

  

  

  Person.dragstartTasks();
  Person.eventListenerButton();
  Person.eventListenerButtonPrev();
  Person.eventListenerButtonNext();

  Backlog.eventListenerSearch();
  Backlog.dragstartBaclogTasks();
  Backlog.dragendTasks();
  Backlog.dropBacklogTask();

  // Backlog.drop()
  // Backlog.dragleave()
  // Backlog.dragenter()
  // Backlog.dragover()
  // Backlog.dragend()
  // Backlog.dragstart()
  // Backlog.drag()


})();
