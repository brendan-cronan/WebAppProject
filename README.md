# WebAppProject
Project Repository for CIS371 Web Applications for Brendan Cronan and Logan Karney's Term Project.



How will new user onboarding, and login flow be implemented
Rough design of your "tables"
User actions/tasks that will trigger real time events to update DB
etc.



# Project Description:
## Outline
We aim to emulate certain features of Google Drive to create a cloud-based file sharing application.

## 1
We will use both a email-based sign in for user authentication.

## 2
We are using RealtimeDB and Google Storage.
We aim to have a table of Documents and a table of users

## 3
We aim to provide a list of documents either uploaded or shared with the user 

## 4
Private data would include: personal documents not shared with any other users
Shared data would include: project documents shared between all users on the project.

## 5
We plan to use React.js

## 6
Our tables will be formatted as such:

| Document       | Description          | Shared With 
| ------------- |:-------------:| -----:
| Presentation.ppt      | EnglishPresentation | Joe, Cindy 
| Proposal.txt     | .. | Joe, Cindy, Matt 

## 7 
Forms will be utilized to submit documents and alter them as required.
They will also be able to add or remove group members and make any necessary changes to the project to collaborate effectively.

## 8 
We will utilize CSS to make our application look sleek and user friendly.

# User updates
Users will be able to update the DB through several options.
1. Adding/Removing a document.
2. Managing Group Members.
3. etc.
