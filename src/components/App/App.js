import Person from "../Person";
import Backlog from "../Backlog";

import "./App.scss";
import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";


class App {
  async render() {

      // запрос к api
      const persons = await getDataApi.getData(API_URL + URL_PERSON);

      // запрос к api tasks
      const tasks = await getDataApi.getData(API_URL + URL_TASK);

      Person.setPersons(persons)

      let backlogTasks = []
      let presonTasks = []
      tasks.forEach(task => {
        //console.log(task.executor)
        if (task.executor==null)
          backlogTasks.push(task)
        else
          presonTasks.push(task)
      });
      console.log(`presonTasks = ${presonTasks.length}`)
      console.log(`backlogTasks = ${backlogTasks.length}`)
      Backlog.setTasks(backlogTasks)
      Person.setTasks(presonTasks)


    
    await Person.render();
    await Backlog.render();	
  }
}

export default new App();
