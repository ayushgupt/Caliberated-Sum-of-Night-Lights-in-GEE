# Calibrated-Sum-of-Night-Lights-in-GEE
DMSP-OLS Night Light dataset is uncaliberated. Using the coefficients of calibration provided in the below paper, script is provided to obtain time series Sum of Lights for any required region(s).

#### Calibration Paper Used  
Intercalibration of DMSP-OLS night-time light data by the invariant region method  
Jiansheng Wu , Shengbin He , Jian Peng , Weifeng Li  & Xiaohong Zhong  
Link: http://www.tandfonline.com/doi/full/10.1080/01431161.2013.820365?src=recsys

#### geeCode.js
This code can be run on GEE javascript Code Editor and export folder and csv file names can be modified as needed. Also, its advisable to have zero as the digital number threshold but it can also be changed as needed.


#### showGraph.py
This can be used to construct a plot of SOL variation over the years. The according CSV file name needs to be hardcoded in it.

#### egyptTLIZero.csv
CSV obtained by exporting yearly Egypt data.


#### EgyptThresZero.png
The Image obtained closely resembles the image provided in the paper.
![alt text](https://github.com/ayushgupt/Caliberated-Sum-of-Night-Lights-in-GEE/blob/master/EgyptThresZero.png "Yearly Egypt TLI")



