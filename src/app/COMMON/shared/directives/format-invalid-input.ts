
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FormatInvalidInput {

    public replaceInvalidString(invalidString: string): string {
        return [null, 'null', undefined, 'undefined', NaN, 'NaN', ''].indexOf(invalidString) !== -1 ? '' : invalidString.toString().trim();
    }

    public replaceInvalidNumber(invalidNumber: number): number {
        return [null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', '0.00', ''].indexOf(+invalidNumber) !== -1 ? 0 : +invalidNumber;
    }

    public replaceInvalidAmount(invalidAmount: number): number {
        return [null, 'null', undefined, 'undefined', NaN, 'NaN'].indexOf(+invalidAmount) !== -1 ? 0 : +invalidAmount;
    }

    public replaceInvalidDate(invalidDate: string): string {
        return [null, 'null', undefined, 'undefined', NaN, 'NaN', '', 'Invalid Date'].indexOf(invalidDate) !== -1 ? '' : invalidDate.toString().trim();
    }
}