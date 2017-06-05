import sys
import numpy

if len(sys.argv) != 5:
  raise ValueError("Must follow argument format: python predictNoShow.py (Age) (M or F) (# of sms) (Day of the week)")

dayMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6 }

X = [int(sys.argv[1]),0,int(sys.argv[3]),0,0,0,0,0,0,0]
X[1] = 0 if sys.argv[2]=='M' else 1
X[dayMap[sys.argv[4]]+3] += 1

X = X
theta = [0.00965217, 0.01597928, 0.00893477, 0.07033704, 0.2051192, 0.15896995, 0.17961268, 0.11414876, -0.27970307, 0.00115265]
res = (numpy.matrix(X)*numpy.matrix(theta).T).item(0)

print "Show-Up" if res > 0.5 else "No-Show"
