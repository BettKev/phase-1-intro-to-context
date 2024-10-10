// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [], // Initialize as empty array
      timeOutEvents: [] // Initialize as empty array
    };
  }


  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord); // Use map to apply createEmployeeRecord to each nested array
  }
  

  function createTimeInEvent(employeeRecord, dateStamp) {
    // Split the date stamp into date and hour components
    const [date, hour] = dateStamp.split(" ");
    
    // Create the new timeIn event object
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour), // Convert hour string ("HHMM") to an integer
      date: date // Date part ("YYYY-MM-DD")
    };
    
    // Add the new timeIn event object to the employee's timeInEvents array
    employeeRecord.timeInEvents.push(timeInEvent);
    
    // Return the updated employee record
    return employeeRecord;
  }
  

  function createTimeOutEvent(employeeRecord, dateStamp) {
    // Split the date stamp into date and hour components
    const [date, hour] = dateStamp.split(" ");
    
    // Create the new timeOut event object
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour), // Convert hour string ("HHMM") to an integer
      date: date // Date part ("YYYY-MM-DD")
    };
    
    // Add the new timeOut event object to the employee's timeOutEvents array
    employeeRecord.timeOutEvents.push(timeOutEvent);
    
    // Return the updated employee record
    return employeeRecord;
  }
  

  function hoursWorkedOnDate(employeeRecord, date) {
    // Find the timeIn event for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    
    // Find the timeOut event for the same date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    // Calculate the hours worked by subtracting the timeIn from timeOut and dividing by 100 to convert from HHMM to hours
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    
    // Return the number of hours worked
    return hoursWorked;
  }
  

  function wagesEarnedOnDate(employeeRecord, date) {
    // Get the number of hours worked on the given date
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    
    // Multiply the hours worked by the employee's pay rate
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    
    // Return the wages earned
    return wagesEarned;
  }
  

  function allWagesFor(employeeRecord) {
    // Get all dates from the timeInEvents array
    const workedDates = employeeRecord.timeInEvents.map(event => event.date);
    
    // Use reduce to accumulate total wages
    const totalWages = workedDates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    
    // Return the total wages for all worked dates
    return totalWages;
  }
  

  function calculatePayroll(employeeRecords) {
    // Use reduce to accumulate total payroll
    const totalPayroll = employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  
    // Return the total payroll for all employees
    return totalPayroll;
  }
  