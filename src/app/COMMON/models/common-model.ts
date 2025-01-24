export class SalesLocation {
    Sales_Location_Id?: number;
    Sales_Location_Name: string;
    Sales_Location_ID?: number;
    Active?: number;
}

export class Company {
    Company_ID?: number;
    Company_Name: string;
    Active?: number;
}

export class Menus {
    Menu_ID?: number;
    User_ID?: number;
    Module_ID?: number;
    Company_ID?: number;
    Section_ID?: number;
    Sales_Location_ID?: number;
    WareHouse_ID?: number;
    Menu_Display_Name?: string;
    Menu_Path?: string;
    Is_Menu_Group?: boolean;
    Parent_Menu_ID?: number;
    Admin?: boolean;
    Order_In_Group?: number;
    Active?: boolean;
}

export class Modules {
    Sales_Location_ID?: number;
    Company_ID?: number;
    User_ID?: number;
    Module_ID?: number;
    Module_Name?: string;
    Module_Path?: string;
}

export interface NavItem {
    Menu_Id: number;
    DisplayName: string;
    IconName: string;
    Route?: string;
    Children?: NavItem[];
}

export class reportDownloadData {
    FileName: string;
    FileURL: string;
}

export class EditMode {
    isEditing?: boolean;
    isView?: boolean;
}

export class RemoveToken {
    User_ID: number;
    Token_ID: string;
}

export class Grades {
    Grade_ID: number;
    Grade_Name: string;
}

export class IncentiveType {
    Incentive_Type_ID: number;
    Incentive_Type_Name: string;
    Active?: number;
}

export class Languages {
    Language_Id: number;
    Language_Name: string;
    Active?: number;
}

export interface HRConfiguration {
    Sales_Location_ID: number;
    PF_Contribution: number | string;
    Pension_Contribution: number | string;
    ESI_Percentage: number | string;
    Minimum_Basic: number | string;
    Minimum_DA: number | string;
    Minimum_HRA: number | string;
    Minimum_Salary: number | string;
    VPF_Applicable: boolean;
    LIC_Applicable: boolean;
}

export class Rights {
    Add: boolean;
    Update: boolean;
    Delete?: boolean;
    Approve?: boolean;
    Deny?: boolean;
    View?: boolean;
}

export class Chat {
    constructor(public image: string,
        public author: string,
        public authorStatus: string,
        public text: string,
        public date: Date,
        public my: boolean) { }
} 

export class GroupSections {
    Group_Section_ID : number;
    Group_Section_Name?: string;
    Group_Section_Prefix?: string;
    checked?: boolean;
}

export class ItemCode {
    asset_id ?  : string;
    item_code ?  : string;
    item_description ?: string;
    uom_id ? : 0;
}

export class Assets {
    item_code ?  : string;
    description ?: string;
}

export class PoNo {
    po_no : string
    po_date : Date | string
    vendor_name:string;
}