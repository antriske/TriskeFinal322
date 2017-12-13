import { Component } from '@angular/core';
import {NavController, IonicPage, NavParams} from 'ionic-angular';
import {ListPage} from "../list/list";
import {ErrPage} from "../err/err";
// import {ListPage} from "../list/list";

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InfoPage');
    }

    showList() {
        this.navCtrl.push(ListPage);
    }

    showErr() {
        this.navCtrl.push(ErrPage);
    }
}

