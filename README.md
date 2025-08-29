# ENG TRACKER APP FE (C.R.A.C.K - REVOU SHANGHAI)

This is a Front-end app for "Engineer Tracker Web App" that hopefully will be used (in a corporate situation) to track Engineer's daily timesheet and weekly report. Although still lacks a lot of feature, this will serve as a point to what I can understand and achieve up to this day.

From almost a 0-knowledge person when it come to HTTP/CSS/JS/TS, to now building the whole Web App using a pretty sophisticated framework.
I appreciate myself for the effort (~14 days of it), and of course all parties that have made me come this far.

This will not be my last HURRAH.

Ps. Won't be fancy readme, I'm running out of time.

## TLDR: [Deployed FE App](https://final-project-fe-kebejoan.vercel.app/)

Go check the face of the project [here](https://final-project-fe-kebejoan.vercel.app/)

Perhaps want to check BE endpoint? [Click Here](https://final-project-be-kebejoan-production.up.railway.app/)

Or check the API Doc [here](https://final-project-be-kebejoan-production.up.railway.app/doc-api)

## 💻 Open This Project Locally

Feel free to open and run the project on your local machine!

1. Clone the repository first

   ```sh
   https://github.com/revou-fsse-feb25/final-project-fe-kebejoan.git
   ```

2. Navigate to the folder in your CLI

   ```sh
   cd .\final-project-fe-kebejoan\
   ```

3. Run the code command (might differ in your machine)

   ```sh
   code .
   ```

4. Install packages using package manager

   ```sh
   pnpm install
   ```

5. Deploy on development environment

   ```sh
   pnpm run dev
   ```

6. Dont Forget to Add Your Secret

   ```sh
   .env.local
   ```

## STACK USED

1. NEXT JS as the NodeJS App Front End framework
2. SHADCN/UI as the UI Library
3. REACT HOOK FORM as the Form Validator

## Features Implemented

1. Create Project
2. Update Project
3. Delete Project
4. Advance a phase of a Project
5. Create timesheet report (daily report)
6. Create progress report (weekly report)
7. Search/Filter a project and report
8. Role base functions and access
9. Middleware implementation
10. Authentication and authorization implementation
11. Implement the React Hook Form for form validation

## FE Routes

```
/login/
/main/dashboard
/main/projects
/main/projects/create
/main/projects/[pjtNo]
/main/projects/[pjtNo]/edit
/main/progress
/main/progress/create
/main/progress/[id]
/main/timesheet
/main/timesheet/create
/main/timesheet/[id]
[soon]
/main/users/
/main/users/create
/main/users/[id]
/main/users/[id]/edit
```

## Some Pictures
