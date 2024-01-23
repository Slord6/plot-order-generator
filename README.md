# plot-order-generator
 Generate plot points in a random order to generate ideas for stories

## Usage
```
node .\\plotPoints.js <opts>
        -c,--count  <number>    Number of shuffled sequences to generate (default: 1)
        -p,--plotPoint  <string>    Add a single plot point (multiple allowed)
        -f,--file   <file path>  Add all the plot points from the file (new line separated, multiple allowed)
        -m,--maxPlotCount   <number>    Number of plot points to generate (capped at # inputs, default: # inputs)
        -s,--sample <file path> Take a single line from this file and add it to the shuffled plots (multiple allowed)

        Pass no args to get the above help message
```

### Pass plot point in the command line

`node .\plotPoints.js -p "Dennis calls the police" -p "Gnasher escapes" -p "Dennis breaks into the garage" -p "The car crash happens" -p "Pie face eats a pie"  -c 2`

Which might output:

```Text
0:
Dennis breaks into the garage
The car crash happens
Dennis calls the police
Gnasher escapes
Pie face eats a pie
1:
The car crash happens
Gnasher escapes
Pie face eats a pie
Dennis breaks into the garage
Dennis calls the police
```
### Pass plot points from a file

Assuming a file called `example-plots.txt` with the following content:

```Text
The hacker enters the bank
The money disappears
Guns are drawn in the bank
The police pull up outside
The bank vault opens
A mysterious aircraft lands on the roof of the bank
```

`node .\plotPoints -f .\example-plots.txt`

Might output:

```Text
0:
A mysterious aircraft lands on the roof of the bank
The bank vault opens
The hacker enters the bank
The money disappears
The police pull up outside
Guns are drawn in the bank
```

## Use only a subset of the input

`node .\plotPoints -f .\example-plots.txt --maxPlotCount 2`

Example output:

```
0:
The hacker enters the bank
The bank vault opens
```