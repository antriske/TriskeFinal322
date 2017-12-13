import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Card {
    id?: string;
    avatarImg: string;
    cardImg: string;
    cardName: string;
    content: string;
    likes: number;
    username: string;
    date: string;
}

@Injectable()
export class DataProvider {

    cardsListRef: AngularFirestoreCollection<Card>;
    cardList: Observable<Card[]>;

    constructor(private afs: AngularFirestore) {
        this.cardsListRef = this.afs.collection<Card>('Cards');
        // this.cardList = this.cardsListRef.valueChanges();
        this.cardList = this.cardsListRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Card;
                const id = action.payload.doc.id;
                return {id, ...data};
            });
        });
    }

    updateLikes(card): void {

    }

    addNewCard(cardInfo): void {
        if (cardInfo) {
            this.cardsListRef.add(cardInfo);
        }
    }

    deleteCard(cardId):void {
        this.cardsListRef.doc(cardId).delete();
    }

    updateCard(cardId, newInfo, newCardName, newCardImg):void {
        if (cardId && newInfo) {
            this.cardsListRef.doc(cardId).update({"content": newInfo, "cardName": newCardName, "cardImg": newCardImg});
        }
    }
}
