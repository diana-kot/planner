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
      // el.addEventListener("dragenter", this.dragenter);
      el.addEventListener("dragleave", this.dragleave);
      el.addEventListener("dragover", this.dragover);
      // el.addEventListener("drop", this.drop);
    });
  }

  dragstart() {
    document.addEventListener("dragstart", (evt) => {
      this.dragged = this;
      evt.dataTransfer.setData("dragItem", this.dataset.item);
      // evt.dataTransfer.setData("name", this.dataset.name);
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
      evt.target.style.border = "";    });
  }

  dragover() {
    document.addEventListener("dragover", (evt) => {
      evt.preventDefault();
    });
  }

  drop() {
    document.addEventListener("drop", (evt) => {
      evt.target.classList.remove("hovered");
      const dragFlag = evt.dataTransfer.getData("dragItem");
      const dragItem = document.querySelector(`[data-item="${dragFlag}"]`);
      const dragTitle = dragItem.querySelector(".backlog__name");
      console.log(dragItem.getAttribute("data-name"));
  
      if (evt.target.className === "person__task") {
        console.log("Зашел сюда 1");
        console.log(dragItem);
        dragItem.classList.add("hide");
        let task = {
          id: dragItem.getAttribute("data-id"),
          subject: dragItem.getAttribute("data-item"),
          executor: evt.target.getAttribute("data-person-id"),
          planStartDate: evt.target.getAttribute("data-person-date"),
          planEndDate: evt.target.getAttribute("data-person-date"),
        };
        Person.setTask(task);
        Person.render();
        dragItem.classList.add("backlog__box_selected");
        dragItem.classList.remove("selected");
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
        dragItem.classList.remove("hide");
        console.log(dragItem);
        dragItem.classList.remove("backlog__box_selected");
        dragItem.classList.add("backlog__item");
        dragTitle.textContent = dragItem.getAttribute("data-name");

        console.log(dragItem);
        dragItem.classList.remove("selected");
        if (evt.target.className === "backlog__name") {
          evt.target.parentNode.parentNode.append(dragItem);
        } else {
          evt.target.append(dragItem);
        }
        console.log(dragItem.getAttribute("data-id"));
        Person.deleteTask(dragItem.getAttribute("data-id"));
        Person.render();
      } else if (evt.target.className === "person__name") {
        console.log("Зашел сюда 3");
        dragItem.classList.add("hide");
        let task = {
          id: dragItem.getAttribute("data-id"),
          subject: dragItem.getAttribute("data-item"),
          executor: evt.target.getAttribute("data-person-id"),
          planStartDate: dragItem.getAttribute("data-start-date"),
          planEndDate: dragItem.getAttribute("data-end-date"),
        };
        Person.setTask(task);
        Person.render();
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
