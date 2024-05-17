const fetchAocWaybill = (aocId, date) => {
    console.log(aocId, date, "waybill")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "1efd7d65c32140b8a81e14ebb51f9526");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    return fetch(`http://192.168.1.141:8290/shedexapi/v1/dobrogaapi/objects/aocs/putevoy_list/${aocId}/${date}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((error) => console.error(error));
    }
const  fetchAocs = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "1efd7d65c32140b8a81e14ebb51f9526");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        return fetch("http://192.168.1.141:8290/shedexapi/v1/dobrogaapi/objects/aocs", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }

export {fetchAocWaybill, fetchAocs}