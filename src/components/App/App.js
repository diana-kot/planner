import Person from "../Person";
import Backlog from "../Backlog";

import "./App.scss";
import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { getDataApi } from "../../utils/getDataApi";

class App {
  constructor(dragged, droppedItem) {
    this.dragged = dragged;
    this.droppedItem = droppedItem;
  }

  dragItems() {
    const backlogItems = document.querySelectorAll(".backlog__item");

    backlogItems.forEach((el) => {
      el.addEventListener("dragstart", this.dragstart);
      el.addEventListener("dragend", this.dragend);
      el.addEventListener("drag", this.dragend);

      el.addEventListener("dragenter", (evt) => {
        if (this.droppedItem !== evt.target) {
          this.droppedItem = evt.target;
          console.log(this.droppedItem)
        }
      });

      el.addEventListener("dragleave", () => {
        this.droppedItem = null;
      });
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

  dragstart() {
    document.addEventListener(
      "dragstart",
      (evt) => {
        this.dragged = evt.target;
        evt.dataTransfer.setData("dragItem", this.dataset.item);
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
        evt.target.classList.remove("selected");
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
        if (evt.target.className == "person__task") {
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
        // evt.target.style.opacity = "";
      },
      false
    );
  }

  drop() {
    document.addEventListener(
      "drop",
      (evt) => {
        // evt.preventDefault();

        const dragTitle = evt.target.querySelector(".backlog__name");
        const dragText = evt.target.querySelector(".backlog__text");

        const dragFlag = evt.dataTransfer.getData("dragItem");
        const dragItem = document.querySelector(`[data-item="${dragFlag}"]`);

        // if (evt.target.className === "person__task") {
        //   let currentWeek = dragTitle;
        //   evt.target.parentNode.removeChild(this.dragged);
        //   evt.target.classList.add("backlog__box_selected");
        //   evt.target.classList.remove("selected");
        //   evt.target.classList.add("block");
        //   evt.target.classList.add("hide");
        //   // dragTaskText.classList.add("hide");
        //   dragItem.setAttribute("data-start-date", currentWeek);

        //   evt.target.append(dragItem);

        //   return;
        // }

        if (this.droppedItem || this.droppedItem === evt.target) {
          
            console.log("Общий предок");
        
          console.log(this.droppedItem)
        }
        if (evt.target.className !== "person__name" && evt.target.className !== "backlog__box-text" ) {
          evt.target.append(dragItem);
          console.log(this.droppedItem)
        }

        // evt.target.append(dragItem);
      },
      false
    );
  }

  // drop() {
  //   document.addEventListener(
  //     "drop",
  //     (evt) => {
  //       evt.preventDefault();
  //       const dragTitle = this.dragged.querySelector(".backlog__name");
  //       const dragText = this.dragged.querySelector(".backlog__text");
  //       // const dragTaskText = this.dragged.querySelector(".backlog__task");
  //       const currentTask = document.getElementById(
  //         "user" +
  //           evt.target.parentElement.id +
  //           "-" +
  //           this.dragged.getAttribute("data-start-date")
  //       );

  //       if (evt.target.className === "person__task") {
  //         // let currentWeek = dragTitle;
  //         this.dragged.parentNode.removeChild(this.dragged);
  //         this.dragged.classList.add("backlog__box_selected");
  //         this.dragged.classList.remove("selected");
  //         dragTitle.classList.add("block");
  //         dragText.classList.add("hide");
  //         // dragTaskText.classList.add("hide");
  //         // this.dragged.setAttribute("data-task-week", currentWeek);

  //         evt.target.append(this.dragged);

  //         return;
  //       } else if (evt.target.className === "backlog__items") {
  //         evt.target.style.border = "";
  //         this.dragged.parentNode.removeChild(this.dragged);
  //         this.dragged.classList.remove("backlog__box_selected");
  //         this.dragged.classList.remove(`selected`);
  //         dragTitle.classList.remove("hide");
  //         dragText.classList.remove("hide");
  //         dragTaskText.classList.add("none");
  //         // this.dragged.setAttribute("data-task-week", currentWeek);
  //         evt.target.appendChild(this.dragged);

  //         return;
  //       } else if (evt.target.className == "person__name") {
  //         this.dragged.parentNode.removeChild(this.dragged);
  //         this.dragged.setAttribute("data-start-date");
  //         this.dragged.setAttribute("data-end-date");
  //         this.dragged.classList.add("backlog__box_selected");
  //         this.dragged.classList.add(`selected`);
  //         dragTitle.classList.add(`hide`);
  //         dragText.classList.add(`hide`);
  //         dragTaskText.style.display = "flex";

  //         currentTask.appendChild(this.dragged);

  //         return;
  //       } else if (evt.target.className == "person__name") {
  //         this.dragged.setAttribute("data-start-date");
  //         this.dragged.setAttribute("data-end-date");
  //       }

  //     },
  //     false
  //   );
  // }

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
