# NODE.JS-MYSQL

Get link to LIRI-bot instructions [here](https://docs.google.com/document/d/1hjZSPAScGAiXoclKfoBkG__yCQsQOuGTvxihoyPcbo8/edit?usp=sharing)

- **For:** Southern Methodist University Coding Bootcamp
- **Developer:** Alicia Garcia
- **Deployment Date** 05/29/2019
- **Built With** MySQL, Node.js, Javascript

--

### Description & Requirements
---
Bamazon is a command line node application that mimics an Amazon storefront.  By using MySQL the app will take in orders from customers and deplete stock from the store's inventory. 

The following commands and the functions of these are noted below.

Commands | Function
---------|---------
beginBamazon  | starts the beginProducts function when the node bamazonCustomer.js is initiated or the user completes a purchase
beginProducts | takes the SELECT * FROM from the schema.sql and console logs all the columns and rows from the 'products' table created to the command line
readBamazon | prompts a question to the user to ask what department they would like to shop in and takes based on the answer is taken to the function for the particular department using switch case/break statements
 | uses the **OMDB** API to take a movie name and returns the following: - **Movie Title** - **Release Year** - **Rotten Tomato Rating** - **IMDb Rating** - **Country** - **Language** - **Plot** - **Lead Actors**
do-what-it-says | uses the built in **readFile()** method to access data from a prepopulated .txt file and return its information as a command/search query.  This uses the spotSong() to return the song "I want it that way"

**Before you get started, make sure you have these node packages installed:**
1. **mysql:** a driver to access and perform with MySQL on the application.

     *Command Line: 'npm install mysql'*


2. **inquirer:** - A collection of common interactive command line user interfaces that allows the user to do the following: 
-**providing error feedback
-**asking questions
-**parsing input
-**validating answers
-**managing hierarchical prompts

     *Command Line: 'npm install inquirer'*


Read more about these methods [here](https://www.npmjs.com/)

--

### Functionality

---

- **Demo**
See a full demo on the functionality of the app [here!]()