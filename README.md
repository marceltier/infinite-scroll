# INFINITE SCROLLING 

## Założenia:
* maksymalnie uniwersalne rozwiązanie, które można wrzucić w dowolne miejsce dowolnej właściwie strony; to oznacza, że elementy specyficzne dla konkretnej strony mają być akceptowane jako parametr (np. nazwy klas czy ID elementów);
* jak infinite scroll, no to musi pobierać jakieś dane; możesz wybrać jedno z dwóch rozwiązań - albo przekazywanie gotowych już danych do Twojej funkcji/klasy jako parametr, albo wywoływanie wewnątrz Twojego kodu zewnętrznej funkcji fetchującej (którą sobie możesz zmockupować, albo po prostu założyć że tam jest i się nią nie przejmować);
* możliwość przekazania mnóstwa opcji modyfikujących działanie, jak np. threshold gdy będą ładowane nowe elementy, ile tych elementów jest ładowanych, wielkość bufora (to nie musi być to samo co ilość renderowanych elementów) etc.; przemyśl sam, co tam jeszcze mogłoby być "ustawialne"
* pełna obsługa błędów
* walidacja przekazywanych danych pod kątem poprawności (format i typ)
* obsługa loadera w trakcie doładowywania
* zabezpieczenie przed wieloma requestami na raz
* prosta demo-stronka, by było widać jak to działa mniej-więcej.

`Architektura do wyboru przez Ciebie, chociaż osobiście jestem zdania, że aby umożliwić maksymalną uniwersalność, to pewnie dobrze by było umożliwić tworzenie nowych, niezależnych instancji kodu na jednej stronie, gdyby ktoś chciał zrobić dwa infinite scrolle (np. w jakimś boxie ze scrollem)`