import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USERS } from './mock-users';
import { BOOKS } from './mock-book';
import { CATEGORIES } from './mock-categories';
import { PAGES } from './mock-page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    return { USERS, BOOKS, CATEGORIES, PAGES};
  }

  post(reqInfo: any) {
    if (reqInfo.collectionName === 'register') {
      // Récupérez les données de l'utilisateur à partir de la requête
      const user = reqInfo.utils.getJsonBody(reqInfo.req);

      // Ajoutez votre logique de traitement pour l'inscription de l'utilisateur, par exemple :
      const id = this.generateNewUserId(); // Générer un nouvel ID pour l'utilisateur
      user.id = id;

      // Ajoutez l'utilisateur à la liste des utilisateurs
      const db = reqInfo.utils.getDb();
      db.users.push(user);

      // Retournez la réponse de succès avec le nouvel utilisateur ajouté
      return reqInfo.utils.createResponse$(() => ({
        status: 201, // Statut de création
        body: user // Nouvel utilisateur ajouté
      }));
    }

    // Si la collection n'est pas 'register', laissez la requête passer au gestionnaire par défaut
    return undefined;
  }

  private generateNewUserId(): number {
    // Implémentez votre logique pour générer un nouvel ID unique pour l'utilisateur
    // Par exemple, vous pouvez trouver le dernier ID dans la liste des utilisateurs et ajouter 1
    return Math.max(...this.createDb().USERS.map(user => user.id)) + 1;

  }
}
