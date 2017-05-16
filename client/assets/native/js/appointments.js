$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;
  const curUser = JSON.parse(localStorage.getItem('currentUser'));


  $('#user-name').text(`${curUser.first_name} ${curUser.last_name}`);

  let appts = getAppts();

  function initializeAppts(appts) {
    appts.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0, len = appts.length; i < len; i++) {
      appts[i].fullDate = formatDate(appts[i].date.toString());
      appts[i].appointmentTime = formatTime(appts[i].date.toString());
    }
    return appts;
  }

  appts = initializeAppts(appts);
  const source = $('#appt-list-template').html();
  const template = Handlebars.compile(source);
  const compiledHtml = template(appts);

  $('#appt-list').html(compiledHtml);
  $('.save-btn').click(submitForm);

   /** *
     * Makes a get request to display list of appts
     * @param none
     * @returns displays the appt list
     */
  function getAppts() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'GET',
      data: $('#response').serialize(),
      async: false,
      url: `/api/appointments/company/${myCompanyId}`,
      success(response) {
        json = response;
        console.log(response);
      },
    });
    return json;
  }

   /** *
     * When a patient submits their form
     * @param none
     * @returns updates the appt list
     */
  function submitForm() {
    const d = grabFormElements();
    console.log(d);
    updateApptList(d);
    appts = getAppts();
    appts = initializeAppts(appts);
    $('#appt-list').html(template(appts));
    document.getElementById('appt-form').reset();
  }

    /** *
     * Makes a post request to update list of appts when adding a new employee
     * @param none
     * @returns updates the appt list
     */
  function updateApptList(obj) {
    $.ajax({
      dataType: 'json',
      type: 'POST',
      data: obj,
      async: false,
      url: '/api/appointments/',
      success(response) {
        appts.push(response);
        console.log(response);
      },
    });
  }


    /** *
     * Grabs elements from the check in and puts it into an object
     * @param none
     * @returns new appt object
     */
  function grabFormElements() {
    const newAppt = {};
    let userTime,
      userDate;
    newAppt.company_id = myCompanyId;
    newAppt.first_name = $('#appt-first').val();
    newAppt.last_name = $('#appt-last').val();
    newAppt.phone_number = $('#appt-number').val();
    newAppt.provider_name = $('#appt-provider').val();

    userDate = $('#appt-date').val();
    userTime = $('#appt-time').val();

    newAppt.date = jsDate(userDate, userTime);
    return newAppt;
  }

  $(document).on('click', '.delete-appt', function () {
    const apptId = $(this).closest('.appt-row').attr('value');
    console.log('delete');
    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      url: `/api/appointments/${apptId}`,
      success(response) {
        const updateAppts = getAppts();
        const removeAppt = initializeAppts(updateAppts);
        $('#appt-list').html(template(removeAppt));
      },
    });
  });


    /** ******************* FUNCTIONS TO FORMAT JAVASCRIPT DATES ********************/

  function formatDate(date) {
    const d = new Date(Date.parse(date));
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let dd = d.getDate();
      // var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep","Nov","Dec"];
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
      // console.log(monthArray[mm]);
    return `${mm}/${dd}/${+yyyy}`;
  }
  function formatNumber(number) {
    return `(${number.substr(0, 3)})${number.substr(3, 3)}-${number.substr(6, 4)}`;
  }

    // FUNCTION TO FORMAT DATE OBJECT IN JS
  function jsDate(date, time) {
    const jsDate = reFormatDate(date);
    const jsTime = reFormatTime(time);
    jsDateObj = `${jsDate} ${jsTime}`;
    return jsDateObj;
  }

    // FUNCTION TO FORMAT DATE TO JS FOR ROBOTS
  function reFormatDate(date) {
    const d = new Date(Date.parse(date));
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let dd = d.getDate();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }


    // FUNCTION TO FORMAT TIME TO JS FOR ROBOTS
  function reFormatTime(time) {
    const ampm = time.substr(-2, 2);
    let formattedTime;
    let formattedHour;
    const colon = time.indexOf(':');

    if (ampm === 'PM') {
      formattedHour = time.substr(0, 2);

      if (formattedHour == '12') { formattedHour = 12; } else { formattedHour = 12 + parseInt(time.substr(0, 2)); }

      formattedTime = `${formattedHour + time.substr(colon, 3)}:00`;
    } else {
      formattedHour = parseInt(time.substr(0, 2));
      if (formattedHour < 10) {
        formattedHour = `0${formattedHour}`;
      }
      if (formattedHour == 12) {
        formattedHour = '00';
      }
      formattedTime = `${formattedHour + time.substr(colon, 3)}:00`;
    }

    return formattedTime;
  }


    // FUNCTION TO FORMAT TIME TO AM AND PM FOR HUMANS
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
});
