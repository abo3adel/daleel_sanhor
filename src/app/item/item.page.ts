import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  page_title: string;

  page_name: string;
  data: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public toast: ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // get page name and title from state
        this.page_title = this.router.getCurrentNavigation().extras.state.page.title;
        this.page_name = this.router.getCurrentNavigation().extras.state.page.name;

        // load data from json file
        // with the same item name
        fetch('../../assets/data/' + this.page_name + '.json')
          .then(res => res.json())
          .then(json => {
            if (json.length) {
              this.data = json;
            } else {
              // show toast to inform user it is empty section
              this.presentToast();
              // go to add-new page
              this.router.navigate(['add-new']);
            }
          })
          .catch(error => { // error mostly will be json fileNotExists
            // console.log(error);

            // show toast to inform user it is empty section
            this.presentToast();
            // go to add-new page
            this.router.navigate(['add-new']);
          });
      }  else {
        // if no page name provided return to home page
        this.router.navigate(['home']);
      }
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'لا يتوفر بيانات بهذا القسم ساعدنا بإضافة المزيد',
      duration: 2000,
      showCloseButton: true
    });
    toast.present();
  }

  // searchBar(name: string) {
  //   console.log(data);
  // }

  ngOnInit() {
    // runs twice so no need to do anything here
  }

}