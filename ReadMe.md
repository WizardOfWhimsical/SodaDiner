# SodaDiner

SodaDiner is a web appication in which you may add diners and sodas
to a database. Attaching sodas to the current diners serving them.

## Installation

Follow these Instructions

Anything in a box is to be entered into the Terminal

#### Step 1: Start Up A DataBase

<hr>

1. Open a Terminal window and enter...
   ```
   [ ! -d ~/.mongo ] && mkdir ~/.mongo
   ```
2. Then enter...

```
/usr/local/mongodb/bin/mongod --dbpath ~/.mongo
```

<em>Or if you already have a mongod, start it in the terminal.
Minamize or close as it will stay running either way.
Is needed for the application to work properly.</em>

#### Step 2: Starting up Application

<hr>
Upon opening the zip file containing the Application,

1.  Right click the file labeled <em>SodaDiner</em>
2.  Click new terminal at folder(towards the bottom)
3.  In the Terminal enter....
    ```
    npm install
    ```
4.  After everything is installed then

    (_So that the DB may be seeded with information_)

    ```
    npm run restoreDev
    ```

5.  Enter in Terminal...
    ```
    npm start
    ```
6.  Now open your favorite browser and type in address bar and enjoy

        `localhost:3000`

<br>
    <hr>
<br>
<br>

# SodaDiner Test/Dev Operations

## Automated Service
<hr>

I have made a tool to help automate alot of this functionality, I hope you like it!
1) While the terminal is still open,  enter...

    (_clp = command line process_)

```
npm run clp
```

2) You will the be asked to answer a question based off what you want to do
3) Follow the instructions to get the operations you want to activate
4) If you need to do anything after starting the server you will have to press "Control-C" to stop the server and run any other tests or back up the database

*NOTE: Or you may open another terminal and go to the SodaDiner Directory and run options from their while server is running.*

## Manual Test Script Operations
<hr>

1. Open Terminal @ Directory SodaDiner and enter...
   ```
   npm run
   ```
   This command will show you a list of options you may run want to run. Some command options pertain to development process . Not all are test options so be mindful
2. Descriptions of listed command to run and what they do.

   2.1) First let me show you an example of how to run said option

   ```
   npm run < commandHere >
   ```

   2.2) You will type the option you want to run where the "< commandHere >" is.

## Test Commands
<hr>

1. model -> tests model schema for db
2. controller -> tests that controllers have proper functionality
3. route -> tests route paths and verbs methods
4. crud -> tests Create, Read, Update, Delete operations
5. allTest -> runs all the tests

## Devolper Command
<hr>

1. dumpDev -> makes a back up of db as part of backup strategy
2. restoreDev-> restores the data saved with the dumpDev command
3. dumpTest -> backup of test db
4. restoreTest -> restores dump test
5. prettier -> formats files for proper syntax and readabilty

<br>
<br>
<br>
<br>


<em>I had to make my own logo cause I couldn't get the original</em>
