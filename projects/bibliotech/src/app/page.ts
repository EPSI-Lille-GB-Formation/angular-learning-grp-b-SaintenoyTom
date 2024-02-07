export class Page {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public createdAt: Date,
        public updatedAt: Date|null,
        public bookId: number
    )   {
            this.createdAt = new Date();
        }
    }
