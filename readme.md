# COMMENT FAIRE LES INSTALLATIONS NECESSAIRES

    1. ouvrir le projet NodeJs sur votre IDE;
    2. Naviguer dans le dossier contenant le projet sur votre ligne de commande
        (terminal Visual Studio Code);
    3. Si le projet n'a pas encore été initialisé, lancer la commande
        `npm init -y` sur votre terminal ouvert précédemment;
    4. Vous devriez avoir un ficher package.json de créé;
    5. Pour ce projet, nous avons besoin des dépendances bcrypt, cookie-parser,
        express, express-validator, jsonwebtoken, mongoose, et socket.io.
        Nous avons deux possibilités d'installation :
        - Nous pouvons lancer pour chaque dépendance la commande suivante à partir de notre terminal:
            . npm install bcrypt
            . npm install cookie-parser
            . npm install express-validator
            . npm install jsonwebtoken
            . npm install mongoose
            . npm install socket.io
            . npm install express
        - ou alors lancer une seule commande pour l'installation de toutes ces dépendances simultanément en faisant:
            npm install bcrypt cookie-parser express express-validator jsonwebtoken mongoose socket.io
    6. Nous devons également installer la dépendance `nodemon` en mode développeur pour pouvoir lancer notre serveur.
        Pour cela, taper la commande suivante sur le terminal: npm install nodemon -D
    7. Une fois toutes les dépendances installées, nous avons de nouvelles rubriques qui apparaissent sur notre fichier
        package.json, listant les différentes dépendances précédemment installées avec leurs versions.
    8. En plus des différentes installations, il est nécessaire d'ajouter le type `module` dans notre fichier package.son
        afin de faciliter les exportations de nos fonctions tout au long du projet. Pour cela, ouvrir le fichier package.json,
        juste après l'objet "depedencies":{...}, mettre une virgule, aller à la ligne et insérer la ligne "type": "module".
        puis enregistrer.

# COMMENT LANCER LE SERVEUR

    1. Une fois notre dépendance `nodemon` installée en mode développeur, nous devons créer notre fichier server.js,
        y écrire le code nécessaire pour l'éxécution des routes, la connexion à la base de donnée et le port qui sera utilisé.
    2. Ouvrir votre application Mongoose pour la création et la connection à la base de donnée qui sera crée automatiquement
       une fois que le serveur sera lancé.
    2. Ensuite, dans notre fichier package.json, dans la rubrique script, nous allons insérer une nouvelle ligne comme suit
        "dev": "nodemon server.js"
    3. Enregistrer les modifications, aller sur le terminal et taper la commande *npm run server*.
       L'application démarrera sur le port #5000 a l'address  http://localhost:5000

# COMMENT OBTENIR LES DIFFERENTES RESSOURCES EN UTILISANT POSTMAN

    1. Lancer le serveur;
    2. Ouvrir l'application Postman;
    3. Cliquer sur New;
    4. Cliquer sur HTTP;

        a. Créer un nouvel utilisateur:
        - Choisissez le type de requête POST;
        - Entrez l'URL de la requête, dans notre cas ce sera localhost:5000/user ;
        - Sélectionnez l'onglet body, sélectionnez le format des données qui seront entrée notamment le format JSON,
        entrez les données de l'utilisateur que vous souhaitez enregistrer dans la partie blanche en dessous du body. Par
        exemple vous pouvez entrer:
        {
            "username": "Nom_utilisateur",
            "password": "1234569"
        }
        puis cliquez sur send.

        Dans la partie basse de Postman, juste en dessous du texte que vous venez d'entrer, se trouve le résultat de votre requête.
        En sélectionnant l'onglet body juste en dessous, vous aurez les informations de l'utilisateur que vous venez d'enregistrer
        si jamais la requête a été bien exécutée, notanment le username et le password.

        b. Pour la connexion d'un nouvel utilisateur:
           - Choisissez le type de requête POST;
           - Entrez l'URL localhost:5000/login.
           - Entrez les données de l'utilisateur précédement créé au format JSON.
             Exemple:
                {
                 "username": "Nom_utilisateur",
                 "password": "1234569"
                }
            - Cliquer sur send;
            Sur la partie résultat, vous aurez un message différent.
            Notanment sur la partie body du bas de votre page, vous aurez "Successfull authentication!" avec un token d'authentification.

        Remarque: Il faut noter que pour le reste des fonctionnalités, il est nécessaire d'être connecté pour pouvoir les exécuter,    Ceci pour l'aspect sécurité implémenté dans l'application.

        c. Récupération des numéros blacklistés:
         - Choisissez le type de requête GET;
         - Entrez l'URL localhost:5000/blacklist/allBlacklistedNumbers.
         - Cliquer sur send;
         - Sur la partie résultat, vous aurez un tableau contenant les numéros blacklist.

        d. Ajouter un numéro à la liste noire:
         - Choisissez le type de requête POST;
         - Entrez l'URL localhost:5000/blacklist.
         - Entrez les données du numéro blacklist au format JSON.
         Exemple:
         {
            "From": "+330603907111",
            "Message": "stop "
        }
        - Cliquer sur send;
        - Sur la partie résultat,
            . Si jamais la partie message contient le mot 'stop', le numéro sera blacklisté
              et vous aurez le message suivant: 'blacklist number with success'.
            . Si le numéro existe déjà, vous aurez le message suivant: 'Number already blacklisted'.
            . Si le message ne contient pas de mot 'stop', le numéro ne sera pas blacklisté et vous aurez le message
              suivant: 'no unsubscribe notification detected'.

        e. Vérifier si un numéro est blacklisté:
           - Choisissez le type de requête GET;
           - Entrez l'URL localhost:5000/blacklist/checkIfNumberIsBlacklisted/:numéro_recherché.
           - Cliquer sur send;
           - Sur la partie résultat, vous aurez:
             . Si le numéro est blacklisté, vous aurez le message suivant: 'this number is blacklisted'.
             . Si le numéro n'est pas blacklisté, vous aurez le message suivant: 'this number is not blacklisted'.

        f. Se déconnecter:
           - Choisissez le type de requête POST;
           - Entrez l'URL localhost:5000/user/logout.
           - Entrez les données de l'utilisateur qui doit être déconnecté au format JSON.
             Exemple:
                {
                 "username": "Nom_utilisateur",
                 "password": "1234569"
                }
            - Cliquer sur send;
            - Sur la partie résultat, vous aurez le message suivant: "Successfull logout"

# VERIDEZ LA BASE DE DONNEES

1.  Allez dans Moongose DB;
2.  Accédez à la base de données qui a été crée lors du lancement de serveur.
    Vous y verrez toutes les données que vous avez précédement enregistré.
