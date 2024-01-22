import { BOOKS } from './mock-book'
import { Page } from './page'

export const PAGES: Page [] = [
    {
        id: 1,
        title: "Ma première page",
        content: "Voici ma toute première page yeehaaa",
        createdAt: new Date(),
        updatedAt: null,
        book: BOOKS[6]
    }]