import { parseArgs } from "node:util";
import fs from 'fs';

function getArgs() {
    const args = parseArgs({
        options: {
            plotPoint: {
                type: "string",
                short: "p",
                multiple: true,
                default: []
            },
            count: {
                type: "string",
                short: "c",
                default: "1"
            },
            file: {
                type: "string",
                short: "f",
                multiple: true,
                default: []
            }
        },
    });

    return args;
}

function loadPlotFiles(filePaths) {
    const allPlots = [];
    filePaths.map(filePath => {
        return fs.readFileSync(filePath).toString()
            .split("\n")
            .map(plotPoint => plotPoint.trim());
    }).forEach(plotSet => allPlots.push(...plotSet));
    return allPlots;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function help() {
    console.log(`node .\\plotPoints.js <opts>
        -c,--count\t<number>\tNumber of shuffled sequences to generate (default: 1)
        -p,--plotPoint\t<string>\tAdd a single plot point (multiple allowed)
        -f,--file\t<file path>\tAdd all the plot points from the file (new line separated, multiple allowed)
    `);
}

function start() {
    const args = getArgs();
    let plots = [...loadPlotFiles(args.values.file), ...args.values.plotPoint];
    if(plots.length == 0) {
        return help();
    }

    for (let i = 0; i < args.values.count; i++) {
        console.log(`${i}:`);
        plots = shuffleArray(plots);
        console.log(plots.join("\n"));
    }
}

start();