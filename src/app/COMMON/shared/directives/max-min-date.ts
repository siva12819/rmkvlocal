import { Injectable } from "@angular/core";
@Injectable()
export class MinMaxDate {

    setMaxDate() {
        let today = new Date();
        if (today.getDate() < 26) {
            return new Date(today.setDate(25));
        } else {
            today = new Date(today.setMonth(today.getMonth() + 1));
            today.setDate(25);
            return new Date(today);
        }
    }

    setMaxDateNext() {
        let today = new Date();
        if (today.getDate() < 26) {
            today = new Date(today.setMonth(today.getMonth() + 1));
            today.setDate(25);
            return new Date(today);
        } else {
            today = new Date(today.setMonth(today.getMonth() + 2));
            today.setDate(25);
            return new Date(today);
        }
    }

    setMaxDateNextWeek() {
        let today = new Date();
        if (today.getDate() < 26) {
            today = new Date(today.setMonth(today.getMonth() + 1));
            today.setDate(25);
            return new Date(today);
        } else {
            today = new Date(today.setMonth(today.getMonth() + 7));
            today.setDate(25);
            return new Date(today);
        }
    }

    setMinDate() {
        let today = new Date();
        if (today.getDate() <= 26) {
            today.setMonth(today.getMonth() - 1);
            today.setDate(26);
        } else {
            today.setDate(26);
        }
        return new Date(today);
    }

    setMinDatePrevious() {
        let today = new Date();
        if (today.getDate() <= 26) {
            today.setMonth(today.getMonth() - 2);
            today.setDate(26);
        } else {
            today.setDate(26);
        }
        return new Date(today);
    }

    setMinDatePreviousWeek() {
        let today = new Date();
        if (today.getDate() < 26) {
            today.setMonth(today.getMonth() - 7);
            today.setDate(26);
        } else {
            today.setDate(26);
        }
        return new Date(today);
    }
    
    public setMinAdvanceDate() {
        let today = new Date();
        if (today.getDate() <= 5) {
            today.setMonth(today.getMonth()-1);
            today.setDate(26);
            return new Date(today);
        } else {
            today = new Date(today.setMonth(today.getMonth()));
            today.setDate(1);
            return new Date(today);
        }
    }

    public setMinAdvanceMonth() {
        let today = new Date();
        if(today.getDate() >= 1 && today.getDate() <= 31) {
            today.setFullYear(today.getFullYear());
            today.setMonth(today.getMonth());
            today.setDate(1);
            return new Date(today);
        }
    }

    public setMaxAdvanceMonth() {
        let today = new Date();
        if(today.getMonth() >= 1 && today.getMonth() < 12)
        {
            if(today.getDate() >= 1 && today.getDate() <= 31) {
                today.setFullYear(today.getFullYear());
                today.setMonth(today.getMonth() + 1);
                today.setDate(1);
                return new Date(today);
            }
        }
        else if(today.getMonth() == 12){
            if(today.getDate() >= 1 && today.getDate() <= 31) {
                today.setFullYear(today.getFullYear() + 1);
                today.setMonth(1);
                today.setDate(1);
                return new Date(today);
            }
        }
        
    }

    public setMaxExtraAdvanceMonth() {
        let today = new Date();
        if(today.getMonth() >= 1 && today.getMonth() < 12)
        {
            if(today.getDate() >= 1 && today.getDate() <= 31) {
                today.setFullYear(today.getFullYear());
                today.setMonth(today.getMonth() + 6);
                today.setDate(1);
                return new Date(today);
            }
        }
        else if(today.getMonth() == 12){
            if(today.getDate() >= 1 && today.getDate() <= 31) {
                today.setFullYear(today.getFullYear() + 1);
                today.setMonth(1);
                today.setDate(1);
                return new Date(today);
            }
        }
        
    }

    // public setMaxAdvanceDate() {
    //     let today = new Date();
    //     if (today.getDate() <= 5) {
    //         today.setMonth(today.getMonth()-1);
    //         today.setDate(26);
    //     } else {
    //         today = new Date(today.setMonth(today.getMonth()));
    //         today.setDate(1);
    //         return new Date(today);
    //     }
    // }
}
