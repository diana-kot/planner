import { API_URL, URL_PERSON, URL_TASK } from "../../constants/api";
import { ROOT_PERSON } from "../../constants/root";
import { getDataApi } from "../../utils/getDataApi";
import { dateFilter } from "../../utils/dateFilter";

import "./Person.scss";

class Person {
  async render() {
    const persons = await getDataApi.getData(API_URL + URL_PERSON);

    let htmlContent = "";
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

  //   var dragged;

  //   function pad(s) {
  //       return ('00' + s).slice(-2)
  //   }
    
  //   while (startDate.getTime() < endDate.getTime()) {
  //     arrDate.push('' + startDate.getFullYear() + '-' + pad(startDate.getMonth() + 1) + '-' + pad(startDate.getDate()));
  //     startDate.setDate(startDate.getDate() + 1);
  //   }

  //   function renderDate(date) {
  //     for (let i = 0; i < 7; i++) {
  //         let currentDate = date[day + i];
  //         let dayDate = currentDate.slice(8, 10);
  //         let monthDate = currentDate.slice(5, 7);
  //         calendarDate[i].innerText = dayDate + "." + monthDate;
  //     }
  //     calendarWeek.id = 'week-' + currentWeek;
  // }


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

    const tasks = await getDataApi.getData(API_URL + URL_TASK);

    const taskNumber = 1;

    const id = persons.map(({ id }) => id);
    console.log(id);

    const executors = tasks.map(({ executor }) => {return executor} );
    console.log(executors);

    const task = tasks.filter(({ executor }) => executor !== null);
   
    let result = executors.reduce((r,v) => (id.includes(v) ? r.repeating.push(v) : r.unique.push(v), r), {unique:[], repeating:[]});

    
    let output = result.unique.concat(result.repeating).filter((el)=> el !== null )


    function getTasks(userId, currendDate)
    {
      htmlContentTask = ``
    task.forEach(({ executor, planStartDate, planEndDate }) => {
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

    persons.forEach(({ id, firstName }) => {
      htmlContent += `
    <div class="person__item">
        <div class="person__name">
        ${id}  ${firstName}
        </div>
        <div class="person__task">${getTasks(id, arrDate[0])}</div>
        <div class="person__task">${getTasks(id, arrDate[1])}</div>
        <div class="person__task">${getTasks(id, arrDate[2])}</div>
        <div class="person__task">${getTasks(id, arrDate[3])}</div>
        <div class="person__task">${getTasks(id, arrDate[4])}</div>
        <div class="person__task">${getTasks(id, arrDate[5])}</div>
        <div class="person__task">${getTasks(id, arrDate[6])}</div>
    </div>
      `;
    });

    const htmlWrapper = `
    <div class="person__container">
      <div class="person__date">
      ${htmlContentDate}
      </div>
      <div class="person__content">
        <div>${htmlContent}</div>
      </div>
    </div> 
    `;

    ROOT_PERSON.innerHTML = htmlWrapper;
  }

  // eventListener() {
  //   document.querySelectorAll(".person__item").forEach((el) => {
  //     el.addEventListener("click", () => {
  //       element.addEventListener("click", () => {
  //         console.log(1);
  //       });
  //     });
  //   });
  // }
}

export default new Person();
