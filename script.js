document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchButton").addEventListener("click", fetchData);

    function fetchData() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "eaa671365bd34f4381aa7cf6a1e901f3");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://192.168.1.141:8290/shedexapi/v1/dobrogaapi/objects/aocs", requestOptions)

            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                displayData(data.aocs);
            })
            .catch((error) => console.error(error));
    }

    function displayData(aocs) {
        document.getElementById("dataDisplay").innerHTML = "";

        const aocsDiv = document.createElement("div");
        aocsDiv.classList.add("aocs")

        aocs.forEach(aoc => {
            const aocDiv = document.createElement("div");
            aocDiv.classList.add("aoc");

            const idPara = document.createElement("p");
            idPara.textContent = `id: ${aoc.id}`;
            idPara.classList.add("aocId");
            
            const namePara = document.createElement("p");
            namePara.textContent = `Название: ${aoc.name}`;
            namePara.classList.add("aocName");

            const addressPara = document.createElement("p");
            addressPara.textContent = `Адрес: ${aoc.address}`;
            addressPara.classList.add("aocAddress");

            aocDiv.appendChild(idPara);
            aocDiv.appendChild(namePara);
            aocDiv.appendChild(addressPara);

            aocsDiv.appendChild(aocDiv);
        });
        document.getElementById("dataDisplay").appendChild(aocsDiv);
    
    }
});