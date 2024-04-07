import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function validateWeekWith7days(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        var differenceInDays = 6;
        var dateRangeString = control.value;
        if(dateRangeString.length > 20){
            var dates = dateRangeString.split(' até ');
            var startDate = new Date(dates[0]);
            var endDate = new Date(dates[1]);
            var difference = endDate.getTime() - startDate.getTime();
            differenceInDays = difference / (1000 * 3600 * 24);
        }
        return differenceInDays !== 6 ? {dateOutOfRange:true}: null;
    }
}
