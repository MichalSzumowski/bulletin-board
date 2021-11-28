# MainLayout:
- główny układ strony,
# Header:
- dla niezalogowanych – link do logowania za pomocą Auth0,
- dla zalogowanych – link do listy własnych ogłoszeń oraz link do wylogowania,
# Homepage:
- dla zalogowanych – link do dodawania nowego ogłoszenia,
- lista ogłoszeń, zawierająca co najmniej tytuły ogłoszeń,
# Post:
- podstrona pojedynczego ogłoszenia, zawierająca wszystkie informacje,
- dla zalogowanego użytkownika, jeśli jest autorem tego ogłoszenia lub administratorem – link do edycji  ogłoszenia,
# PostEdit:
- dla zalogowanego użytkownika, jeśli jest autorem tego ogłoszenia lub administratorem – widok  umożliwiający edycję ogłoszenia,
# PostAdd:
- dla zalogowanego użytkownika – możliwość dodawania nowego ogłoszenia,
# NotFound:
- informacja o nieznalezieniu strony i link do strony głównej.