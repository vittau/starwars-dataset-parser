# Star Wars Network Dataset Parser

Parser for the "Star Wars Social Network" dataset from Kaggle into an SMV specification social network file. This is for my doctoral thesis.

## Usage

For an explanation of the parameters, run:

```bash
$ node sw2smv -h
```

Example usage:

```bash
$ node sw2smv -f dataset\starwars-episode-4-interactions.json -t 0.3 -s -l "G F agents[8] = behavior" > output.smv
```

```bash
$ node sw2smv -f dataset\starwars-episode-4-interactions.json -s -o graphviz > output.dot
```

## Credits

- Includes a modified version of the file `starwars-episode-4-interactions.json` from [here](https://www.kaggle.com/ruchi798/star-wars).
  - Date: April 10, 2021;
  - License: CC0: Public Domain.
