export class ItemMaster {
    item_code : string;
    uom : string;
    item_description : string;
    uom_description?: string;
    active ? : boolean;
    entered_by ? : number;
 }

 export class ItemLoad {
    active: number;
}