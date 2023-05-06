import { ListItem } from "./ListItem"

export type PaginationResponse = 
{
    totalSum: number,
    parameters: {
        pageNumber: number,
        pageSize: number,
    },
    selectedRows: ListItem[]
}