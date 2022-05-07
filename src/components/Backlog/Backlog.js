import { ROOT_BACKLOG } from "../../constants/root";

import "./Backlog.scss";
class Backlog {
  constructor(dragged) {
    this.tasks = [];
    this.dragged = dragged;
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
            data-name=${subject} 
            data-start-date=${planStartDate}
            data-end-date=${planEndDate}
            data-item=${subject}
            data-week="">
              <span class="backlog__name">${subject}</span>
              
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
            <button
            class="backlog__button" 
            type="button"
            id="backlog__button"
            ></button>
          </form>
        <ul class="backlog__items" data-zone='1'>
            ${htmlContent}
        </ul>
    </div>
        `;

    ROOT_BACKLOG.innerHTML = htmlWrapper;
     
  this.eventListenerSearch();
  }

  eventListenerSearch() {
    const serch = document.getElementById("backlogInput");
    let val = serch.value.toLowerCase();

    const taskList = document.querySelectorAll(".backlog__item");
    Array.from(taskList).forEach((el) => {
      el.classList.remove("hide");
      if (
        el.innerText.toLowerCase() !== val.toLowerCase() &&
        val.toLowerCase()
      ) {
        el.classList.add("hide");
      } else {
        el.classList.remove("hide");
      }
    });
  }

  serchButton() {
    const SerchBtn = document.getElementById("backlog__button");
    SerchBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.eventListenerSearch();
    });
  }
}

export default new Backlog();
