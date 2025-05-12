# Cost Estimator for Self-Employed

A Next.js application for self-employed individuals to estimate project costs, calculate feature costs, apply taxes, and generate invoices.

## Features

- **Expense Input**: Add and remove project expenses like server costs, subscriptions, etc.
- **Feature Cost Calculation**: Calculate costs based on feature complexity and hourly rates
- **Tax Calculation**: Apply appropriate tax rates for self-employed individuals
- **Total Project Cost**: View a breakdown of expenses, features, tax, and total cost
- **Invoice Generation**: Create a PDF invoice with all project details

## Tech Stack

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cost-estimator-project.git
   cd cost-estimator-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Add Expenses**: Enter expense names and amounts in the expense section.
2. **Add Features**: Define project features, their complexity, estimated hours, and hourly rates.
3. **Adjust Tax Rate**: Set the appropriate tax rate for your self-employment situation.
4. **Generate Invoice**: Enter your name and generate a downloadable PDF invoice.

## Project Structure

```
cost-estimator-project/
├── app/
│   ├── page.tsx       # Main application page
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/
│   ├── expense-form.tsx        # Expense input form
│   ├── feature-form.tsx        # Feature input form
│   ├── tax-calculator.tsx      # Tax rate adjustment
│   ├── total-cost-display.tsx  # Cost breakdown display
│   ├── invoice-generator.tsx   # PDF invoice generator
│   └── ui/                     # Shadcn UI components
├── lib/
│   └── utils.ts                # Utility functions
└── public/
    └── ...
```

## License

This project is licensed under the MIT License. 