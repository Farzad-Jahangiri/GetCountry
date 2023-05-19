let flagURL = "";//yes
let countryCode = "";//yes
let Neighbor = "";//yes
let nameCountry = "";//yes
let population = "";

const main = document.getElementById("main");
const Search = document.getElementById("search");
const btnSearch=document.getElementById("btnSearch");




class CountryAPI {
    constructor() {
        // this.apiKey = apiKey;
        this.baseUrl = 'https://restcountries.com/v3.1/all';
        this.SearchNameUrl="https://restcountries.com/v3.1/name/"
    }
    async getCountrys() {
        try {
            const url = this.baseUrl;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    creatCard(data) {
        main.innerHTML="";
        let ListCard = []
        let count = 0;
        data.forEach(d => {
            nameCountry = d['name']['common'];
            countryCode = d['idd']['root'];
            Neighbor = d['borders'];
            population = d['population']
            flagURL = d['flags']['png']
            const Card = `<div class="card bg-white w-64 mx-auto rounded-md p-1 m-1">
<div class=" h-32 ">
    <img class="rounded-xl" src="${flagURL}" width="100%" height="100%" alt="flag">
</div>
<div id="nameCountry" class="text-center mt-10 font-bold text-lg">${nameCountry}</div>
<div class="mt-4">
    <div class="flex">
        <h4 class="text-md font-bold">Country prefix code:</h4>
        <p id="countryCode" class="font-bold text-cyan-950">${countryCode}</p>
    </div>
</div>
<div class="">
    <h4 class="text-md font-bold">Neighbor:</h4>
    <p id="Neighbor" class="text-cyan-950" style="word-wrap: break-word;">${Neighbor}</p>
</div>
<div class="mt-10">
    <div class="flex">
        <h4 class="text-md font-bold">Population:</h4>
        <p id="population" class="font-bold text-cyan-950">${population}</p>
    </div>
</div>
</div>`;
            ListCard.push(Card)
            count++;
            if (count == 4) {
                let rowCard = "";
                ListCard.forEach(item => {
                    rowCard += item;
                })
                main.insertAdjacentHTML("afterend", `<div class="flex">${rowCard}</div>`);
                count = 0;
                ListCard = [];
            }
            
        });
        if (count>0){
            count=0;
            let rowCard = "";
            ListCard.forEach(item=>{
                rowCard += item;
            });
            main.insertAdjacentHTML("beforeend", `<div class="flex">${rowCard}</div>`);
        }

        return
    }

    async searchCountry(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }


}

const Countrys = new CountryAPI();


async function fetchCountry() {
    const data = await Countrys.getCountrys();
    Countrys.creatCard(data);

}

fetchCountry();
Search.addEventListener('input', async function (event) {
    let name_country = event.target.value;
    let url=`https://restcountries.com/v3.1/name/${name_country}`;
    const data = await Countrys.searchCountry(url);
    Countrys.creatCard(data);
});
btnSearch.addEventListener("click",async function(event){
    let name_country = Search.value;
    let url=`https://restcountries.com/v3.1/name/${name_country}?fullText=true`
    console.log(url);
    const data = await Countrys.searchCountry(url);
    console.log(data);
    Countrys.creatCard(data);
});