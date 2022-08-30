const tableBody = document.getElementById("tableBody");
const float = document.querySelector(".float");
const body = document.querySelector("body");
const icon = document.querySelector(".las");
const button = document.querySelector(".btn-info");
const moreInfo = document.getElementById("more-info");

function realDate(unixTimestamp) {
  //   const milliseconds = unixTimestamp ;

  const dateObject =
    (new Date().getTime() - unixTimestamp) / (1000 * 60 * 60 * 24 * 365);

  return dateObject.toFixed().toLocaleString();
}

function afterFetchCall() {
  const tableButton = document.querySelectorAll("#tableButton");

  tableButton.forEach((table) => {
    table.addEventListener("click", takeToMore);
  });
}

const billionaires = [];

function renderFinancialAsset(arrValues) {
  const res = arrValues.map((item) => {
    return `<div class="financial-asset"><p>Company name: ${item.companyName}</p> <p>Number of shares: ${item.numberOfShares}</p> <p> Share price: ${item.sharePrice}</p></div>`;
  });

  return res.join('')
}

function takeToMore(e) {
  const uri = e.target.dataset.uri;
  const item = billionaires.find((item) => item.uri == uri);

  // console.log(item.personName)
  float.querySelector("#nameValue").innerHTML = item.personName;
  float.querySelector("#genderValue").innerHTML = item.gender;
  float.querySelector("#stateValue").innerHTML = item.state;
  float.querySelector("#cityValue").innerHTML = item.city;
  float.querySelector("#sourceValue").innerHTML = item.source;
  float.querySelector("#aboutValue").innerHTML = item.abouts;
  float.querySelector("#imageValue").src = item.person.squareImage;
  float.querySelector("#assetsValue").innerHTML = renderFinancialAsset(
    item.financialAssets
  );
  float.classList.toggle("hide");
}

fetch("https://forbes400.herokuapp.com/api/forbes400?limit=10")
  .then((res) => res.json())
  .then((data) => {
    const render = data
      .map((item) => {
        billionaires.push(item);
        return `<tr>
          <td><div class="d-flex"><strong><img class="images" src="${
            item.person.squareImage
          }" alt="">${item.personName}</strong></div></td>
          <td><strong>${item.finalWorth}</strong></td>
          <td>${realDate(item.birthDate)}</td>
          <td>${item.countryOfCitizenship}</td>
          <td>${item.industries}</td>
          <td><button id="tableButton" data-uri='${
            item.uri
          }' class="btn-info">More Info...</button></td>
        </tr>`;
      })
      .join("");

    tableBody.innerHTML = render;
    afterFetchCall();
  });

// fetch("https://forbes400.herokuapp.com/api/forbes400?limit=10").then((res) => {
//   return res.json().then((data) => {

//     const renderSingle = data.map((item)=> `
//     <div class="float hide">
//       <div class="cont">
//         <div class="para">
//             <div class="extra-info"><p>${item.gender}:</p></div>
//             <div class="value"> Male </div>
//         </div>
//         <div class="para">
//             <div class="extra-info"><p>${item.state}:</p></div>
//             <div class="value"> Texas </div>
//         </div>
//         <div class="para">
//             <div class="extra-info"><p>${item.city}:</p></div>
//             <div class="value"> Austin </div>
//         </div>
//         <div class="para">
//             <div class="extra-info"><p>${item.source}:</p></div>
//             <div class="value"> Tesla, spaceX </div>
//         </div>
//         <div class="para">
//             <div class="extra-info"><p>${item.financialAssests}:</p></div>
//             <div class="value"> <p>Company name: Tesla</p> <p>Number of shares: 2000</p> <p>price: 776.58</p> <br>
//                 <p>Company name: Twitter Inc.</p> <p>Number of shares: 73115000</p> <p>price: 39.34</p> </div>
//         </div>
//         <div class="para">
//             <div class="extra-info"><p>${item.about}:</p></div>
//             <div class="value"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto quia eligendi nam provident fuga, deleniti maxime accusamus, itaque reiciendis quisquam pariatur dolorum facilis vitae repellat ipsam nobis modi, voluptate quaerat?
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis accusamus deleniti tempora ipsam, quidem inventore praesentium illum suscipit, pariatur at, architecto est. Tempore accusamus nostrum excepturi facere distinctio maxime. Praesentium? </div>
//         </div>
//       </div>`
//     ) .join();
//     moreInfo.innerHTML = renderSingle;
// });
//   });

icon.addEventListener("click", () => {
  float.classList.toggle("hide");
});

function clickTable(event) {
  // float.classList.toggle('hide')
}

// function clickName()
// {
//   console.log('i am clicking name')
// }
