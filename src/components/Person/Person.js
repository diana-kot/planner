import { ROOT_PERSON } from "../../constants/root";
import { dateFilter } from "../../utils/dateFilter";

import "./Person.scss";
class Person {
  constructor() {
    this.persons = []; //массив users
    this.tasks = [];
    // // this.id = user.id;
    // // this.firstName = user.firstName;
  }

  setTasks(tasks)
  {
    this.tasks = tasks
    console.log(this.tasks.length)
  }
  
  setPersons(persons)
  {
    this.persons = persons;
    console.log(this.persons.length) 
  }
  async render() {
    let htmlContent = ''
    let htmlContentDate = "";
    let htmlContentTask = "";


    const startDate = new Date();
    const endDate = new Date("2023-01-01");

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    let currentWeek = Math.floor(day / 7);

    const arrDate = [];

    const d = new Date();
    for (let p = 0; p < 7; p++) {
      d.setDate(d.getDate() + 1);
      arrDate[p] = dateFilter.dateFormat(new Date(+d));
    }

    arrDate.forEach((el) => {
      htmlContentDate += `  
                <li class="table__date">
                  ${el}
                </li>
              `;
    });

    function getTasks(tasks, userId, currendDate)
    {
      htmlContentTask = ``
      tasks.forEach(({ executor, planStartDate, planEndDate }) => {
    if (userId === executor && 
       currendDate>=dateFilter.dateFormat(planStartDate) && 
       currendDate<=dateFilter.dateFormat(planEndDate)) {

      htmlContentTask += `
      <div class="task__template">
          <article class="backlog__box" id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)" data-info="" data-start-date="" data-task-week="">
            <h4 class="backlog__box-name"></h4>
            <p class="backlog__box-text">${`Зaдача ${executor}`}</p>
          
          </article>
      </div>
      `;
    } else {
      htmlContentTask += ``
    }

    });
    return htmlContentTask
  }

    const id = this.persons.map(({ id }) => id);
    const executors = this.tasks.map(({ executor }) => {return executor} );
   
    this.persons.forEach(({ id, firstName }) => {
      htmlContent += `
      <div class="person__item">
          <div class="person__name">
          ${id}  ${firstName}
          </div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[0])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[1])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[2])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[3])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[4])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[5])}</div>
          <div class="person__task">${getTasks(this.tasks, id, arrDate[6])}</div>
      </div>
      `;
    });

    const htmlWrapper = `
    <div class="person__container">
      <div class="person__date">
        <button 
          class="calendar__button" id="previous-button" type="button">
          &#10094;
        </button>
        ${htmlContentDate}
        <button
          class="calendar__button" 
          id="next-button" 
          type="button">
          &#10095;
        </button>
      </div>
      <div class="person__content">
        <div>${htmlContent}</div>
      </div>
    </div> 
    `;

    ROOT_PERSON.innerHTML = htmlWrapper;
  }

  renderDate(date) {
    const d = new Date();
    for (let p = 0; p < 7; p++) {
      d.setDate(d.getDate() + 1);
      arrDate[p] = dateFilter.dateFormat(new Date(+d));
    }
  }

  reRenderDate() {
    const calendarUsers = document.querySelectorAll(".table__date");
    Array.from(calendarUsers).forEach((element) => {
      let calendarUsersTask = element.querySelectorAll(".person__task");
      Array.from(calendarUsersTask).forEach((item, i) => {
        item.id = "user" + element.id + "-" + arrDate[day + i];
      });
    });
  }






  eventListener() {
    document.querySelectorAll(".person__task").forEach((element) => {
     

      element.addEventListener("click", () => {
        // Characters.render(uri);
        console.log(1)
      });
    });
  }

  eventListenerButton() {
    const previousWeekBtn = document.getElementById("previous-button");
    const nextWeekBtn = document.getElementById("next-button");

    previousWeekBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // hiddenTasks();
      day = day - 7;
      currentWeek = currentWeek - 1;
      renderDate(arrDate);
      rerenderDate();
      // unhiddenTasks();
      // renderTasks();
      console.log(1);
    });

    nextWeekBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // hiddenTasks();
      day = day + 7;
      currentWeek = currentWeek + 1;
      renderDate(arrDate);
      rerenderDate();
      // unhiddenTasks();
      // renderTasks();
    });

    // document.querySelectorAll(".person__item").forEach((el) => {
    //   el.addEventListener("click", () => {
    //     element.addEventListener("click", () => {
    //       console.log(1);
    //     });
    //   });
    // });
  }
}

export default new Person();
