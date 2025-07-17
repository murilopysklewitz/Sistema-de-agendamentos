import { Servico } from "src/domain/servico/entity/servico";

export type FindByIdInputDto = {
    id: string;
}

export type FindByIdOutputDto = {
    servico: {
        id:string;
        name:string;
        price:number;
        description:string | null;
        highlight:boolean
    }
}