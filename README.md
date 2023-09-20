# Flashcard App

## Overview

#### The goal of this app is to help students study for tests faster. This application provides numerous methods for studying flashcards in ways students might find more efficient. In other applications, there is a lack in incentive to read the whole term/definition at the start of studying a set. The applications either start the user with multiple choice or true/false questions. This can lead to the user either guessing or just reading a few words in the answer to make a more accurate guess. When the user tries to write out the term/definition, they will be unlikely to succeed because they did not read the full term/definition. This application fixes that issue by implementing a copying area. The user copies the term/definition, but the term/definition being copied disappears when the user starts typing. This forces the user to read and learn the term/definition right away. There are other learning features implemented that also help the user study. This application is meant to help students memorize terms and definitions by actively thinking about the task rather than allowing the user to simply guess at the start.

## Setup

### Front End
1. Download node.js
2. Clone the repository
3. Open up the project in your text editor, I recommend Visual Studio Code
4. Start the code: In the command prompt (ctrl+` for VS Code) type npm start
5. The website should pop up

### Back End
Link will be here

## Learning features

### Copy Area

#### User copies term/definition. Once user starts typing, the term/definition shown will disappear and the timer starts. When the timer runs out, the term/definition will show up again. Then the user can continue typing, the term/definition will disappear, and the timer will start again. Every time the user types a character, the timer resets. Once the user writes the correct corresponding term/definition, the border will turn green and the timer will start. This gives the user time to read the correct answer one more time before moving on to the next term/definition.

### Matching

#### To play, the user clicks on a term and then click on a definition. If they choose the corresponding definition, the borders should completely fade. If not, it currently just deselects the term and selects only the definition (or vice versa). Once all of the terms and definitions are matched, the app automatically moves on to the next set of terms and definitions.

### Written

#### User has to write the corresponding term/definition. If the user has trouble remembering, they can get a hint. If they write it incorrectly, they have to copy the correct term/definition. When the user copies the correct term/definition, the app moves on to the next term/definition.

### Test

#### User is tested with true/false, matching, multiple choice, and written questions. When the user submits the test, the app will give the user a grade based on their test results.
<!--

## Learning features
### Important

#### For reference, I use the word "pair" to mean "A term and its corresponding definition". Also, the word "set" to sometimes mean "A collection of pairs".

### Copying Area

#### This page forces the user to memorize as much as they can before typing. Then once they start typing, the term/definition shown will disappear and the timer starts. When the timer runs out, the term/definition will show up again. Then the user can continue typing, the term/definition will disappear, and the timer will start again. Every time the user types a character, the timer resets. Once the user writes the correct corresponding term/definition, the border will turn green and the timer will start to give the user time to read the correct answer in full one more time before moving on to the next term/definition. In settings, the user can change whether to answer with the terms or definitions. They can also change the total time of the timer. Lastly, there is the option to make the answer case insensitive incase it doesn't matter. It might be annoying to copy the word correctly and have to figure out that one letter was cased incorrectly. In the future, I want to be able to highlight where the user started copying incorrectly. This would save the user time in trying to figure out where they copied wrong. 

## Matching

#### This page is the next step in the learning process. It is meant to be a more entertaining way to learn the terms/definitions. At this point, the user should have a good idea of what the answers look like, now they can quiz if they know which term belongs to which definition and vice versa. To play, the user clicks on a term and then click on a definition. If they choose correctly, the borders should completely fade. If not, it currently just deselects the term and selects only the definition (or vice versa). Once all of the terms and definitions are matched, the app automatically moves on to the next set of terms and definitions. The program does not just shuffle the terms and definitions, but rather rotates through the list and then shuffles. If we have a list of pairs: [pair1,pair2,pair3,pair4], the code shuffles the terms/definitions of pair1 and pair2 and displays them. When the user completes the matching, the program will move on to shuffle pair3 and pair4 and display them. Then after the user completes the matching, the program will move on to shuffle pair1 and pair2 again and display them. In the settings, I made it so that the user can adjust the movement factor. So instead of going from pair1 and pair2 to pair3 and pair4, the user can go from pair1 and pair2 to pair2 and pair3 or a different instance. Another setting is adjusting the number of pairs shown. This way, the user can adjust the matching based on the number of pairs or how fast they wish to learn. In the future, I want to make it so that the correctly matched pair gets color coordinated borders to indicate their relation as the user plays the matching. This way, they user can look back and identify which term went to which definition (and vice versa). I also want to make a notice or something like it to explain the step size setting and what it does.

## Written

#### This page is for testing the user's knowledge of the pairs. At this point, the user should be very familiar with the set and just need to work out a few mistakes being made.

-->