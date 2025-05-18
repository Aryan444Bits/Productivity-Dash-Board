function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackbtn = document.querySelectorAll('.fullElem .back')
    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackbtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}
openFeatures();

function todoList() {
    var currentTask = [];

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }
    else {
        localStorage.setItem('currentTask', currentTask)
    }

    function renderTask() {
        let allTask = document.querySelector('.allTask')
        let sum = '';
        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                        <button id=${idx}>Mark As Completed</button>
                    </div>`
        })
        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask();
            })
        })
    }
    renderTask();

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDteailsInput = document.querySelector('.addTask form textarea')
    let taskcheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        currentTask.push(
            {
                task: taskInput.value,
                details: taskDteailsInput.value,
                imp: taskcheckbox.checked
            }
        )
        renderTask();
        taskcheckbox = false;
        taskDteailsInput.value = ''
        taskInput.value = ''
    })
}
todoList();

function dailyPlanner() {
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var dayPlanner = document.querySelector('.day-planner')


    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = '';

    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || ''
        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>`
    })


    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner()

function motivationalQuote() {

    var moticard = document.getElementById('2')
    var motivationQuote = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let reponse = await fetch('https://zenquotes.io/api/random')
        let data = await reponse.json()

        motivationQuote.innerHTML = data.content
        motivationAuthor.innerHTML = '~' + data.author
    }
    fetchQuote();
    moticard.addEventListener('click', function () {
        fetchQuote();
    })
}
motivationalQuote();

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    var startbtn = document.querySelector('.pomo-timer .start-timer')
    var pausebtn = document.querySelector('.pomo-timer .pause-timer')
    var resetbtn = document.querySelector('.pomo-timer .reset-timer')
    var head = document.querySelector('.pomodoro-fullpage h2')

    let isworksession = true;
    let timerinterval = null;
    let totalseconds = 25 * 60

    function updateTimer() {
        let minutes = Math.floor(totalseconds / 60)
        let seconds = totalseconds % 60;

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }
    updateTimer();
    function starttimer() {
        clearInterval(timerinterval)
        if (isworksession) {
            totalseconds = 25 * 60;
            timerinterval = setInterval(() => {
                if (totalseconds > 0) {
                    totalseconds--;
                    updateTimer();
                } else {
                    isworksession = false;
                    clearInterval(timerinterval)
                    timer.innerHTML = '05:00'
                }
            }, 1)
        } else {
            totalseconds = 5 * 60;
            timerinterval = setInterval(() => {
                if (totalseconds > 0) {
                    totalseconds--;
                    updateTimer();
                    head.innerHTML = 'Break Time 🍕'
                } else {
                    isworksession = true;
                    clearInterval(timerinterval)
                    timer.innerHTML = '25:00'
                    head.innerHTML = 'Study With Me!'
                }
            }, 10)
        }
    }
    function pauseinterval() {
        clearInterval(timerinterval)
    }
    function resetinterval() {
        clearInterval(timerinterval)
        totalseconds = 25 * 60
        updateTimer();
    }
    startbtn.addEventListener('click', starttimer)
    pausebtn.addEventListener('click', pauseinterval)
    resetbtn.addEventListener('click', resetinterval)

}
pomodoroTimer();

function weatherFunctionality() {

    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherstack.com/current?access_key=3c70047a7d38ebbd89b2ddbbf2c26a54&query=Lucknow`)
        data = await response.json()
        console.log(data);


        header2Temp.innerHTML = `${data.current.temperature}°C`
        wind.innerHTML = `Wind: ${data.current.wind_speed} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.precip}%`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}
weatherFunctionality()
function MoviePlaylist(){
    const webseries = [
    {
        name: 'Money Heist',
        imdb: '8.5/10',
        image: 'https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_FMjpg_UX1000_.jpg'
    },
    {
        name: 'Alice in Bother Land',
        imdb: '8.2/10',
        image: 'https://flxt.tmsimg.com/assets/p18829068_b_v9_aa.jpg'
    },
    {
        name: 'Panchayat',
        imdb: '8.5/10',
        image: 'https://www.themoviedb.org/t/p/original/7tiGMeP6iJD8GASPtNdrYvdqdZM.jpg'
    },
    {
        name: 'Mirzapur',
        imdb: '8.4/10',
        image: 'https://assets.gadgets360cdn.com/pricee/assets/product/202406/Mirzapur_Season_3_1718088853.jpg',
    },
    {
        name: '8 Am Metro',
        imdb: '8.4/10',
        image: 'https://m.media-amazon.com/images/M/MV5BZTY3ZWI1NTgtYWU5MC00YjMwLWE4NzQtYjQ5NzExMjFmYzEyXkEyXkFqcGdeQXVyMzI2MTg3Nzk@._V1_.jpg',
    },
    {
        name: 'ThiruchitramBalam',
        imdb: '7.5/10',
        image: 'https://c.saavncdn.com/238/Thiruchitrambalam-Tamil-2022-20220927091058-500x500.jpg',
    },
    {
        name: 'Marco',
        imdb: '8/10',
        image: 'https://m.media-amazon.com/images/M/MV5BMDNkZmZlOWEtMjIxYS00MzMwLTg4ODYtMDRmNzY2NjY3NDdkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
        name: 'A Haunted House',
        imdb: '6/10',
        image: 'https://www.dvdsreleasedates.com/posters/800/A/A-Haunted-House-2013-movie-poster.jpg',
    },
    {
        name: 'Old Boy',
        imdb: '8.6/10',
        image: 'https://media.senscritique.com/media/000021973927/0/old_boy.jpg'
    },
    {
        name: 'Game of Thrones',
        imdb: '9/10',
        image: 'https://i.redd.it/h7uga1bv24fz.jpg'
    },
    {
        name: 'Peaky Blinders',
        imdb: '8/10',
        image: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/07/peaky-blinders-netflix-poster.jpg'
    },
    {
        name: 'All of us are Dead',
        imdb: '8.6/10',
        image: 'https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/8c21b6c6-aed5-4221-811f-a7b57ba92e06_1.jpg'
    }
];

function getRandomSubset(array, size) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}

function cards() {
    let sum = '';
    const randomSubset = getRandomSubset(webseries); // show 4 random series
    randomSubset.forEach((ele) => {
        sum += `<div class="card1">
                    <img src="${ele.image}" alt="${ele.name}">
                    <h3>${ele.name}</h3>
                    <p>IMDb: ${ele.imdb}</p>
                </div>`;
    });

    document.querySelector('.movie-playlist-fullpage .seriescards').innerHTML = sum;
}

cards();
setInterval(cards, 5000);
}
MoviePlaylist();

function ThemeChanger(){
    const main = document.getElementById("main");

const backgrounds = [
    "#f5f7fa",           
    "#e0f7fa",           
    "#ffe0b2",           
    "#e1bee7",           
    "#c8e6c9",           
    "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
];

let currentIndex = 0;

setInterval(() => {
    main.style.background = backgrounds[currentIndex];
    currentIndex = (currentIndex + 1) % backgrounds.length;
}, 5000);
}
ThemeChanger();
