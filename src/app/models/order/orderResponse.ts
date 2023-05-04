

export interface technicalOrder {
    id: number,
    name: string,
    email: null,
    rol_id: number,
    rol_name: string
}

export interface clientOrder {
    id: number,
    pname: string,
    sname: string ,
    plastname: string,
    slastname: string,
    cedula: string,
    phone: string,
    email: string,
    address: string
}

export interface orderVehicle{
    id: number,
    brand: string,
    reference: string,
    placa: string,
    color: string,
    createdbyid: number,
    createdat: string,
    updatedat: string
}

export interface statusOrder {
    id: number,
    type: string,
    value: string
}

export interface orderResponse {
        vehicle_id: number,
        technical_id: string,
        client_id: number,
        createdbyid: number,
        status: string,
        status_order: statusOrder,
        description: string,
        id: number,
        technical: technicalOrder,
        client: clientOrder,
        vehicle: orderVehicle,
        createdat: string,
        updatedat: string
}