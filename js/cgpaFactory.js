"use strict";angular.module("cgpaCalculator").factory("cgpaFactory",function($http){function getGradePoints(){var gradePoints={"A+":4.0,"A":3.75,"A-":3.50,"B+":3.25,"B":3.0,"B-":2.75,"C+":2.50,"C":2.25,"D":2.0,"F":0.0};return gradePoints;}
function getGrades(){var grades=getGradePoints();return Object.keys(grades);}
function getCreditHours(){return[4,3,2,1,0];}
function getStanding(data,gradeType){if(isNaN(data[gradeType])){return data;}
if(data[gradeType]>=3.8){data[gradeType+"Standing"]="❤️😯 অসাধারন ফলাফল";data[gradeType+"Animation"]=true;data[gradeType+"ProgressBar"]="progress-bar progress-bar-success";}else if(data[gradeType]>=3.5&&data[gradeType]<3.8){data[gradeType+"Standing"]="😯 অনেক ভাল ফলাফল";data[gradeType+"Animation"]=true;data[gradeType+"ProgressBar"]="progress-bar-info";}else if(data[gradeType]>=2&&data[gradeType]<3.5){data[gradeType+"Standing"]="😊 ভাল ফলাফল ";data[gradeType+"ProgressBar"]="progress-bar-warning";}else{data[gradeType+"Standing"]="😡 ফলাফল ভাল নয় - আপনার শিক্ষক এর কথা বলুন";data[gradeType+"ProgressBar"]="progress-bar-danger";}
data[gradeType+"ProgressBarWidth"]=(data[gradeType]/4.00)*100;return data;}
function calculateGPA(data){var gradePoints=getGradePoints();var result={"totalCredits":0,"gpa":0,"gradePoint":0};var dataKey;for(dataKey in data){if(!data.hasOwnProperty(dataKey)||data[dataKey]===null){continue;}
if("hour"in data[dataKey]&&"grade"in data[dataKey]){if(!["W","WP"].includes(data[dataKey].grade)){var credit=gradePoints[data[dataKey].grade]*data[dataKey].hour;result["totalCredits"]+=data[dataKey].hour;result["gradePoint"]+=credit;}}}
result["gpa"]=(result["gradePoint"]/result["totalCredits"]).toFixed(4).slice(0,-2);result=getStanding(result,"gpa");return result;}
function calculateGPAExpected(data,result){var totalGradePoint=data["creditsCompleted"]*data["cgpa"];var expectedTotalGradePoint=data["cgpaExpected"]*(data["currentCredits"]+data["creditsCompleted"]);result["gpaExpected"]=((expectedTotalGradePoint-totalGradePoint)/data["currentCredits"]).toFixed(4).slice(0,-2);return result}
function calculateCGPA(data,result){var totalCredits=result["totalCredits"]+data["creditsCompleted"];var totalGradePoint=(data["creditsCompleted"]*data["cgpa"])
+result["gradePoint"];result["cgpaCalculated"]=(totalGradePoint/totalCredits).toFixed(4).slice(0,-2);result=getStanding(result,"cgpaCalculated")
if("currentCredits","cgpaExpected"in data){result=calculateGPAExpected(data,result);}
return result;}
function calculateGrades(data){var result=calculateGPA(data.rows);if("cgpa"in data&&"creditsCompleted"in data&&data["cgpa"]<=4&&data["creditsCompleted"]>0){result=calculateCGPA(data,result);}
result["gradePoint"]=result["gradePoint"].toFixed(4).slice(0,-2)
return result;}
return{getGradePoints:getGradePoints,getGrades:getGrades,getCreditHours:getCreditHours,calculateGrades:calculateGrades}});