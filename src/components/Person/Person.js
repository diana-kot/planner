import { ROOT_PERSON } from "../../constants/root";
import { dateFilter } from "../../utils/dateFilter";
import App from "../App";
import "./Person.scss";
class Person {
  constructor() {
    this.persons = [];
    this.tasks = [];
    this.htmlContentTasks = [];
    this.arrDate = [];
    // // this.id = user.id;
    // // this.firstName = user.firstName;
  }

  getCurrentWeek(startDate) {
    let d = new Date();
    if (startDate != null) {
      d = new Date(startDate);
    }
    d.setDate(d.getDate() - d.getDay()); // first day on week
    for (let p = 0; p < 7; p++) {
      d.setDate(d.getDate()+1);
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
    // task.Person = "";
    this.tasks.push(task);
    // console.log(this.tasks)
  }

  getTasks(userId, currendDate) {
    let htmlContentTask = ``;
    this.tasks.forEach(
      ({ executor, subject, planStartDate, planEndDate }, index) => {
        let curr = currendDate.toISOString().slice(0, 10);
        if (
          userId == executor &&
          curr >= planStartDate &&
          curr <= planEndDate
        ) {
          // console.log(subject);
          //this.addTaskContent(element);
          htmlContentTask += `
    <div class="task__template">
        <article class="backlog__box" id="draggable" draggable="true" 
          data-name=${subject}
          data-start-date=${planStartDate}
          data-end-date=${planEndDate}
          data-task-week=""
          data-executor =${executor}
          data-item=${subject}
          data-person-id=${userId}
          >
          <h4 class="backlog__box-name">${subject}</h4>
          <p class="backlog__name">${`Зaдача ${index + 1}`}</p>
        </article>
    </div>
    `;
        } else {
          htmlContentTask += ``;
        }
      }
    );
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

  render(startDate) {
    let htmlContent = "";
    let htmlContentDate = "";
   // this.getCurrentWeek(startDate);

    htmlContentDate = this.renderDates();
    console.log(this.tasks);
    this.persons.forEach(({ id, firstName }, index) => {
      htmlContent += `
      <div  class="person__item">
          <div div data-zone='2' 
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
    //   App.dragZoneTask();
  }

  eventListenerButtonPrev() {
    document
      .getElementById("previous-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log("клик по левой кнопке");
        this.getLastWeek();
        this.render();
        //this.setTasks(this.tasks);
      });
  }

  eventListenerButtonNext() {
    document.getElementById("next-button").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("клик по правой кнопке");
      this.getNextWeek();
      this.render();
      //this.setTasks(this.tasks);
    });
  }
}

export default new Person();
