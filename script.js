
let btn = document.getElementById("btn");
let home = document.getElementById("home");
let main = document.getElementById("main");
let ip = document.getElementById("ip");
let lat = document.getElementById("lat");
let long = document.getElementById("long");
let city = document.getElementById("city");
let reg = document.getElementById("reg");
let org = document.getElementById("org");
let map = document.getElementById("map");
let time = document.getElementById("time");
let date = document.getElementById("date");
let pin = document.getElementById("pin");
let msg = document.getElementById("msg");
let search = document.getElementById("search");
let postOffices = document.getElementById("postOffices");
let currPin;
var IP;
let resArr;
let postoffices;
let postOfficeArr = [];

$.getJSON("https://api.ipify.org?format=json", function (data) {
    IP = data.ip;

    // Setting text of element P with id gfg
    // console.log(data.ip);
    $("#address").html(data.ip);


});

// let IP = localStorage.getItem("IP");
// IP = IP.slice(1,IP.length-1);
// console.log(IP);

async function getData() {
    // "ipinfo.io/223.186.38.202?token=a38a44d8d2ed28"
    home.style.display = "none";
    main.style.display = "block";
    const response = await fetch(`https://ipinfo.io/${IP}?token=a38a44d8d2ed28`);
    const data = await response.json();
    console.log(data);
    let arr = data.loc.split(",");
    let LAT = arr[0];
    let LONG = arr[1];
    ip.innerHTML = `My IP Address : ${IP}`;
    lat.innerHTML = `<strong>Lat :</strong> ${LAT}`;
    long.innerHTML = `<strong>Long :</strong> ${LONG}`;
    city.innerHTML = `<strong>City :</strong> ${data.city}`;
    reg.innerHTML = `<strong>Region :</strong> ${data.region}`;
    org.innerHTML = `<strong>Organisation :</strong> ${data.asn.name}`;
    map.innerHTML = `<br/><br/><iframe src="https://maps.google.com/maps?q=${LAT}, ${LONG}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
    time.innerHTML = `<strong>Time Zone :</strong> ${data.timezone}`;
    let curr_datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
    date.innerHTML = `<strong>Date And Time :</strong> ${curr_datetime_str}`;
    pin.innerHTML = `<strong>Pincode :</strong> ${data.postal}`;
    currPin = data.postal;

    async function pincodes() {
        const response = await fetch(`https://api.postalpincode.in/pincode/${currPin}`);
        resArr = await response.json();
        resArr.forEach((item) => {
            postoffices = item.PostOffice;
            postOffices.innerHTML = "";
            postoffices.forEach((office) => {
                let item = document.createElement("div");
                item.setAttribute('class', "Offices");
                let name = document.createElement("p");
                name.innerHTML = `<strong>Name : </strong>${office.Name}`;
                let branchType = document.createElement("p");
                branchType.innerHTML = `<strong>Branch Type : </strong>${office.BranchType}`;
                let deliveryStatus = document.createElement("p");
                deliveryStatus.innerHTML = `<strong>Delivery Status : </strong>${office.DeliveryStatus}`;
                let district = document.createElement("p");
                district.innerHTML = `<strong>District : </strong>${office.District}`;
                let division = document.createElement("p");
                division.innerHTML = `<strong>Division : </strong>${office.Division}`;
                item.appendChild(name);
                item.appendChild(branchType);
                item.appendChild(deliveryStatus);
                item.appendChild(district);
                item.appendChild(division);
                postOffices.appendChild(item);
            });

        });
        console.log(resArr[0].PostOffice[0]);

    }
    pincodes();
}



btn.addEventListener('click', getData);

search.addEventListener('input', () => {
    let searchVal = search.value.toLowerCase();
    console.log(postoffices);
    let Arr = postoffices.filter((data) => {
        console.log(data.Name.toLowerCase()+"  "+data.BranchType);
        return data.Name.toLowerCase().includes(searchVal) || data.BranchType.toLowerCase().includes(searchVal);
    });
    renderDiv(Arr);
    // console.log(Arr);

});


function renderDiv(myArr) {
    postOffices.innerHTML = "";
    myArr.forEach((office) => {
        let item = document.createElement("div");
        item.setAttribute('class', "Offices");
        let name = document.createElement("p");
        name.innerHTML = `<strong>Name : </strong>${office.Name}`;
        let branchType = document.createElement("p");
        branchType.innerHTML = `<strong>Branch Type : </strong>${office.BranchType}`;
        let deliveryStatus = document.createElement("p");
        deliveryStatus.innerHTML = `<strong>Delivery Status : </strong>${office.DeliveryStatus}`;
        let district = document.createElement("p");
        district.innerHTML = `<strong>District : </strong>${office.District}`;
        let division = document.createElement("p");
        division.innerHTML = `<strong>Division : </strong>${office.Division}`;
        item.appendChild(name);
        item.appendChild(branchType);
        item.appendChild(deliveryStatus);
        item.appendChild(district);
        item.appendChild(division);
        postOffices.appendChild(item);
    });

}

/*
Block
: 
"Bangalore North"
BranchType
: 
"Sub Post Office"
Circle
: 
"Karnataka"
Country
: 
"India"
DeliveryStatus
: 
"Delivery"
Description
: 
null
District
: 
"Bangalore"
Division
: 
"Bangalore West"
Name
: 
"Bangalore City"
Pincode
: 
"560002"
Region
: 
"Bangalore HQ"
State
: 
"Karnataka" */