import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../services/users.service";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {


  route: Observable<UrlSegment[]>;
  path: UrlSegment[];
  hasUrl: boolean;
  showProfilMenu: boolean; // a sup si dropdown

  constructor(public authService: AuthService, private actRoute: ActivatedRoute, router: Router,public userService: UserService) {
  }

  ngOnInit() {
    this.showProfilMenu=false;

    this.actRoute.url.subscribe(value => {
      this.path = value;
      console.log("oninit ext"+this.path);
    });

    /*
    this.route = this.actRoute.url.pipe(
      switchMap((params) => {
        this.path = url.get();
        this.hasUrl=params.has('url');
        console.log(this.hasUrl);
        return this.actRoute.url;
      })
    );
    */

    console.log("oninit ext"+this.path);
    this.path = this.actRoute.snapshot.url;
    console.log("oninit fin ", this.path);
    const url: string = this.actRoute.snapshot.url.join('');
    console.log("url ",url);
  }

  // a supprimer si solution optimale dropdown trouvée
  switchMenu(){
    if (this.showProfilMenu){
      this.showProfilMenu=false;
    }else{
      this.showProfilMenu=true;
    }
  }
}
