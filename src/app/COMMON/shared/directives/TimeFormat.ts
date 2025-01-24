import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'convertFrom24To12Format'})
export class TimeFormat implements PipeTransform {
     transform(time: string): string {
         var selectedtime = time.split(":");
         let hour : any = selectedtime[0];
         let min = selectedtime[1];
         let part =  hour >= 12 ? 'PM' : 'AM';
         min = (min+'').length == 1 ? `0${min}` : min;
         hour = hour > 12 ? hour - 12 : hour;
         hour = (hour+'').length == 1 ? `0${hour}` : hour;
         return `${hour}:${min} ${part}`
       }

       getampm(hour : any){
        if(hour == 12){
            let part = 'PM'
            return part;
        }
        else{
            if(hour == '00'){
                let part = 'AM';
                return part
            }
            else{
                let part = hour > 12 ? 'PM' : 'AM';
                return part;
            }
        }
       }
   }