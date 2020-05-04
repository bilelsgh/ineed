-> Rendre service

Nous détaillons ici comment nous allons gérer le fonctionnement du **processus de "rendre service".** 

Sur une annonce on peut voir un bouton qui permet d'aider la personne en besoin, lorsque la demande est réalisée par Pierre, la personne en demande d'aide **doit confirmer** qu'elle accepte l'aide de Pierre.

Pour cela on modifie le design de _"user"_ qui contient les infos principales d'un user.

> -  **_"user"_ actuellement** 
> _"user": {
>         "bio": null,
>         "firstName": "Tomy_motan_vrednii",
>         "lastName": null,
>         "mail": "frumusica@misha_liubimii",
>         "photo": null,
>         "sex": "Yes"
>     }_

 
- **_"user"_ adapté au processus "rendre service"** 
> "user": {
>         "services_asked" : {idService : number/string, helpers : Number/String[idUser] } [ ]
>         "services_provided" : {idService : number/string, accepted : boolean} [ ]
>         "bio": null,
>         "firstName": "Tomy_motan_vrednii",
>         "lastName": null,
>         "mail": "frumusica@misha_liubimii",
>         "photo": null,
>         "sex": "Yes"
>     }_



:arrow_right: Dans _"services_asked"_ , _helpers_ est un tableau de tous les utilisateurs (leur userId) s'étant  proposés pour "réaliser" ce service.

:arrow_right: Dans _"services_provided"_ , nous retrouvons tous les services pour lesquels _user_ s'est proposé. Ils peuvent être acceptés ou non par la personne qui a besoin d'aide.

Il faut donc gérer l'acceptation des demandes et leur affichage à travers des notifications sur les différents utilisateurs, il en est de même pour la mise en relation des utilisateurs.

Pour l'instant les tests seront faits sur le service _cuisine_ puis déployés sur les autres services.
