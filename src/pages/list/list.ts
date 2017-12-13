import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { DataProvider} from "../../providers/data/data";


@IonicPage()

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  cards: any;

  constructor(public navCtrl: NavController, private dataService:DataProvider, public alertCtrl: AlertController) {
    this.cards = this.dataService.cardList;
  }

    likesClicked(card):void {
        card.likes++;
        this.dataService.updateLikes(card);
    }

    addCard():void {
        let prompt = this.alertCtrl.create({
            title: "Add Post",
            message: "Fill out the info below",
            inputs: [
                {
                    name: 'cardName',
                    placeholder: 'Post Title'
                },
                {
                    name: 'cardImg',
                    placeholder: 'Post Image (URL)'
                },
                {
                    name: 'content',
                    placeholder: 'Post Description'
                },
                {
                    name: 'username',
                    placeholder: 'Your Name'
                },
                {
                    name: 'avatarImg',
                    placeholder: 'Your Image (URL)'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {
                        data['likes'] = 0;

                        let today = new Date();
                        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        let dateTime = date + ' ' + time;
                        data['date'] = dateTime;

                        this.dataService.addNewCard(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteCard(cardId):void {
        this.dataService.deleteCard(cardId);
    }

    updateCard(card):void {
        let prompt = this.alertCtrl.create({
            title: "Edit Post Description",
            message: "Fill out the info below",
            inputs: [
                {
                    name: 'content',
                    value: card.content
                },
                {
                    name: 'cardName',
                    value: card.cardName
                },
                {
                    name: 'cardImg',
                    value: card.cardImg
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {
                        this.dataService.updateCard(card.id, data.content, data.cardName, data.cardImg);
                    }
                }
            ]
        });
        prompt.present();
    }
}

