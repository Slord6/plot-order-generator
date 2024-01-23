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
            },
            maxPlotCount: {
                type: "string",
                short: "m",
                default: ""
            },
            sample: {
                type: "string",
                short: "s",
                multiple: true,
                default: []
            }
        },
    });

    return args;
}

function readFileText(filePath) {
    return fs.readFileSync(filePath).toString();
}

function loadPlotFiles(filePaths) {
    const allPlots = [];
    filePaths.map(filePath => {
        return readFileText(filePath)
            .split("\n");
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

function getSamples(samplePaths) {
    let samples = samplePaths.map(readFileText).map(sampleText => {
        const options = sampleText.split("\n");
        const rand = Math.floor(Math.random() * options.length);
        return options[rand];
    });
    return samples;
}

function getRandomPlots(plots, maxCount) {
    plots = shuffleArray(plots);
    // Limit to the maximum number of plot points for this generation
    const subset = plots.slice(0, maxCount);
    return subset;
}

function help() {
    console.log(`node .\\plotPoints.js <opts>
        -c,--count\t<number>\tNumber of shuffled sequences to generate (default: 1)
        -p,--plotPoint\t<string>\tAdd a single plot point (multiple allowed)
        -f,--file\t<file path>\tAdd all the plot points from the file (new line separated, multiple allowed)
        -m,--maxPlotCount\t<number>\tNumber of plot points to generate (capped at # inputs, default: # inputs)
        -s,--sample\t<file path>Take a single line from this file and add it to the shuffled plots (multiple allowed)
    `);
}

function start() {
    const args = getArgs();
    let plots = [...loadPlotFiles(args.values.file), ...args.values.plotPoint];
    if(plots.length == 0) {
        return help();
    }

    const plotCount = args.values.maxPlotCount !== "" ? Math.min(plots.length, Number(args.values.maxPlotCount)) : plots.length;
    // Iterate for each generation of plots
    for (let i = 0; i < args.values.count; i++) {
        console.log(`${i}:`);
        const randomPlots = getRandomPlots(plots, plotCount);
        const samples = getSamples(args.values.sample);
        console.log(shuffleArray([...randomPlots, ...samples]).join("\n"));
    }
}

start();