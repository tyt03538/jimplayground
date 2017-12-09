# (Python) JPG file transfer as logged in CDN

For this question, I have chosen Python as the programming language for its concise syntax.

I have made the following assumption:
1. The dates are all valid date and may contain spaces.
2. The file extension are all in lower case (as specified in the question).
3. There are no log lines before the header row.

Since integers in Python are of abitrary pecision, so no need to worry about value overflow for the sum of size.

Three files are created to cover the following test cases:
1. File extension check
2. Corrupted size value
3. Log lines out of the specified date range
4. Log file without no log lines other than the header line
5. Empty file

Expected Output:
```
./jpg_size.py cdn_test1.log
82.36KB
```

```
./jpg_size.py cdn_test2.log
0B
```

```
./jpg_size.py cdn_test3.log
0B
```
