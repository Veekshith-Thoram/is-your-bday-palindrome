const dateOfBirth = document.querySelector("#dob");
const submitBtn = document.querySelector("#submit");
const outputEl = document.querySelector("#output");

function reverseStr(str){
    str = str.split("").reverse().join("");
    return str;
}

function isPallindrome(str){
    var reverse = reverseStr(str);
    return reverse === str;
}

function convertDateToString(date){
    var dateStr = {day: '', month: '', year: ''};
    if(date.day<10){
        dateStr.day = "0"+date.day;
    } else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10){
        dateStr.month = "0"+date.month;
    } else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function dateFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];

}

function checkPallindromeForAllFormats(date){
    var listOfdateFormats = dateFormats(date);
    var flag = false;
    for(let i=0;i<listOfdateFormats.length;i++){
        if(isPallindrome(listOfdateFormats[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month ===2){
        if(leapYear(year)){
            if(day>29){
                day=1;
                month++
            }
        } else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month>12){
        month =1;
        year++
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function leapYear(year){
    if(year%400 === 0){
        return true;
    }
    if(year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1){
        ctr++;
    var isPalindrome = checkPallindromeForAllFormats(nextDate);
    if(isPalindrome){
        break;
    }
    nextDate = getNextDate(nextDate)
    }

    return [ctr,nextDate]
}

function getPreviousDate(date){
    var day = date.day-1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(day<1){
        if(leapYear(year)){
            if(month===3){
                day = 29;
                month--;
            }
        } else{
            day = daysInMonth[month-2];
            month--;
        }
    }
    if(month<1){
        month = 12;
        year--;
    }
    return {
        day:day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        ctr++;
        var isPalindrome = checkPallindromeForAllFormats(previousDate);
        if(isPalindrome){
            break
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr,previousDate];
}


// var date = {
//     day: 10,
//     month: 6,
//     year: 2001
// }

function checkPallindrome(){
    var bdayStr = dateOfBirth.value;
    if(bdayStr !== ""){
        var listOfDates = bdayStr.split("-");
        var date = {
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0])
        }
        var isPalindrome = checkPallindromeForAllFormats(date);
        if(isPalindrome){
            outputEl.innerText = "Yay!! Your birthday is a Perfect Palindrome date🤩🤩"
        } else{
            var [ctr, nextDate] = getNextPalindromeDate(date);
            var [ptr, previousDate] = getPreviousPalindromeDate(date);
            if(ctr<ptr){
                outputEl.innerText = `The next pallindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and you missed it by ${ctr} days`
            } else{
                outputEl.innerText = `The previous pallindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year} and you missed it by ${ptr} days`
            }
        }
    } else{
        outputEl.innerText = "Please input Your Date of birth to proceed.."
    }
}

submitBtn.addEventListener("click", checkPallindrome);