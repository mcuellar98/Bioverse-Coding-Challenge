# Bioverse-Coding-Challenge

Description:
This is a small app with two functions. Users can submit a ticket through a created form and Admins have a seperate page to see all submitted tickets.

See the full app here: http://ec2-34-233-135-235.compute-1.amazonaws.com:3000/

Tech Stack:
- Front-End: React and Typescript
- Back-End: Node.js and Express
- DBMS: PostgreSQL
- Deploymnet: AWS

Features:
- Seperate pages for home page, ticket form, and ticket table using React Routes.
- Disabled submitting on form unless all required fields are filled and email matches regex pattern.
- Parametrized queries to escape possible problmeatic inputs in form.
- Ticket Table with ability to sort each column by ascending/descending.
- If 'status' or 'Date Updated' will resort the table if changed and the table is being sorted by that column.
- A modal to view and respond to help desk complaints, asccessible by clicking on 'Reply' or the problem description.


Future Improvements:
- Add ability to delete rows.
- Adding buttons to see more or less tickets.
- Improved styling.
- Display message correspondence in response modal.
- Add login-in, authentication, and cookies to handle user/admin page access.
