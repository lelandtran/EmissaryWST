import random
from sklearn import svm
from sklearn import linear_model
from sklearn.metrics import accuracy_score

def parseData(fname):
  for l in open(fname):
    yield l.split(',')

print "reading data"
data = [x[:-1]+[x[-1][:-1]] for x in list(parseData("No-show-Issue-Comma-300k.csv"))]
variableNames = data[0]
data = data[1:]
random.shuffle(data)

dayMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6 }

age = [int(x[0]) for x in data]
gender = [0 if x[1]=='M' else 1 for x in data]
day = [dayMap[x[4]] for x in data]
status = [0 if x[5]=="No-Show" else 1 for x in data]
sms = [int(x[14]) for x in data]

split = len(data)*3/4

X = []
for i in range(len(status)):
  temp = [age[i],gender[i],sms[i],0,0,0,0,0,0,0]
  temp[day[i]+3] += 1
  X.append(temp)

trainX = X[:split]
validX = X[split:]
trainY = status[:split]
validY = status[split:]

clf = linear_model.LogisticRegression()
clf.fit(trainX,trainY)
trainPredict = clf.predict(trainX)
validPredict = clf.predict(validX)
print clf.coef_
print 'training set accuracy: ' + str(accuracy_score(trainY, trainPredict))
print 'validation set accuracy: ' + str(accuracy_score(validY, validPredict))

t_pos = sum([(a and b) for (a,b) in zip(validPredict, validY)])
t_neg = sum([(not a and not b) for (a,b) in zip(validPredict, validY)])
f_pos = sum([(a and not b) for (a,b) in zip(validPredict, validY)])
f_neg = sum([(not a and b) for (a,b) in zip(validPredict, validY)])

print('test set total:' + str(len(validY)))
print("TP: " + str(t_pos) + " TN: " + str(t_neg) + " FP: " + str(f_pos) + " FN: " + str(f_neg))

ber = 0.5*(float(f_pos)/float(f_pos+t_neg) + float(f_neg)/float(f_neg+t_pos))
print("Balanced Error Rate: " + str(ber))

