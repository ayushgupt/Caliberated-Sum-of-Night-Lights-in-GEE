import itertools
import pandas as pd
from operator import itemgetter
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv("egyptTLIZero.csv")
df=df.drop('.geo', axis=1)
df=df.drop('system:index', axis=1)


newDict1={}
newDict={}

for index,row in df.iterrows():
	if(newDict.has_key(row['name'])):
		satelliteNum=int(row['index'][1:3])
		year=int(row['index'][3:7])
		newDict1[row['name']][(satelliteNum, year)] = row['area']
		newDict[row['name']].append((row['index'],row['area']))
	else:
		empList=[]
		newDict[row['name']]=empList
		satelliteNum = int(row['index'][1:3])
		year = int(row['index'][3:7])
		newDict1[row['name']]={}
		newDict1[row['name']][(satelliteNum, year)]= row['area']
		newDict[row['name']].append((row['index'], row['area']))


for distName in newDict:
	newDict[distName].sort(key=itemgetter(0))
	# del newDict1[distName][(15,2008)]
	# del newDict1[distName][(18,2011)]
	# del newDict1[distName][(18,2012)]
	# del newDict1[distName][(18,2013)]




# Make Chart
distNameList=[4]
satelliteNumList=[10,12,14,15,16,18]
yearNumList=[]
yearTemp=1992
while(True):
	yearNumList.append(yearTemp)
	yearTemp+=1
	if(yearTemp==2014):
		break



for distName in distNameList:
	satelliteWiseListArea={}
	satelliteWiseListYear={}
	for satNum in satelliteNumList:
		firstLine = True
		for yearNum in yearNumList:
			if(newDict1[distName].has_key((satNum,yearNum))):
				if firstLine:
					firstLine=False
					satelliteWiseListArea[satNum]=[]
					satelliteWiseListArea[satNum].append(newDict1[distName][(satNum, yearNum)])
					satelliteWiseListYear[satNum] = []
					satelliteWiseListYear[satNum].append(yearNum)
				else:
					satelliteWiseListArea[satNum].append(newDict1[distName][(satNum, yearNum)])
					satelliteWiseListYear[satNum].append(yearNum)
	plt.plot(
		np.asarray(satelliteWiseListYear[10], dtype=np.float32)
		,np.asarray(satelliteWiseListArea[10], dtype=np.float32)
		,'b--')
	plt.plot(
		np.asarray(satelliteWiseListYear[12], dtype=np.float32)
		, np.asarray(satelliteWiseListArea[12], dtype=np.float32)
		, 'g--')
	plt.plot(
		np.asarray(satelliteWiseListYear[14], dtype=np.float32)
		, np.asarray(satelliteWiseListArea[14], dtype=np.float32)
		, 'r--')
	plt.plot(
		np.asarray(satelliteWiseListYear[15], dtype=np.float32)
		, np.asarray(satelliteWiseListArea[15], dtype=np.float32)
		, 'c--')
	plt.plot(
		np.asarray(satelliteWiseListYear[16], dtype=np.float32)
		, np.asarray(satelliteWiseListArea[16], dtype=np.float32)
		, 'm--')
	plt.plot(
		np.asarray(satelliteWiseListYear[18], dtype=np.float32)
		, np.asarray(satelliteWiseListArea[18], dtype=np.float32)
		, 'y--')



plt.show()







# Print header
# for distName in newDict:
# 	print "distName",
# 	for a,b in newDict[distName]:
# 		print ",",a,
# 	print ""
# 	break
#
# for distName in newDict:
# 	print distName,
# 	for a,b in newDict[distName]:
# 		print ",",b,
# 	print ""
