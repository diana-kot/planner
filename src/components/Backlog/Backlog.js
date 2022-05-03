import { ROOT_BACKLOG } from "../../constants/root";

import "./Backlog.scss";

class Backlog {
  constructor() {
    this.tasks = [];
    this.dragged = "";
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  async render() {
    let htmlContent = "";

    this.tasks.forEach(
      ({
        id,
        subject,
        description,
        executor,
        creationDate,
        planStartDate,
        planEndDate,
        endDate,
      }) => {
        if (!executor) {
          htmlContent += `
          <li class="backlog__item"
          id="draggable"
          draggable="true"
           ondragstart="event.dataTransfer.setData('text/plain',null)" data-info="" 
           data-start-date="" data-task-week="">
              <span class="backlog__name">${subject}</span>
              <p class="backlog__text">${description}</p>
              <p class="backlog__task">${planStartDate}</p>
          </li>
          `;
        } else {
        }
      }
    );

    const htmlWrapper = `
    <div class="backlog__container">
        <h1 class="backlog__title">Backlog</h1>
        <form class="backlog__form">
          <input class="backlog__input" type="search" placeholder="Поиск..." id="backlogInput">
          <button class="backlog__button" type="button"></button id="backlog__button">
        </form>
        <ul class="backlog__items">
            ${htmlContent}
        </ul>
    </div>
        `;

    ROOT_BACKLOG.innerHTML = htmlWrapper;
  }

  eventListenerSearch() {
    document.getElementById("backlog__form").addEventListener("click", (e) => {
      console.log(1);
    });
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


  dragenter(){
    document.addEventListener("dragenter",  (evt) => {
      if (evt.target.className == "person__task") {
          evt.target.style.background = "#CFFFCA";
      } else if (evt.target.className == "backlog__items") {
          evt.target.style.border = "dashed 4px #999999";
      }
  }, false);
  }

  dragleave(){
    document.addEventListener("dragleave",  (evt) => {
      if (evt.target.className == "person__task") {
          evt.target.style.background = "";
      } else if (evt.target.className == "backlog__items") {
          evt.target.style.border = "";
      }
  }, false);
  }


  drop(){
    document.addEventListener('drop', (evt)=>{
      evt.preventDefault()
      const dragTitle = this.dragged.querySelector('.backlog__name')
      const dragText =this.dragged.querySelector('.backlog__text')
      const dragTaskText =this.dragged.querySelector('.backlog__task')
      const currentTask = document.getElementById('user' + evt.target.parentElement.id + '-' + dragged.getAttribute("data-start-date"));

      if (evt.target.className === 'person__task') {
        this.dragged.parentNode.removeChild(this.dragged);

        this.dragged.classList.add('selected')
        dragTitle.classList.add('hide')
        dragText.classList.add('hide')
        dragTaskText.classList.add('block')
        this.dragged.setAttribute("data-task-week", currentWeek);

        evt.target.appendChild(this.dragged);

        return
      } else if (evt.target.className === "backlog__items") {
        evt.target.style.border = "";
        this.dragged.parentNode.removeChild(this.dragged);

        this.dragged.classList.remove(`selected`);
        dragTitle.classList.remove('hide')
        dragText.classList.remove('hide')
        dragTaskText.classList.add('none')
        this.dragged.setAttribute("data-task-week", currentWeek);

        evt.target.appendChild(this.dragged);

        return
      } else if (evt.target.className == "person__name" && currentTask){
        this.dragged.parentNode.removeChild(dragged);

        this.dragged.classList.add(`selected`);
        dragTitle.classList.add(`hide`)
        dragText.classList.add(`hide`)
        dragTaskText.style.display = "flex";

        currentTask.appendChild(this.dragged);

        return
      }
    }, false)
  }






  dragstartBaclogTasks() {
    document.querySelectorAll(".backlog__items").forEach((elem) => {
      elem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("id", e.target.id);
        console.log("start");
        e.target.classList.add("selected");
        setTimeout(() => e.target.classList.add("hide"), 0);
      });
    });
  }

  dragendTasks() {
    document.querySelectorAll(".backlog__items").forEach((ev) => {
      ev.addEventListener("dragend", (e) => {
        e.target.classList.remove("selected");
        console.log("stop");
      });
    });
  }

  dragoverTasks() {
    document.querySelectorAll(".backlog__items").forEach((e) => {
      element.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
    });
  }

  dropBacklogTask() {
    document.querySelectorAll(".backlog__items").forEach((e) => {
      e.addEventListener("drop", (e) => {
        let idItem = e.dataTransfer.getData("id");
        console.log(idItem);
        e.target.append(document.querySelectorAll(".backlog__items"));
      });
    });
  }
}

export default new Backlog();
