// Your code here
  function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return employee
  }
   
   function createEmployeeRecords(array){
    const arrayOfEmployees = []

    for(let i = 0; i < array.length; i++){
       arrayOfEmployees.push(createEmployeeRecord(array[i]))
    }

    return arrayOfEmployees

   }
   function splitTimeIn(timeIn){
    return timeIn.split(" ")
}
function createTimeInEvent(empObj, dateString){
    const timeInData = splitTimeIn(dateString)
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeInData[1]),
        date: timeInData[0]
    }

    empObj.timeInEvents.push(timeInEvent)
    return empObj
}
function splitTimeOut(timeOut){
    return timeOut.split(" ")
}

function createTimeOutEvent(empObj, dateString){
    const timeOutData = splitTimeOut(dateString)
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeOutData[1]),
        date: timeOutData[0]
    }

    empObj.timeOutEvents.push(timeOutEvent)
    return empObj
}
function findWorkOnDate(timeEventsOfEmployee, date){
    const timeEvent = timeEventsOfEmployee.find(timeEvent => timeEvent.date === date)
    return timeEvent
}

function hoursWorkedOnDate(empObj, dateString){
   const timeInEvent = findWorkOnDate(empObj.timeInEvents,dateString)
   const timeOutEvent = findWorkOnDate(empObj.timeOutEvents,dateString)

   const duration = (timeOutEvent.hour - timeInEvent.hour)/100
   return duration
}
function wagesEarnedOnDate(empObj, dateString){
    const payOwed = (empObj.payPerHour * (hoursWorkedOnDate(empObj,dateString)))
    return payOwed
}
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(timeInEvent => timeInEvent.date); 

    let allWages = 0;

    dates.forEach(date => {
        allWages = allWages + wagesEarnedOnDate(employee, date);
    });

    return allWages;
}

function calculatePayroll(arrayOfEmployees){
    let allWages = 0
    arrayOfEmployees.forEach(employee => {
        allWages = allWages + allWagesFor(employee)
    })

    return allWages
}
