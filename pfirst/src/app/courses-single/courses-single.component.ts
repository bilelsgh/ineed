import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-single',
  templateUrl: './courses-single.component.html',
  styleUrls: ['./courses-single.component.css']
})
export class CoursesSingleComponent implements OnInit {

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Liste = new Array<{produit: string, quantite: string}>();
  Accompagne : string = 'oui';
  Budget : number = 55;
  Dispo: string="coucou"
  liste_a_copier : string;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Liste= this.serviceService.getServiceById(+id).liste;
    this.Accompagne=this.serviceService.getServiceById(+id).accompagner;
    this.Budget=this.serviceService.getServiceById(+id).budget;
    this.Dispo=this.serviceService.getServiceById(+id).dispo;
    this.writeList();
  }

  writeList(){
    let current : string;
    for(let elt of this.liste_a_copier){
      current = elt.produit + " -> " + elt.quantite + "\n";
      this.liste_a_copier += current;

    }
  }

  //###########COPIER LA LISTE##################""




  function docopy() {

    // Cible de l'élément qui doit être copié
    var target = this.dataset.target;
    var fromElement = document.querySelector(target);
    if(!fromElement) return;

    // Sélection des caractères concernés
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      // Exécution de la commande de copie
      var result = document.execCommand('copy');
      if (result) {
        // La copie a réussi
        alert('Copié !');
      }
    }
    catch(err) {
      // Une erreur est surevnue lors de la tentative de copie
      alert(err);
    }

    // Fin de l'opération
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
      selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
      selection.removeAllRanges();
    }
  }

}
