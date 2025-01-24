import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class KeyPressEvents {

    public onlyAllowCharacters(event: KeyboardEvent | any) {
        const pattern = /^[a-zA-Z ]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
        }
    }

    public onlyAllowNumbers(event: KeyboardEvent | any) {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
    }

    public onlyAllowCharactersWithSpecialChar(event: KeyboardEvent | any) {
        const pattern = /^[a-zA-Z,. ]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z,. ]/g, "");
        }
    }

    public onlyAllowAlphanumeric(event: KeyboardEvent | any) {
        const pattern = /^[a-zA-Z0-9 ]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
        }
    }

    public onlyAllowAttendanceCharacters(event: KeyboardEvent | any) {
        const pattern = /^[acdlowACDLOW]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^acdlowACDLOW]/g, "");
        }
    }

    public arrowKeyUpAndDown(event: KeyboardEvent | any, selectedRowIndex: number, tableRecords: any): number {
        if (event.key === "ArrowDown") {
            selectedRowIndex + 1 !== tableRecords.length ? selectedRowIndex !== -1 ? selectedRowIndex += 1 : selectedRowIndex : selectedRowIndex = 0;
        }
        if (event.key === "ArrowUp") {
            selectedRowIndex > 0 ? selectedRowIndex -= 1 : selectedRowIndex = tableRecords.length - 1;
        }
        return selectedRowIndex;
    }

    public onlyAllowDecimal(event: KeyboardEvent | any, maxValue: number, allowCharacters?: boolean): boolean {
        if (allowCharacters) {
            if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 46) {
                // if (event.keyCode === 48 && event.target.value.indexOf("0") === 0) {
                //     return false;
                // } else {
                if (+(event.target.value.toString().concat(event.key !== "." ? event.key : "")) <= maxValue) {
                    if (event.target.value.toString().includes(".") === false || event.keyCode !== 46) {
                        if (event.target.value.toString().includes(".") === true) {
                            let maxLength = maxValue.toString().split(".")[0].length;
                            let intLength = event.target.value.toString().concat(event.key).split(".")[0].length;
                            let decimalLength = event.target.value.toString().concat(event.key).split(".")[1].length;
                            if (decimalLength <= 2) {
                                if (intLength <= maxLength) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                // }
            } else {
                return false;
            }
        } else {
            if (event.charCode >= 48 && event.charCode <= 57) {
                if (+(event.target.value.toString().concat(event.key)) <= maxValue) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    public onlyAllowDecimalNegative(event: KeyboardEvent | any, maxValue: number, allowCharacters?: boolean): boolean {
        if (allowCharacters) {
            if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 46) {
                // if (event.keyCode === 48 && event.target.value.indexOf("0") === 0) {
                //     return false;
                // } else {
                if (+(event.target.value.toString().concat(event.key !== "." ? event.key : "")) <= maxValue) {
                    if (event.target.value.toString().includes(".") === false || event.keyCode !== 46) {
                        if (event.target.value.toString().includes(".") === true) {
                            let maxLength = maxValue.toString().split(".")[0].length;
                            let intLength = event.target.value.toString().concat(event.key).split(".")[0].length;
                            let decimalLength = event.target.value.toString().concat(event.key).split(".")[1].length;
                            if (decimalLength <= 2) {
                                if (intLength <= maxLength) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                // }
            } else {
                return false;
            }
        } else {
            if (event.charCode >= 48 && event.charCode <= 57) {
                if (+(event.target.value.toString().concat(event.key)) <= maxValue) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    public onlyAllowPercentage(event: KeyboardEvent | any, maxValue: number, allowCharacters?: boolean, isPercentage?: boolean) {
        if (allowCharacters) {
            if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 46) {
                if (+(event.target.value.toString().concat(event.key !== "." ? event.key : "")) <= maxValue) {
                    if (event.target.value.toString().includes(".") === false || event.keyCode !== 46) {
                        if (isPercentage) {
                            if (event.target.value.toString().includes(".") === true && +(event.target.value) !== maxValue) {
                                let maxLength = maxValue.toString().split(".")[0].length;
                                let intLength = event.target.value.toString().concat(event.key).split(".")[0].length;
                                let decimalLength = event.target.value.toString().concat(event.key).split(".")[1].length;
                                if (decimalLength <= 2) {
                                    if (intLength <= maxLength) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            } else {
                                if (event.key.includes(".") === true && +(event.target.value) === maxValue) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        } else {
                            if (event.target.value.toString().includes(".") === true) {
                                let maxLength = maxValue.toString().split(".")[0].length;
                                let intLength = event.target.value.toString().concat(event.key).split(".")[0].length;
                                let decimalLength = event.target.value.toString().concat(event.key).split(".")[1].length;
                                if (decimalLength <= 2) {
                                    if (intLength <= maxLength) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            if (event.charCode >= 48 && event.charCode <= 57) {
                if (+(event.target.value.toString().concat(event.key)) <= maxValue) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
