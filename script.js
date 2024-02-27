const pauseBtn = document.getElementById('pause');

// handler to set the value of the '--part' variable equal to 1/16th of the page width
const setPartsSizes = () => {
    const part = Math.ceil(window.innerWidth / 16);
    document.documentElement.style.setProperty('--part', `${part}px`);
};

// a method of creating animation of changing slides once per interval
const switchingAnimation = ((intervalValue, durationValue) => {
    const pauseBtn = document.getElementById('pause');
    const nextBtnSlide = document.getElementById('next_btn');

    const switcherSetup = () => {
        const faces = document.getElementsByClassName('face');
        const backs = document.getElementsByClassName('back');
        const slides_container = document.getElementById('slides_container');
        const OPTIONS = {
            forwards: 'face-slide',
            backwards: 'back-slide',
            faceColor: 'rgb(47, 62, 58)',
            backColor: 'rgb(224, 242, 237)',
            duration: durationValue,
        };

        const setup = () => {
            const { forwards, backwards, faceColor, backColor, duration } = OPTIONS;
            slides_container.style.backgroundColor = faceColor;

            for (let i = 0; i < faces.length; i++) {
                setTimeout(() => {
                    faces[i].style.animation = `${forwards} ${duration}s ease-in forwards`;
                    backs[i].style.animation = `${backwards} ${duration}s ease-in forwards`;
                }, i * 100);
            }

            [OPTIONS.forwards, OPTIONS.backwards, OPTIONS.faceColor, OPTIONS.backColor] = [
                backwards,
                forwards,
                backColor,
                faceColor,
            ];
        };

        return setup; //closure
    };

    const switcherInit = switcherSetup();
    let switchingIntervalStatus;
    let switchingInterval;

    const startSwitching = () => {
        if (!switchingIntervalStatus) {
            switchingInterval = setInterval(() => {
                switcherInit();
            }, intervalValue);
            console.log(`Switching started with id №${switchingInterval}; interval = ${intervalValue} ms`); //debug
            switchingIntervalStatus = true;
            pauseBtn.src = 'pause_ico.png';
        }
    };

    const stopSwitching = () => {
        if (switchingIntervalStatus) {
            clearInterval(switchingInterval);
            switchingIntervalStatus = false;
            pauseBtn.src = 'play_ico.png';
            console.log(`Switching stopped with id №${switchingInterval}; interval = ${intervalValue} ms`); //debug
        }
    };

    const toggleSwitching = () => {
        if (switchingIntervalStatus) {
            stopSwitching();
        } else {
            startSwitching();
        }
    };

    //closure
    return {
        startSwitching: startSwitching,
        stopSwitching: stopSwitching,
        toggleSwitching: toggleSwitching,
    };
})(5500, 3.5);
// first argument (milliseconds) minimum 1500ms longer than second argument (seconds)

//What's hidden behind the walls

const fillText = [
    '    behi',
    '       nd ',
    '     the',
    '       wal  ',
    '      ls',
    '      Wha',
    '        ts',
    '       hid',
    '        den  ',
    '',
];

const rowsTextFiller = ((textArray) => {
    const singleRowTextFiller = (faceContent, backContent, row) => {
        const faceRowsList = document.getElementsByClassName(`f_row${row} `);
        const backRowsList = document.getElementsByClassName(`b_row${row}`);
        const spaceChar = '&nbsp;';

        let faceContentCharArray = [];
        let backContentCharArray = [];

        faceContent && (faceContentCharArray = faceContent.split(''));
        backContent && (backContentCharArray = backContent.split(''));

        faceContentCharArray.push(...Array(16 - faceContentCharArray.length).fill(' '));
        backContentCharArray.push(...Array(16 - backContentCharArray.length).fill(' '));

        const fill = () => {
            for (let i = 0; i < backContentCharArray.length && i < backRowsList.length; i++) {
                backRowsList[i].innerHTML = backContentCharArray[i];
                if (backContentCharArray[i] === ' ') {
                    backRowsList[i].innerHTML = spaceChar;
                }
            }
            for (let j = 0; j < faceContentCharArray.length && j < faceRowsList.length; j++) {
                faceRowsList[j].innerHTML = faceContentCharArray[j];
                if (faceContentCharArray[j] === ' ') {
                    faceRowsList[j].innerHTML = spaceChar;
                }
            }
        };

        return fill; //closure
    };

    const RowTextInit_1 = singleRowTextFiller(textArray[0], textArray[5], 1);
    const RowTextInit_2 = singleRowTextFiller(textArray[1], textArray[6], 2);
    const RowTextInit_3 = singleRowTextFiller(textArray[2], textArray[7], 3);
    const RowTextInit_4 = singleRowTextFiller(textArray[3], textArray[8], 4);
    const RowTextInit_5 = singleRowTextFiller(textArray[4], textArray[9], 5);

    return {
        RowTextInit_1: RowTextInit_1,
        RowTextInit_2: RowTextInit_2,
        RowTextInit_3: RowTextInit_3,
        RowTextInit_4: RowTextInit_4,
        RowTextInit_5: RowTextInit_5,
    };
})(fillText);

rowsTextFiller.RowTextInit_1();
rowsTextFiller.RowTextInit_2();
rowsTextFiller.RowTextInit_3();
rowsTextFiller.RowTextInit_4();
rowsTextFiller.RowTextInit_5();

window.addEventListener('load', switchingAnimation.startSwitching, false);
window.addEventListener('load', setPartsSizes, false);
window.addEventListener('resize', setPartsSizes, false);

pauseBtn.addEventListener('click', switchingAnimation.toggleSwitching, false);

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        switchingAnimation.stopSwitching();
    } else {
        switchingAnimation.startSwitching();
    }
});
