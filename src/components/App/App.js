import Person from "../Person";
import Backlog from "../Backlog";

import "./App.scss";
import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";

class App {
  constructor(dragged) {
    this.dragged = dragged;
  }

  drag() {
    document.addEventListener("drag", (evt) => {}, false);
  }

  dragstart() {
    document.addEventListener(
      "dragstart",
      (evt) => {
        this.dragged = evt.target;
        evt.target.style.opacity = 0.5;
      },
      false
    );
  }

  dragend() {
    document.addEventListener(
      "dragend",
      (evt) => {
        evt.preventDefault();
        evt.target.style.opacity = 1;
      },
      false
    );
  }

  dragover() {
    document.addEventListener(
      "dragover",
      (evt) => {
        evt.target.style.opacity = "";
      },
      false
    );
  }

  dragenter() {
    document.addEventListener(
      "dragenter",
      (evt) => {
        if (evt.target.className == "person__task") {
          // e.target.classList.add("hovered");
        } else if (evt.target.className == "backlog__items") {
          evt.target.style.border = "dashed 4px #999999";
        }
      },
      false
    );
  }

  dragleave() {
    document.addEventListener(
      "dragleave",
      (evt) => {
        if (evt.target.className == "person__task") {
          // evt.target.classList.remove("hovered");
        } else if (evt.target.className == "backlog__items") {
          evt.target.style.display = "none";
        }
      },
      false
    );
  }

  drop() {
    document.addEventListener(
      "drop",
      (evt) => {
        evt.preventDefault();
        const dragTitle = this.dragged.querySelector(".backlog__name");
        const dragText = this.dragged.querySelector(".backlog__text");
        // const dragTaskText = this.dragged.querySelector(".backlog__task");
        const currentTask = document.getElementById(
          "user" +
            evt.target.parentElement.id +
            "-" +
            this.dragged.getAttribute("data-start-date")
        );

        if (evt.target.className === "person__task") {
          // let currentWeek = dragTitle;
          this.dragged.parentNode.removeChild(this.dragged);
          this.dragged.classList.add("backlog__box_selected");
          this.dragged.classList.remove("selected");
          dragTitle.classList.add("block");
          dragText.classList.add("hide");
          // dragTaskText.classList.add("hide");
          // this.dragged.setAttribute("data-task-week", currentWeek);

          evt.target.append(this.dragged);

          return;
        } else if (evt.target.className === "backlog__items") {
          evt.target.style.border = "";
          this.dragged.parentNode.removeChild(this.dragged);
          this.dragged.classList.remove("backlog__box_selected");
          this.dragged.classList.remove(`selected`);
          dragTitle.classList.remove("hide");
          dragText.classList.remove("hide");
          dragTaskText.classList.add("none");
          // this.dragged.setAttribute("data-task-week", currentWeek);

          evt.target.appendChild(this.dragged);

          return;
        } else if (evt.target.className == "person__name") {
          this.dragged.parentNode.removeChild(dragged);
          this.dragged.classList.add("backlog__box_selected");
          this.dragged.classList.add(`selected`);
          dragTitle.classList.add(`hide`);
          dragText.classList.add(`hide`);
          dragTaskText.style.display = "flex";

          currentTask.appendChild(this.dragged);

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

    Person.render();
    Backlog.render();
  }
}

export default new App();
