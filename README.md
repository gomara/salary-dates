# Salary Payment Dates

A Node.js utility to generate salary and bonus payment dates for the remainder of the current year, accounting for weekends.

## Features

- Calculates salary payment dates on the **last business day of each month**
- Calculates bonus payment dates on the **15th of each month** (or next Wednesday if it falls on a weekend)
- Exports payment dates to a CSV file
- Handles edge cases for weekend dates

## Requirements

- Node.js (v20 or higher)

## Installation

No external dependencies required. This project uses only Node.js built-in modules. Clone the repository and navigate to the project directory:

## Usage

Run the script with:

```bash
node salary_dates.js
```

This will generate a `payment_dates.csv` file in the current directory.

### Custom Output File

You can specify a custom output filename:

```bash
node salary_dates.js my_payment_dates.csv
```

## Output Format

The generated CSV file contains three columns:

```
Month,Salary Payment Date,Bonus Payment Date
November,2025-11-28,2025-11-19
December,2025-12-31,2025-12-17
```

## How It Works

### Salary Payment Date

- Calculated as the **last day of the month**
- If it falls on Saturday or Sunday, moves back to the previous Friday

### Bonus Payment Date

- Calculated as the **15th of the month**
- If it falls on Saturday or Sunday, moves forward to the next Wednesday

## File Structure

```
salary-payment-dates/
├── salary_dates.js      # Main script
├── README.md            # This file
└── payment_dates.csv    # Generated output (created on run)
```
