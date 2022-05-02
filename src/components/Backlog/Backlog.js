import { ROOT_BACKLOG } from "../../constants/root";

import "./Backlog.scss";

class Backlog {
  constructor() {
    this.tasks = [];
  }

  setTasks(tasks)
  {
    this.tasks = tasks
  }

  async render() {
    
    let htmlContent = "";

    this.tasks.forEach(
      ({ id, subject, description, executor, creationDate, planStartDate, planEndDate, endDate }) => {
        if(!executor){
          htmlContent += `
          <li class="backlog__item">
              <span class="backlog__name">${subject}</span>
              <p>${planStartDate}</p>
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
          <button class="backlog__button" type="button"></button>
        </form>
        <ul class="backlog__items">
            ${htmlContent}
        </ul>
    </div>
        `;

     ROOT_BACKLOG.innerHTML = htmlWrapper;
  }

  eventListener() {
    document.querySelectorAll(".backlog__item").forEach((el) => {
      el.addEventListener("click", () => {
        element.addEventListener("click", () => {
          console.log(1);
        });
      });
    });
  }
}

export default new Backlog();
