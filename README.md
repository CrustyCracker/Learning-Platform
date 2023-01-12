## Temat
Tematem naszego projektu jest platforma edukacyjna, pozwalająca na dodawanie pytań połączonych z odpowiedzią i źródłem wiedzy (taki zestaw będzie dalej zwany fiszką), przeglądanie fiszek oraz grupowanie ich z użyciem grup i tagów. Użytkownicy muszą się zalogować, aby przeglądać i dodawać nowe fiszki i grupy, które mają ustawienia publiczności.

## Uruchamianie aplikacji
1. Skonfiguruj połączenie między aplikacją backendową a bazą danych w pliku application.properties. Należy podać adres bazy, hasło i nazwę użytkownika.
2. Przejdź do katalogu /api i uruchom polecenie "mvn clean install" w celu skompilowania
i zainstalowania aplikacji.
3. Uruchom polecenie "mvn spring-boot:run" aby uruchomić aplikację backendową.
4. Przejdź do katalogu /platform i uruchom polecenie "npm install" w celu zainstalowania
potrzebnych zależności.
5. Uruchom polecenie "npm start" w celu uruchomienia aplikacji frontendowej.
6. Uruchom aplikację i sprawdź, czy wszystkie funkcjonalności działają poprawanie, w razie problemów zgłoś je do dostawcy oprogramowania.


## Funkcjonalności aplikacji:
- Założenie konta użytkownika
- Zalogowanie się na konto
- Wylogowanie się z konta
- Tworzenie, edytowanie oraz usuwanie fiszek
- Tworzenie, edytowanie oraz usuwanie grup
- Wyszukanie fiszek i grup po nazwie
- Dodawanie tagów
- Wyszukanie fiszek i grup po tagu
- Dodanie fiszki do grupy (podczas dodawania lub edycji grupy, oraz podczas dodawania lub edycji fiszki)
- Przechodzenie przez tryb nauki dla danej grupy (przeglądanie fiszek)
- Przechodzenie przez tryb testu dla danej grupy (użytkownik widzi pytanie, może udzielić odpowiedzi i po przejściu przez test porównać swoje odpowiedzi do odpowiedzi prawidłowych)

