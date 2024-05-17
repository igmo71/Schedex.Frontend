import { fetchAocWaybill, fetchAocs } from "./api.js";

function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

const setSelectorDateToToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    
    document.getElementById("date").setAttribute("max", today)
    document.getElementById("date").setAttribute("value", today)
    ;
    }

const aocsToSelector = async () => {
    const data = await fetchAocs();
    console.log(data);
    const selectElement = document.getElementById('aocsSelector');
    data.aocs.forEach(aoc => {
        const option = document.createElement('option');
        option.value = aoc.id;
        option.textContent = aoc.name;
        selectElement.appendChild(option);
    });
    selectElement.addEventListener('change', () => {
        const selectedWarehouseId = selectElement.value;
        console.log('Selected Warehouse ID:', selectedWarehouseId);
    });
};
      
aocsToSelector()
setSelectorDateToToday();


const form = document.querySelector('form');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const selectedAoc = document.getElementById('aocsSelector').value;
    const selectedDate = formatDate(document.getElementById('date').value);
    console.log(selectedAoc,selectedDate);

    const waybills = await fetchAocWaybill(selectedAoc,selectedDate);

    const waybillElement = document.querySelector('#waybills');
    waybillElement.innerHTML = "";

    if (waybills.length === 0){
        const waybillPEl = document.createElement('p');
        waybillPEl.innerText = "На это день маршрутов нет";
        waybillElement.append(waybillPEl);
    }
    waybills.forEach((waybill) => {
        const waybillDiv = document.createElement('div');
        const waybillPEl = document.createElement('p');
        waybillPEl.append(waybill.document);
        waybillDiv.append(waybillPEl);
        waybillElement.append(waybillDiv);

        const waybillLocationsDiv = document.createElement('div');
        waybillLocationsDiv.classList.add('waybill-locations')
        waybillLocationsDiv.style.display = 'none';

        waybill.location.forEach((stop) => {
            const locationPEl = document.createElement('p');
            locationPEl.textContent = stop.address;
            waybillLocationsDiv.append(locationPEl);
            waybillElement.append(waybillLocationsDiv);
        });
        waybillDiv.addEventListener('click', function() {
            if (waybillLocationsDiv.style.display === 'none'){
                waybillLocationsDiv.style.display = 'block';}
            else{
                waybillLocationsDiv.style.display = 'none';
            }
        });
        
    });
});
