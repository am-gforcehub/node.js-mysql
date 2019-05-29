# NODE.JS-MYSQL

Get link to Node.js-MySQL instructions [here](https://docs.google.com/document/d/1hjZSPAScGAiXoclKfoBkG__yCQsQOuGTvxihoyPcbo8/edit?usp=sharing)

- **For:** Southern Methodist University Coding Bootcamp
- **Developer:** Alicia Garcia
- **Deployment Date** 05/29/2019
- **Built With** MySQL, Node.js, Javascript

--

### Description & Requirements
---
Bamazon is a command line node application that mimics an Amazon storefront.  By using MySQL and Node.js the app will take in orders from customers and deplete stock from the store's inventory. 

The following commands and the functions of these are noted below.

Commands | Function
---------|---------
beginBamazon  | starts the beginProducts function when the node bamazonCustomer.js is initiated or the user completes a purchase
beginProducts | takes the SELECT * FROM from the schema.sql and console logs all the columns and rows from the 'products' table created to the command line
readBamazon | prompts a question to the user to ask what department they would like to shop in and based on the answer is taken to the function for that particular department using switch case/break statements
" " Search | prompts a question as to what product and the quantity of the product they would like to purchase and console logs that information to the command line
confirmPurchase  | prompts a question if they would like to confirm or cancel the purchase and updates the quantity of the item on the table  


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