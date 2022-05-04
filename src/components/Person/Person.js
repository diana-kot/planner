import { ROOT_PERSON } from "../../constants/root";
import { dateFilter } from "../../utils/dateFilter";

import "./Person.scss";
class Person {
  constructor() {
    this.persons = [];
    this.tasks = [];
    this.arrDate = [];
    // // this.id = user.id;
    // // this.firstName = user.firstName;
  }

  getCurrentWeek(startDate) {
    let d = new Date();
    if (startDate != null) {
      d = new Date(startDate);
    }
    // const d = new Date(startDate);
    for (let p = 0; p < 7; p++) {
      d.setDate(d.getDate() + 1);
      this.arrDate[p] = new Date(+d);
    }
  }
  // getNextWeek() {
  //   const d = this.arrDate[0];
  //   for (let p = 0; p < 7; p++) {
  //     d.setDate(d.getDate() + 7);
  //     this.arrDate[p] = new Date(+d);
  //   }
  // }
  // getLastWeek() {
  //   const d = this.arrDate[0];
  //   for (let p = 0; p < 7; p++) {
  //     d.setDate(d.getDate() - 7);
  //     this.arrDate[p] = new Date(+d);
  //   }
  // }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  setPersons(persons) {
    this.persons = persons;
  }

  setTask(task) {
    task.Person = "";
    this.tasks.push(task);
  }

  getTasks(userId, currendDate) {
    let htmlContentTask = ``;
    this.tasks.forEach(({id, executor, subject, planStartDate, planEndDate }) => {
      // console.log(currendDate.toISOString().slice(0,10));
      // console.log(planStartDate);
      let curr = currendDate.toISOString().slice(0, 10);
      if (userId === executor && curr >= planStartDate && curr <= planEndDate) {
        htmlContentTask += `
    <div class="task__template">
        <article class="backlog__box" id="draggable" draggable="true"  data-name=${subject}
         data-start-date=${planStartDate}
         data-end-date=${planEndDate}
         data-task-week=""
         data-item=${id}
         >
          <h4 class="backlog__box-name"></h4>
          <p class="backlog__box-text">${`Зaдача ${executor}`}</p>
        </article>
    </div>
    `;
      } else {
        htmlContentTask += ``;
      }
    });
    return htmlContentTask;
  }

  renderDates() {
    let htmlContentDate = "";
    this.arrDate.forEach((el) => {
      htmlContentDate += `  
                <li class="table__date">
                  ${dateFilter.dateFormat(el)}
                </li>
              `;
    });
    return htmlContentDate;
  }

  render(startDate) {
    let htmlContent = "";
    let htmlContentDate = "";

    // const startDate = new Date();
    // const endDate = new Date("2023-01-01");

    // const now = new Date();
    // const start = new Date(now.getFullYear(), 0, 1);
    // const diff = now - start;
    // const oneDay = 1000 * 60 * 60 * 24;
    // let day = Math.floor(diff / oneDay);
    // let currentWeek = Math.floor(day / 7);

    this.getCurrentWeek(startDate);

    // const d = new Date();
    // for (let p = 0; p < 7; p++) {
    //   d.setDate(d.getDate() + 1);
    //   this.arrDate[p] = dateFilter.dateFormat(new Date(+d));
    // }
    htmlContentDate = this.renderDates();
    // this.arrDate.forEach((el) => {
    //   htmlContentDate += `
    //             <li class="table__date">
    //               ${dateFilter.dateFormat(el)}
    //             </li>
    //           `;
    // });

    // const id = this.persons.map(({ id }) => id);
    // const executors = this.tasks.map(({ executor }) => {
    //   return executor;
    // });

    this.persons.forEach(({ id, firstName }) => {
      htmlContent += `
      <div class="person__item">
          <div class="person__name">
          ${firstName}
          </div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[0]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[1]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[2]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[3]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[4]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[5]
          )}</div>
          <div class="person__task" draggable="true">${this.getTasks(
            id,
            this.arrDate[6]
          )}</div>
      </div>
      `;
    });

    const htmlWrapper = `
    <div class="person__container container">
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

  eventListenerButtonPrev() {
    document
      .getElementById("previous-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let startDate = new Date();
        startDate.setDate(this.arrDate[0].getDate() - 7);
        // this.getCurrentWeek(startDate);
        // this.renderDates();
        console.log(startDate.toISOString().slice(0, 10));
        this.render(startDate);
        this.setTasks(this.tasks);
      });
  }

  eventListenerButtonNext() {
    document.getElementById("next-button").addEventListener("click", (e) => {
      e.preventDefault();
      let startDate = new Date();
      startDate.setDate(this.arrDate[0].getDate() + 7);
      // this.getCurrentWeek(startDate);
      // this.renderDates();
      console.log(startDate.toISOString().slice(0, 10));

      this.render(startDate);
      this.setTasks(this.tasks);
    });
  }
}

export default new Person();
