import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  check(char : string, chaine : string){
    for (var elt of chaine){
      if(char == elt){
        return true;
      }
    }
    return false;
  }

  onSubmit(f : NgForm){
    const valeurs = f.value;
    if (!this.check("@", valeurs["mail"]) ) {
      alert("Veuillez entrer une adresse email valide.")
    }
  }
}
