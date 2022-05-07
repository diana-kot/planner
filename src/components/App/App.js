import Person from "../Person";
import Backlog from "../Backlog";


import "./App.scss";
import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";

class App {
  constructor(dragged) {
    this.dragged = dragged;
  }

  dragItems() {
    const backlogItems = document.querySelectorAll(".backlog__item");

    backlogItems.forEach((el) => {
      el.addEventListener("dragstart", this.dragstart);
      el.addEventListener("dragend", this.dragend);
      el.addEventListener("drag", this.dragend);
    });
  }

  dragZoneBaclog() {
    const dropZoneBaclog = document.querySelectorAll(".backlog__items");
    dropZoneBaclog.forEach((el) => {
      el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      el.addEventListener("drop", this.drop);
    });
  }

  dragZoneTask() {
    const dropZoneTask = document.querySelectorAll(".person__task");

    dropZoneTask.forEach((el) => {
      el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      el.addEventListener("drop", this.drop);
    });
  }

  dragZoneName() {
    const dropZoneName = document.querySelectorAll(".person__name");

    dropZoneName.forEach((el) => {
      el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      el.addEventListener("drop", this.drop);
    });
  }

  dragstart() {
    document.addEventListener(
      "dragstart",
      (evt) => {
        this.dragged = evt.target;
        evt.dataTransfer.setData("dragItem", this.dataset.item);
        evt.dataTransfer.setData("name", this.dataset.name);
        evt.target.classList.add("selected");
      },
      false
    );
  }

  dragend() {
    document.addEventListener(
      "dragend",
      (evt) => {
        evt.preventDefault();
        
      },
      false
    );
  }

  drag() {
    document.addEventListener("drag", (evt) => {}, false);
  }

  dragenter() {
    document.addEventListener(
      "dragenter",
      (evt) => {
        evt.preventDefault();
        if (evt.target.className === "person__task" || evt.target.className === "person__name") {
          evt.target.classList.add("hovered");
        }
      },
      false
    );
  }

  dragleave() {
    document.addEventListener(
      "dragleave",
      (evt) => {
        evt.preventDefault();
        evt.target.classList.remove("hovered");
      },
      false
    );
  }

  dragover() {
    document.addEventListener(
      "dragover",
      (evt) => {
        evt.preventDefault();
      },
      false
    );
  }

  // convertToTask(context, dragItem){
  //   let task={
  //   "subject": dragItem.getAttribute("data-item"),
  //   "executor": context.getAttribute("data-person-id"),
  //   "planStartDate": context.getAttribute("data-person-date"),
  //   "planEndDate": context.getAttribute("data-person-date")
  //   }
  //   console.log(task);
  //   return task;
  // }

  drop() {
    document.addEventListener(
      "drop",
      (evt) => {
        evt.target.classList.remove("hovered");
        const dragFlag = evt.dataTransfer.getData("dragItem");
        const dragItem = document.querySelector(`[data-item="${dragFlag}"]`);

        evt.dataTransfer.setData("name", evt.target.dataset.name);

        const dragTitle = dragItem.querySelector(".backlog__name");
        // const dragText = dragItem.querySelector(".backlog__text");

        if (evt.target.className === "person__name") {
          console.log("Зашел сюда 3");
        
         const dataStart = dragItem.getAttribute("data-start-date");
         const dataEnd = dragItem.getAttribute("data-end-date");
         const dataExecutor = evt.target.getAttribute("data-person-id");
        //  Person.setTask(convertToTask(dragItem));

          dragItem.classList.add("backlog__box_selected");
          dragTitle.classList.add("block");
          // dragText.classList.add("hide");
          dragItem.classList.remove("selected");
     
          let task={
            "subject": dragItem.getAttribute("data-item"),
            "executor": evt.target.getAttribute("data-person-id"),
            "planStartDate": dragItem.getAttribute("data-start-date"),
            "planEndDate": dragItem.getAttribute("data-end-date")
            }
          Person.setTask(task);
          console.log(dataExecutor);

          evt.target.append(dragItem);

          Person.render();

          return;

        } else if (evt.target.className === "person__task") {

          console.log("Зашел сюда 1");
          
          const dataStart = dragItem.getAttribute("data-start-date");
          const dataEnd = dragItem.getAttribute("data-end-date");
          const dataExecutor = evt.target.getAttribute("data-person-id")
          const currentDate = evt.target.getAttribute("data-person-date");
          
          let task={

            "subject": dragItem.getAttribute("data-item"),
            "executor": evt.target.getAttribute("data-person-id"),
            "planStartDate": evt.target.getAttribute("data-person-date"),
            "planEndDate": evt.target.getAttribute("data-person-date")
            }
          Person.setTask(task);
          // dragItem.parentNode.removeChild(dragItem);
          dragItem.classList.add("backlog__box_selected");
          dragTitle.classList.add("block");
          // dragText.classList.add("hide");
          dragItem.classList.remove("selected");


          // console.log(dataExecutor);
          console.log(task); 
          // console.log(evt.target); 
          evt.target.append(dragItem);

          return;
          // this.appendChild(dragItem);
        } else if (evt.target.className === "backlog__items") {
          console.log("Зашел сюда 2");
          
          dragItem.parentNode.removeChild(dragItem);

          dragItem.classList.remove("backlog__box_selected");
          dragTitle.classList.remove("block");
          // dragText.classList.remove("hide");
          dragItem.classList.remove("selected");
        
          const dataStart = dragItem.getAttribute("data-start-date");
          const dataEnd = dragItem.getAttribute("data-end-date");
          const dataExecutor = dragItem.getAttribute("data-executor")
     
          // console.log(this); 
          // console.log(evt.target); 
          this.appendChild(dragItem);
          return;

        }
      },
      false
    );
  }

 async render() {
    // запрос к api
    const persons = await getDataApi.getData(API_URL + URL_PERSON);

    // запрос к api tasks
    const tasks = await getDataApi.getData(API_URL + URL_TASK);

    Person.setPersons(persons);

    let backlogTasks = [];
    let presonTasks = [];
    tasks.forEach((task) => {
      if (task.executor == null) {
        backlogTasks.push(task);
      } else {
        presonTasks.push(task);
      }
    });

    Backlog.setTasks(backlogTasks);
    Person.setTasks(presonTasks);
    Person.getCurrentWeek();
    Person.render();
    Backlog.render();
  }
}

export default new App();
