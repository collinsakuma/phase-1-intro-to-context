// Your code here
const bob = createEmployeeRecord(['Bob', 'Smith', 'Foreman', 5])

function createEmployeeRecord(array) {
    const EmployeeObject = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return EmployeeObject;
}


function createEmployeeRecords(arrays) {
    const allEmployeeRecords = [];
    arrays.forEach(array => allEmployeeRecords.push(createEmployeeRecord(array)))
    return allEmployeeRecords;
}

function createTimeInEvent(employeeObj, clockIn) {
    const [date, time] = clockIn.split(' ')
    employeeObj.timeInEvents.push({type: 'TimeIn', hour: parseInt(time), date: date,})
    return employeeObj;
}

function createTimeOutEvent(employeeObj, clockOut) {
    const [date, time] = clockOut.split(' ')
    employeeObj.timeOutEvents.push({type: 'TimeOut', hour: parseInt(time), date: date,})
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateWorked) {
    const hourStarted = employeeObj.timeInEvents.find(inEvent => inEvent.date === dateWorked);
    const hourEnded = employeeObj.timeOutEvents.find(outEvent => outEvent.date === dateWorked);
    return (hourEnded.hour - hourStarted.hour) / 100;
}

function wagesEarnedOnDate(employeeObj, date) {
    return (hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour);
}

function allWagesFor(employeeObj) {
    const daysWorked = [];
    let wagesEarned = 0;
    employeeObj.timeInEvents.forEach(day => daysWorked.push(day.date));
    daysWorked.forEach(day => {
        wagesEarned += wagesEarnedOnDate(employeeObj, day);
    })
    return wagesEarned;
}

function calculatePayroll(employeeArray) {
    let totalWagesPayable = 0;
    employeeArray.forEach(employee => {
        totalWagesPayable += allWagesFor(employee);
    })
    return totalWagesPayable;
}

// {
//     firstName: 'Bob',
//     familyName: 'Smith',
//     title: 'Foreman',
//     payPerHour: 5,
//     timeInEvents: [ { type: 'TimeIn', hour: 900, date: '2023-02-17' } ],
//     timeOutEvents: [ { type: 'TimeOut', hour: 1700, date: '2023-02-17' } ]
//   }
createTimeInEvent(bob, '2023-02-17 0900');
createTimeInEvent(bob, '2023-02-18 0900');
createTimeOutEvent(bob, '2023-02-17 1700');
createTimeOutEvent(bob, '2023-02-18 1700');
//console.log(bob);
//console.log(createEmployeeRecords([['tom','smith','foreman',4],['tom','smith','foreman',4]]))
//console.log(bob.timeInEvents[0].date)
hoursWorkedOnDate(bob, '2023-02-17');
console.log(allWagesFor(bob));


// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// createTimeInEvent(cRecord, "0044-03-14 0900")
// createTimeOutEvent(cRecord, "0044-03-14 2100")
// createTimeInEvent(cRecord, "0044-03-15 0900")
// createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(allWagesFor(cRecord));