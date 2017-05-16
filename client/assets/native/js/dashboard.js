const userState = JSON.parse(localStorage.getItem('userState'));
if (!userState) {
  location.href = 'login.html';
}

$(document).ready(() => {
  const socket = io(); // Initialize Socket

    // Socket variables
  const DEBUG = 1;
  const VALIDATE_COMPANY_ID = 'validate_company_id';
  const VISITOR_LIST_UPDATE = 'visitor_list_update';
  const REMOVE_VISITOR = 'remove_visitor';

  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let visitorList;
  companyData.company_id = companyData._id;


    // var curCompany = JSON.parse(localStorage.getItem('currentCompany'));
  const curUser = JSON.parse(localStorage.getItem('currentUser'));
  const companyName = companyData.name;


  $('#user-name').text(`${curUser.first_name} ${curUser.last_name}`);

    // Connect to private socket
    // var companyId = getCookie('company_id');
  socket.emit(VALIDATE_COMPANY_ID, companyData);

   /** *
    * Compile all the Handle Bar Templates
    */
    // DashBoard Template
  const source = $('#visitor-list-template').html();
  const template = Handlebars.compile(source);

    // Modal Template
  const modal = $('#visitor-info-template').html();
  const modalTemplate = Handlebars.compile(modal);

    // SOCKET LISTEN FOR VISITOR QUEUE
  socket.on(VISITOR_LIST_UPDATE, (data) => {
    visitorList = data.visitors;
        // Parse Visitor List to format Date
    for (var i = 0, len = visitorList.length; i < len; i++) {
      visitorList[i].checkin_time = formatTime(visitorList[i].checkin_time);
    }

        // Parse Visitors appoitments
    for (i = 0; i < len; i++) {
      const appList = visitorList[i].appointments;
      if (appList[0]) {
        for (let j = 0, appLen = appList.length; j < appLen; j++) {
          if (compareDate(appList[j].date)) {
            visitorList[i].appointmentTime = formatTime(appList[j].date);
            visitorList[i]._apptId = appList[j]._id;
            break;
          }
        }
      } else {
        visitorList[i].appointmentTime = 'None';
      }
    }

       // visitorList.checkin_time = visitorList;
    const compiledHtml = template(visitorList);
    $('#visitor-list').html(compiledHtml);
  });


    /** *
    * Listener for Opening a Modal
    */
  $(document).on('click', '.patient-check-out', function () {
    const uniqueId = $(this).attr('value');
    const visitor = findVisitor(uniqueId);
    const compiledTemplate = modalTemplate(visitor);
    $('.modal-dialog').html(compiledTemplate);
  });

    /** *
     * Listener for Checking out a Visitor
     */
  $(document).on('click', '.check-in-btn', function () {
    const id = $(this).closest('.modal-content').find('.modal-body').attr('value');
    const apptId = $(this).closest('.modal-content').find('.modal-left').attr('value');

    const removeVisitor = findVisitor(id);

    removeVisitor.visitor_id = removeVisitor._id;

    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      url: `/api/appointments/${apptId}`,
      success(response) {
      },
    });


    socket.emit(REMOVE_VISITOR, removeVisitor);
  });
/*
    $(document).on('click','.checkout-btn',function(){
        var id = $(this).closest('.patient-check-out').attr('value');
        var removeVisitor = findVisitor(id);
        console.log(removeVisitor);
        //removeVisitor.visitor_id = removeVisitor._id;
        //socket.emit(REMOVE_VISITOR, removeVisitor);

    });
*/
    /** *
     * Compare appointment Date to today's Date
     */
  function compareDate(appointment) {
    const today = new Date();
    appointment = new Date(Date.parse(appointment));

    const appointmentDate = `${appointment.getFullYear()} ${appointment.getDate()} ${appointment.getMonth()}`;
    const todayDate = `${today.getFullYear()} ${today.getDate()} ${today.getMonth()}`;

    return (appointmentDate == todayDate);
  }

    /** *
     * Find Specific Visitor Given Visitor ID within the Visitor Array
     * @param id
     * @returns {string}
     */
  function findVisitor(id) {
    for (const visitor in visitorList) {
      if (visitorList.hasOwnProperty(visitor)) {
        if (visitorList[visitor]._id === id) {
          if (DEBUG) console.log(visitorList[visitor]);
          return visitorList[visitor];
        }
      }
    }
  }

    /** *
     * Function to format a JSON date object into a string
     * @param time
     */
  function formatTime(time) {
    let currentTime = new Date(Date.parse(time));
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();

    if (minute < 10) {
      minute = `0${minute}`;
    }

    if (hour >= 13) {
      hour -= 12;
      currentTime = `${hour}:${minute}PM`;
    } else if (hour === 12) {
      currentTime = `${hour}:${minute}PM`;
    } else if (hour === 0) {
      currentTime = `${1}:${minute}AM`;
    } else {
      currentTime = `${hour}:${minute}AM`;
    }

    return currentTime;
  }

  $('#logoutButton').on('click', () => {
    localStorage.setItem('userState', 0);
  });


    /** *
     * TODO order the list by increasing order
     * @param key
     */
  function increasingOrder(key) {

  }

    /** *
     * TODO order the list by decreasing order
     * @param key
     */
  function decreasingOrder(key) {

  }
});
