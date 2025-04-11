# NaukaGita

### Practical examples and experiments with Git&GitHub

Zmieniamy plik na gałęzi `main` i `konflikt`.

### Cofanie zmian i resetowanie commitów

- `git revert` – tworzy nowy `commit`, który cofa zmiany wprowadzone przez wybrany commit, nie usuwa historii. Bezpieczne w pracy zespołowej.

- `git reset` – przesuwa wskaźnik HEAD do wybranego commita, może usuwać historię lokalnie, zależnie od opcji.

- `--soft` – resetuje tylko `HEAD`, zachowuje zmiany w `staging area` (`git add`).

- `--hard` – resetuje `HEAD`, `staging area` i cofa też zmiany w plikach – wszystko znika. Uwaga: może być nieodwracalne.

- `SHA commita` – unikalny identyfikator (np. `a1b2c3d`) używany do wskazywania konkretnego commita.

#### Różnica:

- `revert` – zachowuje historię, dodaje `commit` cofający zmiany.

- `reset` – cofa `HEAD` (i ewentualnie pliki), może usuwać historię, zwłaszcza z `--hard`.

### `.gitignore`

Plik `.gitignore` to specjalny plik w repozytorium Git, który zawiera listę plików i katalogów, które Git ma ignorować – tzn. nie śledzić ich zmian i nie dodawać ich do commitów, nawet jeśli istnieją w katalogu projektu.

```
*.log       # ignoruj wszystkie pliki .log
temp/       # ignoruj cały katalog temp
.env        # ignoruj plik .env
```

### `Cherry-pick`

`git cherry-pick` to polecenie, które pozwala skopiować pojedynczy `commit` (lub kilka `commitów`) z jednej gałęzi do innej – bez łączenia całych historii gałęzi. Głównie przydaje się, gdy chcemy przenieść konkretną zmianę bez wykonywania pełnego `merge`’a czy `rebase`’a. Składnia polecenia:
```
git cherry-pick <hash_commita>
```

### Git `hooks`

`Hook` Gita to specjalny skrypt, który jest automatycznie uruchamiany w odpowiedzi na konkretne zdarzenie – na przykład przed `commitem`, po `mergu`, po pobraniu zmian itd.

Lokalizacja: 

```
.project-directory/
├── .git/
│   └── hooks/
│       ├── pre-commit
│       ├── commit-msg
│       ├── post-merge
│       └── ... (inne)
```
#### Typy

| Hook           | Kiedy się odpala?                          |
|----------------|--------------------------------------------|
| `pre-commit`   | Przed wykonaniem `git commit`              |
| `commit-msg `  | W momencie zapisu wiadomości commita       |
| `post-merge`   | Po zakończonym mergu                       |
| `pre-push `    | Przed `git push`                           |

#### Składnia:

```bash
#!/bin/bash

# 1. Komentarz informujący o funkcji hooka
echo "Opis działania hooka..."

# 2. Definicja zmiennych (opcjonalne)
# Możesz tu zdefiniować zmienne do przechowywania danych potrzebnych w skrypcie
variable="wartość"

# 3. Warunki lub sprawdzanie plików (np. zmiany w repozytorium)
# Znajdowanie plików zmienionych w danym commicie (przykład dla pre-commit)
changed_files=$(git diff --cached --name-only --diff-filter=ACM)

# 4. Pętla lub logika sprawdzająca warunki
# Można tu np. sprawdzać składnię plików, zależności, czy inne wymagania
for file in $changed_files; do
    # Przykładowe sprawdzenie (np. dla plików JavaScript):
    if [[ "$file" == *.js ]]; then
        # Sprawdzenie składni (można użyć narzędzia zewnętrznego)
        command_to_check "$file"
        if [ $? -ne 0 ]; then
            echo "Błąd w pliku $file. Commit zablokowany."
            exit 1  # Zablokowanie commita w przypadku błędu
        fi
    fi
done

# 5. Potwierdzenie pomyślnego zakończenia operacji
echo "Wszystkie pliki przeszły pomyślnie!"

# 6. Końcowy status (0 = OK, 1 = błąd)
exit 0
```

### `git reflog`

`git reflog` to narzędzie w Git, które śledzi historię referencji (np. gałęzi, `commitów`, `HEAD`) w repozytorium. Działa to jak dziennik, który zapisuje wszystkie zmiany w wskazówkach na gałęziach (referencjach) - także te, które nie są zapisane w zwykłej historii commitów (np. zmiany w `HEAD`, zmiany gałęzi, resetowanie itp.).

