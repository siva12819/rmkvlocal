export class PurchaseOrder {
    po_no: string;
    po_date: Date | string;
    supplier_code: string;
    supplier_name: string;
    valid_supplier: boolean;
    grand_total: string | number;
}

export class PurchaseOrderDetails {
    item_code: string;
    item_description?: string;
    uom_description?: string;
    item_qty?: string | number;
    item_rate?: string | number;
    valid_item?: boolean;
    total_amount?: string | number;
    quantity?: string | number;
    rate?: string | number;
}

export class PurchaseOrderLoad {
    from_date?: string;
    to_date?: string;
    FromDate?: string;
    ToDate?: string;
    supplier_code: string;
    supplier_name?: string;
    valid_supplier?: boolean;
}

export class ItemsLookup {
    item_code: string;
    item_description: string;
    uom_description: string;
}

export class SupplierLookup {
    supplier_code: string;
    supplier_name: string;
    supplier_gstn_no: string;
}

export class KeyColumns {
    display: string;
    editable: boolean;
}

export class LookupDetails {
    item_code: string;
    item_description?: string;
    uom_description?: string;
    supplier_code: string;
    supplier_name?: string;
    supplier_gstn_no?: string;
}

export class PurchaseOrderList {
    po_no: string;
    po_date: Date | string;
    supplier_code: string;
    supplier_name: string;
    grand_total: number | string;
    created_by: number;
    created_on: Date;
    modified_by: number;
    modified_on: Date;
    active: boolean;
}

export class ResultType {
    return_value?: number;
    records?: string;
    records1?: string;
    records2?: string;
}

export class PurchaseOrderAdd {
    po_no: string;
    po_date: Date | string;
    grand_total: number | string;
    supplier_code: string;
    entered_by: number;
    po_details: PurchaseOrderDetails[]
}