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