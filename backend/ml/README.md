Author: Kevin Kuo

Date: 5/29/17

This folder contains rudimentary feature training using logistic regression on
a publicly availible dataset of medical appointment noshows. It was not included 
due to size constraints. Please download it yourself to run the training model.

Dataset used can be found here: https://www.kaggle.com/joniarroba/noshowappointments


### Files:
noshow.py is used to train the prediction model.
predictNoShow.py was created using the model's coefficiencts generated from noshow.py.

### Make Predictions:
Use predictNoShow.py to predict whether a patient will show up to their appointment
with the following command: 

python predictNoShow.py (Age) (M or F) (# of sms) (Day of the week)
