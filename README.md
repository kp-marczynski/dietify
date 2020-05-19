# Dietify
Celem pracy było opracowanie systemu do zarządzania dietą w architekturze
mikroserwisów. Aby osiągnąć ten cel przeprowadzono analizę istniejących rozwiązań
konkurencyjnych, przedstawiono niezbędną wiedzę domenową oraz porównano popularne
style architektury aplikacji. Na podstawie zgromadzonej wiedzy wyszczególniono niezbędne
założenia projektowe, zaprojektowano interfejs oraz zdefiniowano kategorie danych wraz
z regułami i ograniczeniami ich dotyczącymi. Następnie przedstawiono opis implementacji
powstałej na podstawie opracowanego projektu. W implementacji kluczową rolę odegrały
języki Java i TypeScript, platforma deweloperska JHipster oraz stos technologii Netflix
OSS dla architektury mikroserwisów. Opracowane rozwiązanie może zostać wykorzystane
przez dietetyków w celu przeprowadzania kompleksowej obsługi wizyty pacjenta z położeniem
szczególnego nacisku na układanie jadłospisów i udostępnianie go pacjentom.

## Wymagania wstępne

-   [Node.js][]
-   [jdk11][]

## Instalacja
### Z Dockerem
Uruchom skrypt: 
    
    sh docker-compose/build-and-run-docker.sh
    
Następnie przejdź do adresu [http://localhost:8080](http://localhost:8080) w przeglądarce.

### Bez Dockera
Najpierw uruchom service discovery: 

    sh service-discovery/start-registry.sh
    
Następnie dla każdej aplikacji { gateway, products, recipes, mealplans, appointments } wykonaj w katalogu głównym aplikacji: 
    
    ./gradlew 

Następnie przejdź do adresu [http://localhost:8080](http://localhost:8080) w przeglądarce.

Żeby skorzystać z wykrywania zmian i automatycznego odświeżania frontendu aplikacji wykonaj poniższe polecania w katalogu głównym serwisu gateway:
    
    npm install && npm start

Następnie przejdź do adresu [http://localhost:9000](http://localhost:9000) w przeglądarce.

## Budowanie wersji produkcyjnej
Dla każdej aplikacji { gateway, products, recipes, mealplans, appointments } wykonaj w katalogu głównym aplikacji:
    
    ./gradlew -Pprod clean bootJar

## Założenia projektowe
### Dekompozycja problemu w oparciu o poddziedziny
Na podstawie wywiadu z dietetykiem, analizy rozwiązań konkurencyjnych oraz opierając
się na wzorcu dekompozycji problemu w oparciu o poddziedziny
dla omawianej aplikacji wspomagania zarządzania dietą można wyszczególnić następujące
poddziedziny:
* poddziedzina administracyjna - służąca jako brama aplikacji, pozwalająca na
zarządzanie użytkownikami i administrowanie aplikacją,
* poddziedzina produkty - skupiająca się na zarządzaniu produktami spożywczymi, ich
wartościami odżywczymi i miarami domowymi,
* poddziedzina przepisy - pozwalająca na zarządzanie przepisami, w tym przypisywanie
do przepisów produktów,
* poddziedzina jadłospisy - pozwalająca na zarządzanie jadłospisami, w tym przypisywanie
do jadłospisów produktów i przepisów,
* poddziedzina wizyty - skupiająca się na całościowym zarządzaniu wizytami pacjenta
w obrębie karty pacjenta, a w szczególności przypisywaniem do wizyty jadłospisów,
przeprowadzaniem wywiadu żywieniowego oraz zbieraniem pomiarów ciała pacjenta.

### Użytkownicy systemu
<img src="documentation/uml/use_case_diagrams/users.png" width="300"/>

### Wymagania funkcjonalne
<img src="documentation/uml/use_case_diagrams/gateway.png" width="600"/>
<img src="documentation/uml/use_case_diagrams/products.png" width="600"/>
<img src="documentation/uml/use_case_diagrams/recipes.png" width="600"/>
<img src="documentation/uml/use_case_diagrams/mealplans.png" width="600"/>
<img src="documentation/uml/use_case_diagrams/appointments.png" width="600"/>

## Architektura systemu
### Ogólna architektura
<img src="documentation/latex/img/podstawowa-architektura.png" width="600"/>

### Diagram rozmieszczenia
<img src="documentation/uml/deployment_diagrams/deployment.png" width="600"/>

### Architektura backendu
<img src="documentation/uml/package_diagrams/backend.png" width="600"/>

### Architektura frontendu
<img src="documentation/latex/img/angular-architecture.png" width="600"/>

## Projekt bazy danych
<img src="documentation/uml/class_diagrams/dataTypes.png" width="300"/>
<img src="documentation/uml/class_diagrams/gateway.png" width="600"/>
<img src="documentation/uml/class_diagrams/products.png" width="600"/>
<img src="documentation/uml/class_diagrams/recipes.png" width="600"/>
<img src="documentation/uml/class_diagrams/mealplans.png" width="600"/>
<img src="documentation/uml/class_diagrams/appointments.png" width="600"/>

## Prototyp interfejsu
<img src="documentation/mockup/0home.png" width="600"/>
<img src="documentation/mockup/6mobile.png" width="300"/>
<img src="documentation/mockup/1products.png" width="600"/>
<img src="documentation/mockup/1products_1new.png" width="600"/>
<img src="documentation/mockup/3mealplans_1new_2calendar.png" width="600"/>
<img src="documentation/mockup/4appointments_2patient-card-details.png" width="600"/>

[node.js]: https://nodejs.org/
[jdk11]: https://openjdk.java.net/projects/jdk/11/
