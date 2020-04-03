export class ServiceService{
    service1=[];
    service2=[];
    service3=[];
    service4=[];
    types=[];

    services=[
        {
        id: 1,
        image:"../../assets/data/menage.png",
        type:"service1",
        name: 'Faire les courses',
        user: 'Jean Paul Gauthier',
        description: "J'ai faim la vie de maman",
        liste: [],
        accompagner:"",
        budget: 98,
        dispo:"30/03/2002"

        
        },
        {id:2,
        image:"../../assets/data/menage.png",
        type:"service2",
        name: 'Faire le menage',
        user: 'Jean Paul',
        description: "Esclave",
        dispo: "24/03/2020",
        surface : 50,
        materiel: []
        },
        {
        id:3,
        image:"../../assets/data/cuisine.png",
        type:"service3",
        name: 'Faire la cuisine',
        user: 'Jean Paul',
        description: "Petit con va",
        sur_place: "oui",
        type_de_plat: "fast food",
        dispo: "09/09/2009"


        },
        {id :4,
        image:"../../assets/data/accompagner.png",
        type:"service4",
        name: 'Accompagne moi gros',
        user: 'Jean Paul',
        description: "Petit con va",
        kind:"ponctuel",
        quand:"midi a 14h",
        local: "a la pischine",
        dispo:"03/04/2040"

        }
      ];

    constructor(){
        for (var i=0; i<this.services.length;i++){
            if (this.services[i].type =="service1"){
                this.service1.push(this.services[i]);
                this.services[i].image ="../../assets/data/menage.png";
            }
            else if(this.services[i].type =="service2"){
                this.service2.push(this.services[i]);
            }
            else if(this.services[i].type =="service3"){
                this.service3.push(this.services[i]);
            }
            else{
                this.service4.push(this.services[i])
            };

    
            
        
        this.types=[this.service1,this.service2,this.service3,this.service4];
        
        
        };
    }

    getServiceById(id: number) {
        const service = this.services.find(
          (s) => {
            return s.id === id;
          }
        );
        return service;
    }
}
