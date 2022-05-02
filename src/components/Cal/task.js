
// class TaskItem {
//   constructor(task) {
//     this.subject = task.subject;
//     this.description = task.description;
//     this.executor = task.executor;
//     this.planStartDate = task.planStartDate;
//     this.planEndDate = task.planEndDate;
//     this.classNameActive = "products-element__btn_active";
//   }

//   async renderTasks(tasks) {
//     let htmlContentTask = "";
    
//     tasks.forEach(({ executor, planStartDate, planEndDate }) => {
     
//       if (
//         userId === executor &&
//         currendDate >= dateFilter.dateFormat(planStartDate) &&
//         currendDate <= dateFilter.dateFormat(planEndDate)
//       ) {
//         htmlContentTask += `
//     <div class="task__template">
//         <article class="backlog__box" id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)" data-info="" data-start-date="" data-task-week="">
//           <h4 class="backlog__box-name"></h4>
//           <p class="backlog__box-text">${`Зaдача ${executor}`}</p>
        
//         </article>
//     </div>
//     `;
//       } else {
//         htmlContentTask += ``;
//       }
//     });
//     return htmlContentTask;
//     };

//   async render() {
//     const tasks = await getDataApi.getData(API_URL + URL_TASK);
//     tasks ? this.renderTasks(tasks) : '';
//   }
// }