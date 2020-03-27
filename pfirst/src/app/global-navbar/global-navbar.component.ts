import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {


  route: Observable<UrlSegment[]>;
  path: string;
  hasUrl: boolean;

  constructor(public authService: AuthService, private actRoute: ActivatedRoute, router: Router) {
  }

  ngOnInit() {

    this.route = this.actRoute.paramMap.pipe(
      switchMap((params) => {
        this.path = params.get('url');
        this.hasUrl=params.has('url');
        console.log(this.hasUrl);
        return this.actRoute.url;
      })
    );
    console.log("oninit "+this.hasUrl);
    //this.path = this.actRoute.snapshot.paramMap.get(('url'));
  }
}
