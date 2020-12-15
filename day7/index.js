const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n');

const parseBagRule = (rule) => {
    const parentBag = rule.match(/^(\w+ \w+)/)[1];
    const childBagsRules = rule.match(/(\d [\w ]+)bag/g)
    const childBags = childBagsRules ?
                        childBagsRules.map((bagType) => {
                            const [_, capacity, bagColour] = bagType.match(/(\d) ([\w ]+)bag/);
                            return { capacity, bagColour: bagColour.trim()}
                        }) : []
    return { parent: parentBag, children: childBags };
}

const countParents = (bagRulesTree, bagToSearchFor, bags = []) => {
    for ( colour in bagRulesTree) {
        for (let i = 0; i < bagRulesTree[colour].length; i++) {
            if (bagRulesTree[colour][i].bagColour === bagToSearchFor) {
                bags.push(colour);
                countParents(bagRulesTree, colour, bags);
            }
        }
    }
    return bags;
}

const countBags = (bagRulesTree, bagsToSearch) => {
    if (!bagsToSearch || bagsToSearch.length === 0) {
        return 1;
    }
    let total = 1;
    for (let i = 0; i < bagsToSearch.length; i++) {
        const bagToSearch = bagsToSearch[i];
        total += parseInt(bagToSearch['capacity'], 10) * countBags(bagRulesTree, bagRulesTree[bagToSearch.bagColour]);
    }
    return total;
}

const getUnique = (input) => {
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    return input.filter(onlyUnique);
}

const bagRules = input.map(parseBagRule);
const bagRulesTree = bagRules.reduce((output, rule) => {
    output[rule.parent] = rule.children;
    return output;
}, {});

const bags = countParents(bagRulesTree, 'shiny gold');
const uniqueBags = getUnique(bags);

console.log(`Part one: ${uniqueBags.length}`)
console.log(`Part two: ${countBags(bagRulesTree, bagRulesTree['shiny gold']) - 1}`);