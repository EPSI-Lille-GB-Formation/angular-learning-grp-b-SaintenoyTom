import { Categories } from "./categories";
import { Users } from "./users";

export class Book {
    constructor(
        public id: number,
        public title: string,
        public resume: string,
        public image: string,
        public createdAt: Date,
        public updatedAt: Date|null,
        public categorie: Categories[],
        public auteur: Users
    )   {
            this.createdAt = new Date();
        }
    }
