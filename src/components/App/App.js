import Person from "../Person";
import Backlog from "../Backlog";

import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";

import "./App.scss";
class App {
  constructor(dragged) {
    this.dragged = dragged;
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
  dragZoneTask() {
    const dropZoneTask = document.querySelectorAll(".person__task");
    dropZoneTask.forEach((el) => {
      el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      el.addEventListener("drop", this.drop);
    });
  }
  dragItems() {
    const backlogItems = document.querySelectorAll(".backlog__item");

    backlogItems.forEach((el) => {
      el.addEventListener("dragstart", this.dragstart);
      el.addEventListener("dragend", this.dragend);
      el.addEventListener("drag", this.drag);
    });
  }

  dragZoneBaclog() {
    const dropZoneBaclog = document.querySelectorAll(".backlog__items");
    dropZoneBaclog.forEach((el) => {
      el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      // el.addEventListener("drop", this.drop);
    });
  }

  dragstart() {
    document.addEventListener("dragstart", (evt) => {
      this.dragged = evt.target;
      evt.dataTransfer.setData("dragItem", this.dataset.item);
      evt.dataTransfer.setData("name", this.dataset.name);
      evt.target.classList.add("selected");
    });
  }

  dragend() {
    document.addEventListener("dragend", (evt) => {
      evt.preventDefault();
      evt.target.classList.remove("selected");
    });
  }

  drag() {
    document.addEventListener("drag", () => {});
  }

  dragenter() {
    document.addEventListener("dragenter", (evt) => {
      evt.preventDefault();
      if (
        evt.target.className === "person__task" ||
        evt.target.className === "person__name"
      ) {
        evt.target.classList.add("hovered");
      }
    });
  }

  dragleave() {
    document.addEventListener("dragleave", (evt) => {
      evt.preventDefault();
      evt.target.classList.remove("hovered");
      evt.target.style.border = "";
    });
  }

  dragover() {
    document.addEventListener("dragover", (evt) => {
      evt.preventDefault();
      // if (evt.target.className == "backlog__items") {
      //   evt.target.style.border = "dashed 4px #999999";
      // }
    });
  }

  drop() {
    document.addEventListener("drop", (evt) => {
      evt.target.classList.remove("hovered");
      const dragFlag = evt.dataTransfer.getData("dragItem");
      const dragItem = document.querySelector(`[data-item="${dragFlag}"]`);
      const backlogBox = document.querySelector(".backlog__box");

      // const nameFlag = evt.dataTransfer.getData("name");
      // const dragName = document.querySelector(`[data-name="${nameFlag}"]`);
      // const dradName = dragItem.querySelector(".person__name");
      console.log("evt.target.className = ", evt.target.className);
      const dragTitle = dragItem.querySelector(".backlog__name");
      if (evt.target.className === "person__task") {
        const dragTitle = dragItem.querySelector(".backlog__name");
        console.log("Зашел сюда 1");
        // const dataStart = dragItem.getAttribute("data-start-date");
        // const dataEnd = dragItem.getAttribute("data-end-date");
        // const dataExecutor = evt.target.getAttribute("data-person-id")
        // const currentDate = evt.target.getAttribute("data-person-date");
        console.log(dragItem);
        let task = {
          id: dragItem.getAttribute("dataid"),
          subject: dragItem.getAttribute("data-item"),
          executor: evt.target.getAttribute("data-person-id"),
          planStartDate: evt.target.getAttribute("data-person-date"),
          planEndDate: evt.target.getAttribute("data-person-date"),
          
        };

      
        Person.setTask(task);
        Person.render();

        dragItem.classList.add("backlog__box_selected");
        dragTitle.classList.add("block");
        dragItem.classList.remove("selected");

        // console.log(dataExecutor);
        // console.log(task);
        this.append(dragItem);
      } else if (
        evt.target.className === "backlog__items" ||
        evt.target.className === "backlog__name" ||
        evt.target.className === "backlog__container"
      ) {
        console.log("Зашел сюда 2");
        evt.target.classList.remove("hovered");
        evt.target.style.border = "";
        dragItem.classList.remove("backlog__box");
        // console.log(dragItem);
        dragItem.classList.remove("backlog__box_selected");
        // dragTitle.classList.remove("block");
        dragTitle.classList.add("backlog__item");
        dragTitle.textContent = dragItem.getAttribute("data-name");
        // dragItem.setAttribute("data-item", ""),
        // console.log("this = ", this);
        // console.log("evt.target = ", evt.target);

        // console.log(dragItem);
        // console.log(dragItem.getAttribute("data-name"));
        dragItem.classList.remove("selected");

        if (evt.target.className === "backlog__name") {
          evt.target.parentNode.parentNode.append(dragItem);
        } else {
          evt.target.append(dragItem);
        }
        console.log(dragItem.getAttribute("dataid"));
        Person.deleteTask(dragItem.getAttribute("dataid"));
        Person.render();
        // let task = {
        //   // id: dragItem.setAttribute("data-id"),
        //   // subject: dragItem.setAttribute("data-item"),
        //   executor: evt.target.setAttribute("data-person-id", null),
        //   planStartDate: dragItem.setAttribute("data-start-date", ""),
        //   planEndDate: dragItem.setAttribute("data-end-date", ""),
        // };

        // Person.setTask(task);

        // dragItem.setAttribute("data-person-id", "");
        // const dataExecutor = evt.target.getAttribute("data-person-id")

        // Person.render();
        // const dataStart = dragItem.getAttribute("data-start-date");
        // const dataEnd = dragItem.getAttribute("data-end-date");
        // const dataExecutor = dragItem.getAttribute("data-executor");
      } else if (evt.target.className === "person__name") {
        console.log("Зашел сюда 3");

        //  const dataStart = dragItem.getAttribute("data-start-date");
        //  const dataEnd = dragItem.getAttribute("data-end-date");
        //  const dataExecutor = evt.target.getAttribute("data-person-id");
        //  Person.setTask(convertToTask(dragItem));

        // dragItem.classList.add("backlog__box_selected");
        // dradName.classList.add("block");
        // dragItem.classList.remove("selected");

        let task = {
          id: dragItem.getAttribute("dataid"),
          subject: dragItem.getAttribute("data-item"),
          executor: evt.target.getAttribute("data-person-id"),
          planStartDate: dragItem.getAttribute("data-start-date"),
          planEndDate: dragItem.getAttribute("data-end-date"),
        };
        Person.setTask(task);
        // console.log(dataExecutor);
        Person.render();

        // dragItem.classList.add("backlog__box_selected");
        // dragTitle.classList.add("block");
        // dragItem.classList.remove("selected");
        // Person.render();
        // console.log(dataExecutor);

        // evt.target.append(dragItem);
      }
    });
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

    this.dragItems();
    this.dragZoneTask();
    this.dragZoneName();
    this.dragZoneBaclog();
  }
}

export default new App();
