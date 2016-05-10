# water-stack

## Installation
Der Code basiert auf Meteor (http://meteor.com). Eine Meteor Umgebung kann so installiert werden (https://www.meteor.com/install). Unter Linux und Mac eine Zeile im Terminal - danach ins sourcecodeverzeichnis gehn (water-stack) und "meteor" ausführen - That's it. Nun kann die App unter http://localhost:3000 aufgerufen werden
Dabei wird automatisch eine mongoDB eingerichtet, die mit einem beliebigen Client unter localhost:3001 erreichbar ist.

## Fist Steps ( Bei lokaler Installation)
### Erstellen von PINs
Im Browser (nachdem die App aufgerufen wurde, Console aufrufen (rightclick + Inspect oder Untersuchen...): dort dann Meteor.call("insertPINs") aufrufen.
Es werden 50 pins t1 - t50 erstellt -> Diese können auf der pin-Seite der webApp verwendet werden

### Erstellen von Teams
Im Browser (nachdem die App aufgerufen wurde, Console aufrufen (rightclick + Inspect oder Untersuchen...): dort dann Meteor.call("insertTeamCodes") aufrufen
Es werden 50 Teams p1 - p50 erstellt -> Diese können auf der pin-Seite der webApp als Teamcode verwendet werden

### Hinzufügen der Email-Adresse fürs Backup - somit kann auch das Admin-Backend benutzt werden
Hier: "./water-stack/lib/config/flow-db-admin.js" in der 2. Zeile die email hinzufügen
adminEmails: ['fasching@golemdigital.at','neven@nevensuboticstiftung.de','neue@email.hier'],

## Online-Version
Online gibts die App unter http://46.101.137.33/ zu sehn. Hier gibts keinen db-Zugang nach aussen. Die Production-Version basiert auf mupx (incl. Docker)

## Design
Für das Design wird zZ semantic ui verwendet, ist aber ziemlich alles möglich. Als templating-engine kommt das Meteor-eigene Blaze ( incl spacebars) zum Einsatz. 
https://www.meteor.com/blaze
https://www.discovermeteor.com/blog/spacebars-secrets-exploring-meteor-new-templating-engine/

## Station GUI
Für das GUI der Stationen (von Tobias) ist folgendes möglich:
a) Wir inkludieren das direkt in die Meteor-App (über Meteor's Websockets)
b) Es wird eine standalone-Seite und wir benutzen RESTful API (get,post..) 

## Station API
Für den Upload von Competitions ist eine reaktive API implementiert.
Folgende Daten sind dabei mindestens notwendig:
    postData.pin && postData.stationId && postData.timeStarted && postData.timeEnded && postData.gamePoints

Url: http://46.101.137.33/api/addCompetition
Methode: post
Body (raw, text):


{
    "stationId":"station1",
    "groupId":"t1",
    "pin":"p1",
    "gamePoints":1000,
    "questionPoints": [
        10,
        20,
        30,
        50,
        80,
        130,
        210,
        340,
        550,
        890
    ],
    "timePoints":5,
    "timeStarted":"Wed Mar 23 2016 20:22:15 GMT+0100 (CET)",
    "timeEnded":"Wed Mar 23 2016 21:22:15 GMT+0100 (CET)"
}