Każda akcja zmieniająca `HEAD` (np. przełączenie na inną gałąź, `commit`, `reset`) jest zapisywana w reflogu z unikalnym identyfikatorem, zatem możliwym jest, aby wykorzystać `git reflog` do wyświetlenia historii tych zmian.

#### Zastosowanie:

- Odzyskiwanie utraconych `commitów`.
- Reflog zapisuje historię zmian `HEAD` (np. przełączania gałęzi, `commitów`, `resetów`).
- Umożliwia powrót do wcześniejszych `commitów` lub stanów repozytorium, które nie znajdują się w normalnej historii `commitów`.
- Odzyskiwanie usuniętych gałęzi.
- Pomaga w analizie działań na repozytorium (np. `rebase`, `merge`), które mogły wpłynąć na historię projektu.

```
THIS SECTION 
WAS CREATED 
TO DEMONSTRATE 
HOW GIT REDFLOG WORKS
```

### `git submodule`

#### 1. Przejdź do katalogu swojego projektu
Otwórz terminal i przejdź do katalogu, w którym znajduje się Twoje główne repozytorium.

`cd /ścieżka/do/twojego/repozytorium`

#### 2. Dodaj submoduł do katalogu `vendor/`
Użyj poniższej komendy, aby dodać repozytorium jako submoduł w katalogu `vendor/`:

`git submodule add https://github.com/Tomasz-Zdeb/Automated-Arbitrage-Oppurtinity-Detector.git vendor/Automated-Arbitrage-Oppurtinity-Detector`

W wyniku tej komendy zostanie sklonowane repozytorium do katalogu `vendor/Automated-Arbitrage-Oppurtinity-Detector` w Twoim projekcie.

#### 3. Zainicjuj submoduł
Aby zainicjować submoduł, uruchom:

`git submodule init`

#### 4. Zaktualizuj submoduł do najnowszej wersji
Zaktualizuj submoduł do najnowszej wersji, aby upewnić się, że masz najnowsze zmiany:

`git submodule update --remote`

#### 5. Dodaj zmiany do repozytorium
Po dodaniu submodułu i jego aktualizacji, dodaj zmiany do swojego repozytorium głównego:

`git add .`

#### 6. Zatwierdź zmiany
Następnie zatwierdź zmiany w głównym repozytorium:

`git commit -m "Add submodule Automated-Arbitrage-Oppurtinity-Detector"`

#### 7. Wypchnij zmiany do zdalnego repozytorium
Wypchnij zmiany do zdalnego repozytorium:

`git push`

#### 8. Sprawdź status submodułów
Aby sprawdzić status submodułów, użyj:

`git submodule status`

#### 9. Sprawdź status repozytorium
Możesz również sprawdzić status swojego repozytorium:

`git status`

### `git tag`

Tag w Git służy do oznaczania ważnych punktów w historii repozytorium, np. wersji oprogramowania (v1.0, v2.1 itp.). Najczęściej używany przy wersjonowaniu.

- Rodzaje tagów:
  - Lekki tag (`lightweight`): jak "alias" dla konkretnego commita.
    * Przykład: `git tag v1.0`
  - Adnotowany tag (`annotated`): zawiera metadane (autor, data, komentarz).
    * Przykład: `git tag -a v1.0 -m "Pierwsze wydanie"`

-  Tworzenie tagu:
    - Lekki tag:
      `git tag v1.0`
    - Adnotowany tag:
      `git tag -a v1.0 -m "Opis wersji"`

- Tworzenie tagu dla konkretnego commita:
      `git tag v1.0 <commit_hash>`

-  Wyświetlanie tagów:
      `git tag`

- Szczegóły konkretnego tagu:
      `git show v1.0`

-  Wysyłanie tagu do zdalnego repozytorium:
      `git push origin v1.0`

- Wysyłanie wszystkich tagów:
      `git push origin --tags`

-  Usuwanie tagu:
    - Lokalnie:
      `git tag -d v1.0`
    - Zdalnie:
      `git push origin --delete v1.0`

```
Sprawdzanie tagów na GitHubie:
    1.  Wejdź na stronę repozytorium
    2. Kliknij „Tags” obok „Branches”
    3. Zobaczysz listę dostępnych tagów
```

- Zastosowanie:
    - Wersjonowanie wydań (`release`)
    - Oznaczanie stabilnych `commitów`
    - publikacja na `GitHub Releases`
