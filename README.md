# INFINITE SCROLLING 

## Założenia:
* [x] maksymalnie uniwersalne rozwiązanie, które można wrzucić w dowolne miejsce dowolnej właściwie strony; to oznacza, że elementy specyficzne dla konkretnej strony mają być akceptowane jako parametr (np. nazwy klas czy ID elementów);
* [x] jak infinite scroll, no to musi pobierać jakieś dane; możesz wybrać jedno z dwóch rozwiązań - albo przekazywanie gotowych już danych do Twojej funkcji/klasy jako parametr, albo wywoływanie wewnątrz Twojego kodu zewnętrznej funkcji fetchującej (którą sobie możesz zmockupować, albo po prostu założyć że tam jest i się nią nie przejmować);
* [x] możliwość przekazania mnóstwa opcji modyfikujących działanie
    * [x] threshold gdy będą ładowane nowe elementy
    * [x] ile elementów jest ładowanych
    * [x] wielkość bufora
* [x] pełna obsługa błędów
* [x] walidacja przekazywanych danych pod kątem poprawności (format i typ)
* [x] obsługa loadera w trakcie doładowywania
* [x] zabezpieczenie przed wieloma requestami na raz
* [x] prosta demo-stronka, by było widać jak to działa mniej-więcej.
* [x] umożliwienie tworzenia nowych, niezależnych instancji kodu na jednej stronie, gdyby ktoś chciał zrobić dwa infinite scrolle