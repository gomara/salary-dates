const outputFile = process.argv[2] || "payment_dates.csv";
const WEDNESDAY = 3;
const SUNDAY = 0;
const SATURDAY = 6;

// Check if a date falls on a weekend
const isWeekend = (date) => {
  const day = date.getDay();
  return day === SUNDAY || day === SATURDAY;
};

// Calculate bonus payment date
const calculateBonusDate = (year, month) => {
  const bonusDate = new Date(year, month, 15);

  if (!isWeekend(bonusDate)) {
    return bonusDate;
  }

  let nextDate = new Date(bonusDate);
  while (true) {
    nextDate.setDate(nextDate.getDate() + 1);
    if (nextDate.getDay() === WEDNESDAY) {
      return nextDate;
    }
  }
};

// Calculate salary payment date
const calculateSalaryDate = (year, month) => {
  const lastDay = new Date(year, month + 1, 0);

  if (!isWeekend(lastDay)) {
    return lastDay;
  }

  let previousDate = new Date(lastDay);
  while (isWeekend(previousDate)) {
    previousDate.setDate(previousDate.getDate() - 1);
  }
  return previousDate;
};

// Formatting date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get month name from month index
const getMonthName = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

// Generate payment dates and write to CSV
const generatePaymentDates = () => {
  const fs = require("node:fs");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let csvContent = "Month,Salary Payment Date,Bonus Payment Date\n";

  for (let month = currentMonth; month <= 11; month++) {
    const monthName = getMonthName(month);
    const salaryDate = calculateSalaryDate(currentYear, month);
    const bonusDate = calculateBonusDate(currentYear, month);

    csvContent += `${monthName},${formatDate(salaryDate)},${formatDate(
      bonusDate
    )}\n`;
  }

  try {
    fs.writeFileSync(outputFile, csvContent);
    console.log(`Payment dates generated successfully: ${outputFile}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    process.exit(1);
  }
};

generatePaymentDates();
