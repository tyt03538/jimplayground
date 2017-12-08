#!/usr/bin/python

import math
import re
import datetime
import sys

totalSize = 0
startDate = datetime.date(2017, 8, 24)
endDate = datetime.date(2017, 8, 25)

def nonblank_lines(f):
  for l in f:
    line = l.rstrip()
    if line:
      yield line

def num(s):
  try:
    return int(s)
  except:
    return 0

def convert_size(size_bytes):
  if size_bytes == 0:
    return '0B'
  size_name = ('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
  i = int(math.floor(math.log(size_bytes, 1024)))
  p = math.pow(1024, i)
  s = round(size_bytes / p, 2)
  return "%s %s" % (s, size_name[i])

if len(sys.argv) != 2:
  print 'usage: ./jpg-size <cdn log file>'
  sys.exit(1)

try:
  with open(sys.argv[1]) as logfile:
    next(logfile)
    for line in nonblank_lines(logfile):
      #  split the line by at least one tab and remove trailing tab
      field = re.split(r'\t+', line.rstrip('\t'))
      field = [f.replace(' ', '') for f in field]
      # skip this line if the number of fields is not right
      if len(field) != 4:
	continue
      
      date = datetime.datetime.strptime(field[0], '%Y-%m-%d').date()
      size = num(field[2]) # use self defined function to skip non-int string
      url = field[3]
      
      # add to total size if the condition is right
      if date >= startDate and date <= endDate:
	if url.endswith('jpg'):
	  totalSize += size

  
  print convert_size(totalSize)
except:
  print 'Error opening the file'

