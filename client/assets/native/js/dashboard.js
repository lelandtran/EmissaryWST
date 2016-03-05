
$(document).ready(function(){

    var socket = io(); //Initialize Socket

    //Socket variables
    var DEBUG = 1;
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var REMOVE_VISITOR = "remove_visitor";

    //HARD CODED FOR NOW
    var companyData = {
        company_id: "56d40a6aa6de7129d0a4b1f6",
        name: "WST",
        credit_card_number: "12345678912",
        expiration_date: "2018-4-24",
        email: "danielK@wst.com",
        phone_number: "3109851473",
        paid_time: "2016-04-23T18:25:43.511Z"
    };

    var visitorList;

    //Connect to private socket
    // var companyId = getCookie('company_id');
    socket.emit(VALIDATE_COMPANY_ID, companyData);

   /***
    * Compile all the Handle Bar Templates
    */
    //DashBoard Template
    var source = $("#visitor-list-template").html();
    var template = Handlebars.compile(source);

    //Modal Template
    var modal = $('#visitor-info-template').html();
    var modalTemplate = Handlebars.compile(modal);

    //SOCKET LISTEN FOR VISITOR QUEUE
    socket.on(VISITOR_LIST_UPDATE, function (data) {
        if(DEBUG)console.log("VISITOR_LIST_UPDATE");

        visitorList = data.visitors;

        //Parse Visitor List to format Date
        for(var i = 0, len = visitorList.length; i< len; i++){
            visitorList[i].checkin_time = formatTime(visitorList[i].checkin_time);
        }
        visitorList.checkin_time = visitorList;

        //localStorage.setItem("VISITOR_QUEUE", data);
        var compiledHtml = template(visitorList);
        $('#visitor-list').html(compiledHtml);
    });


    /***
     * Key listener for search
     */


    /***
    * Listener for Opening a Modal
    */
    $(document).on('click','.patient-check-out',function(){
        var uniqueId = $(this).attr('value');
        var visitor = findVisitor(uniqueId);
        var compiledTemplate = modalTemplate(visitor);
        $('.modal-dialog').html(compiledTemplate);
    });

    /***
     * Listener for Checking out a Visitor
     */
    $(document).on('click','.check-in-btn',function(){
       var id = $(this).closest('.modal-content').find('.modal-body').attr('value');
        var removeVisitor = findVisitor(id);
        console.log(removeVisitor);
        removeVisitor.visitor_id = removeVisitor._id;
        socket.emit(REMOVE_VISITOR, removeVisitor);

    });

    /***
     * Find Specific Visitor Given Visitor ID within the Visitor Array
     * @param id
     * @returns {string}
     */
    function findVisitor(id){

        for(var visitor in visitorList) {
           if(visitorList.hasOwnProperty(visitor)){
              if(visitorList[visitor]._id === id){
                  if(DEBUG) console.log(visitorList[visitor]);
                  return visitorList[visitor];
              }
           }
        }
    }

    /***
     * Function to format a JSON date object into a string
     * @param time
     */
    function formatTime(time){
        var currentTime = new Date(Date.parse(time));
        var hour = currentTime.getHours();
        var minute = currentTime.getMinutes();

        if(minute < 10) {
            minute = '0' + minute;
        }

        if(hour >= 13){
            hour = hour-12;
            currentTime = hour + ':' + minute + 'PM';
        }

        else if(hour === 12){
            currentTime = hour + ':' + minute +'PM';
        }
        else if(hour === 0){
            currentTime = 1 + ':' + minute + 'AM';
        }
        else{
            currentTime = hour + ':' + minute +'AM';
        }

        return currentTime;

    }


    /*** NEEDS TESTING (WIP)
     * Find a specific cookie name
     * @param cName
     * @returns {string|*}
     */
    function getCookie(cName) {
        var name = cName + '=';
        var cookieArray = document.cookie.split(';');

        for (var i = 0, len = cookieArray.length; i < len; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ')
                cookie.substring(1);
            if (cookie.indexOf(name) == 0)
                return cookie.substring(name.length, cookie.length);
        }

    }



    /***
     * TODO order the list by increasing order
     * @param key
     */
    function increasingOrder(key){

    }

    /***
     * TODO order the list by decreasing order
     * @param key
     */
    function decreasingOrder(key){

    }

});
