const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n\n');

const getUniqueAnswers = (answers) => {
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    return answers.filter(onlyUnique);
}

const getPeopleWhoAnsweredYes = (uniqueAnswers, fullAnswers) => {
    if (uniqueAnswers.length === 0) {
        return 0;
    }

    const uniqueAnswerHead = uniqueAnswers[0];
    const fullAnswersHead = fullAnswers[0].split('\n');

    const uniqueAnswerTail = uniqueAnswers.length > 1 ? uniqueAnswers.slice(1) : []
    const fullAnswersTail = fullAnswers.length > 1 ? fullAnswers.slice(1): [];

    const answeredYesCount = uniqueAnswerHead.reduce((total, answerLetter) => {
        const peopleWhoAnsweredYes = fullAnswersHead.filter(x => x.indexOf(answerLetter) !== -1);
        if (peopleWhoAnsweredYes.length === fullAnswersHead.length) {
            return total + 1;
        }
        return total;
    }, 0);
    return answeredYesCount + getPeopleWhoAnsweredYes(uniqueAnswerTail, fullAnswersTail);
}

const uniqueAnswers = input
                        .map(x => x.replace(/\n/g, '').split(''))
                        .map(getUniqueAnswers)

const totalUniqueAnswers = uniqueAnswers
                            .map(x => x.length)
                            .reduce((acc, count) => {return acc + count}, 0);

console.log(`Total unique answers: ${totalUniqueAnswers}`);

const answeredYes = getPeopleWhoAnsweredYes(uniqueAnswers, input);;

console.log(`Total people who answered yes: ${answeredYes}`);
