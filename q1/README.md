# (MySQL) Test Cases used for Q1

For Q1, I have chosen MySQL sql queries to achieve the requirement.

The sql statement is provided inside the soln.sql file.

To test the validity of the sql statement, the following test cases are derived:

1. User has installation record on that day and use the app at least once
2. User has installation record on that day and have not used the app
3. User has installation record on another day and use the app at least once
4. User has installation record on another day and have not used the app
5. User does not have record and use the app at least once
6. User does not have record and have not used the app

For test case 1, 3, and 5, two record sets are created. One for multiple access records and one for single access record.

For test case 1, which is the only case to count, multiple record sets are created to verify the counting logic.

All the test case record sets are created using the sql command file generate_test.sql

The command file specifies the database, table creations and record insertions.

Please note that the testing table will be dropped. Do the necessities to prevent any data loss.

Expected Output:
```
usage_count
2
```
