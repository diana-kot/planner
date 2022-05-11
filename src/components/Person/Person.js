import { ROOT_PERSON } from "../../constants/root";
import { dateFilter } from "../../utils/dateFilter";

import "./Person.scss";
class Person {
  constructor() {
    this.persons = [];
    this.tasks = [];
    this.htmlContentTasks = [];
    this.arrDate = [];
  }

  getCurrentWeek(startDate) {
    let d = new Date();
    if (startDate != null) {
      d = new Date(startDate);
    }
    d.setDate(d.getDate() - d.getDay()); 
    for (let p = 0; p < 7; p++) {
      d.setDate(d.getDate() + 1);
      this.arrDate[p] = new Date(d);
    }
  }

  getNextWeek() {
    let startDate = this.arrDate[0];
    startDate.setDate(this.arrDate[0].getDate() + 7);
    console.log(this.arrDate[0].getDate());
    console.log(startDate.toISOString().slice(0, 10));
    this.getCurrentWeek(startDate);
  }
  getLastWeek() {
    let startDate = this.arrDate[0];
    startDate.setDate(this.arrDate[0].getDate() - 7);
    console.log(startDate.toISOString().slice(0, 10));
    this.getCurrentWeek(startDate);
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  setPersons(persons) {
    this.persons = persons;
  }

  setTask(task) {
    if (this.tasks.filter((el) => el.id === task.id).length == 0) {
      this.tasks.push(task);
    } else {
      this.tasks.forEach((el) => {
        if (task.id === el.id) {
          el.executor = task.executor;
          el.planStartDate = task.planStartDate;
          el.planEndDate = task.planEndDate;
        }
      });
    }
    console.log(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log(this.tasks);
  }

  getTasks(userId, currendDate) {
    let htmlContentTask = ``;
    this.tasks.forEach(
      ({ id, executor, subject, planStartDate, planEndDate }, index) => {
        let curr = currendDate.toISOString().slice(0, 10);
        if (
          userId == executor &&
          curr >= planStartDate &&
          curr <= planEndDate
        ) {
          htmlContentTask += `
    <div class="task__template">
        <article class="backlog__box" draggable="true" 
          data-id=${id}
          data-name="${subject}"
          data-start-date=${planStartDate}
          data-end-date=${planEndDate}
          data-task-week=""
          data-executor =${executor}
          data-item="${subject}"
          data-person-id=${userId}
          >
          <p class="backlog__name">${`${subject} ${index + 1}`}</p>
        </article>
    </div>
    `;
        }
      }
    );
    return htmlContentTask;
  }
  renderDates() {
    let htmlContentDate = ``;
    this.arrDate.forEach((el) => {
      htmlContentDate += `  
                <li class="table__date">
                  ${dateFilter.dateFormat(el)} 
                </li>
              `;
    });
    return htmlContentDate;
  }

  renderTasks(id) {
    let htmlContentTasks = ``;
    this.arrDate.forEach((date) => {
      htmlContentTasks += `<div data-zone='2' 
        class="person__task"
        draggable="true"
        data-person-id=${id}
        data-person-date=${date.toISOString().slice(0, 10)}
        >
        ${this.getTasks(id, date)}
        </div>`;
    });
    return htmlContentTasks;
  }

  render() {
    let htmlContent = "";
    let htmlContentDate = "";

    htmlContentDate = this.renderDates();
    this.persons.forEach(({ id, firstName }) => {
      htmlContent += `
      <div  class="person__item">
          <div data-zone='2' 
          class="person__name"
          data-person-id=${id}>  ${firstName} </div>
          ${this.renderTasks(id)}
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

    this.eventListenerButtonPrev();
    this.eventListenerButtonNext();
  }

  eventListenerButtonPrev() {
    document
      .getElementById("previous-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log("клик по левой кнопке");
        this.getLastWeek();
        this.render(true);
      });
  }

  eventListenerButtonNext() {
    document.getElementById("next-button").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("клик по правой кнопке");
      this.getNextWeek();
      this.render(true);
    });
  }
}

export default new Person();
