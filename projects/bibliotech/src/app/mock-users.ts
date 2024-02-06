import { Users } from "./users";

export const USERS: Users[] = [
    {
        id:1,
        firstname:"Victor",
        lastname:"Hugo",
        email:"VictorHugo@yahoo.fr",
        password: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", //1234
        role: "user"
    },
    {
        id:2,
        firstname:"admin",
        lastname:"DeOuf",
        email:"Admin@gmail.com",
        password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", //admin
        role: "admin"
    },
    {
        id:3,
        firstname:"Robert",
        lastname:"Paté",
        email:"PatéRobert@gmail.com",
        password: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", //1234
        role: "user"
    },
];