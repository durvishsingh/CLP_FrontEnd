camelize = function camelize(str) 
{
    const words = str.split(' ');  
    const CapitalizedWords = [];  
    words.forEach(element => {  
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
}
async function search()
{
    const form = document.querySelector(".top-banner form");
 
    form.addEventListener("submit", e => {
        e.preventDefault();
        const inputVal = document.getElementById("myText").value;
        console.log('Starting . . . ');
        console.log('Fetching the data');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=5268057305397021b93271c5b3317541`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // do stuff with the data
            console.log(data);
            const daytoday = {1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday',0:'Sunday'};
            const monthtomonth = {0:'January',1:'February',2:'March',3:'April',4:'May',5:'June',6:'July',7:'August',8:'September',9:'October',10:'November',11:'December'};
            if(Object.keys(data).length==2)
            {
                throw "City Not Found";
            }
            const d = new Date(1970, 0, 1);
            d.setSeconds(data.dt);
            curr = (data.main.temp - 273.0).toFixed(1);
            min = (data.main.temp_min - 273.0).toFixed(1);
            max = (data.main.temp_max - 273.0).toFixed(1);
            const ampm = d.getHours() >= 12 ? 'pm' : 'am';
            regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
            console.log(d.getDay());
            const card = `
            <div class="card-body">
            <div id="day" class="display-1">
                ${daytoday[d.getDay()]}
            </div>
            <div id="date">
                ${d.getDate()} ${monthtomonth[d.getMonth()+1]}, ${d.getFullYear()}, ${data.name}
            </div>
            <br>
            <div id="temp" class="display-5">
                ${curr} &#8451;
            </div>
            <br>
            <div id="maxtemp">
                Max : ${max} &#8451;
            </div>
            <div id="mintemp">
                Min : ${min} &#8451;
            </div>
            <br>
            <span id="other">
                ${data.weather[0].main}
                <figure>
                    <img class="city-icon" src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt=Dust>
                    <figcaption>${camelize(data.weather[0].description)}</figcaption>
                </figure>
            </span>
        </div>`;
        document.getElementById("card").innerHTML = card;
        document.getElementById("msg").innerHTML = "";
        })
        .catch((err) => {
            console.log(err);
            document.getElementById("msg").innerHTML = err;
            document.getElementById("card").innerHTML = ``;
        });
    });
}

search();
console.log('End.');