fetch("/api")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const countElement = document.getElementById("count");
    countElement.innerText = "Güncel Borç: " + data.count.split("\n")[0];
  })
  .catch((error) => console.error("Error:", error));


  let log_history = document.getElementById("logs");
  let increment_screen = document.getElementById("plus_reason");
  log_history.style.visibility  = "hidden";
  increment_screen.style.visibility = "hidden";

  let current_date = new Date();
  let main_date = current_date.getFullYear() + "-" + Number(Number(current_date.getMonth()) + 1) + "-" + current_date.getDate() ;
  let main_reason = "mırıl mırıl";
  let current_date_elements = main_date.split('-');
      let updated_day = current_date_elements[2];
      let updated_month = current_date_elements[1];
      let updated_year = current_date_elements[0];
      if(updated_month < 10){updated_month = '0' + updated_month.toString()}
      if(updated_day < 10){updated_day = '0' + updated_day.toString()}
  let final_main_date = updated_year + "-" + updated_month + "-" + updated_day


  const increment_button = document.getElementById("increment");
  const reasonInput = document.getElementById("reason");
  const dateInput = document.getElementById("date");

  function increment(){increment_screen.style.visibility = "visible";}
  function close_plus_screen(){increment_screen.style.visibility = "hidden";}

  function positive_submit(){

    let reason_to_send = reasonInput.value;
    let date_to_send = dateInput.value;
    if(reason_to_send === "" || reason_to_send === " "){reason_to_send = main_reason;}
    if(date_to_send === ""){date_to_send = final_main_date;}

    fetch('/api/submit', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          reason: reason_to_send,
          date: date_to_send
        })
      })

      .then(response => response.json()) 
      .then(data => {
        console.log(data)
        const countElement = document.getElementById("count");
        countElement.innerText = "Güncel Borç: " + data.count.split("\n")[0];
      })
      .catch(error => console.error('Error:', error));

      close_plus_screen();
  }


  function donate(){
    fetch('/api/submit', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        reason: main_reason,
        date: final_main_date
      })
    })
    .then(response => response.json()) 
    .then(data => {
      console.log(data)
      const countElement = document.getElementById("count");
      countElement.innerText = "Güncel Borç: " + data.count.split("\n")[0];
    })
    .catch(error => console.error('Error:', error));
  }


function show_logs(){
  log_history.style.visibility  = "visible";
  let actual_logs = document.getElementById("actual_list");
  actual_logs.innerHTML = "";

  fetch("/api")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let old_data = data.count.split("\n").slice(1);
    old_data = "" + old_data;
    old_data = old_data.split(",");
    //old_data = old_data.toString().split(",");
    for (let i=0; i<old_data.length; i = i + 2){
      let current_date = old_data[i+1].toString().replace('}', '').replace('date', '').replaceAll('"', '').replace(':', '');
      let date_elements = current_date.split('-');
      let day = date_elements[2];
      let month = date_elements[1];
      let year = date_elements[0];
      let updated_date = "Tarih: " + day + '/' + month + '/' + year;
      let current_reason = old_data[i].toString().replace('{', '').replace("reason", "Sebep ").replaceAll('"', '').replace(' ', '');
      let blank_space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'
      let kiss_number = (i/2 + 1).toString();
      if ((i/2 + 1) < 10){kiss_number = "0" + (i/2 + 1).toString();}

      actual_logs.innerHTML = actual_logs.innerHTML + kiss_number + " ==> " + updated_date + blank_space + current_reason +"<br>" ;}
  })
  .catch((error) => console.error("Error:", error));
}

function close_log_screen(){
  log_history.style.visibility = "hidden";  
}


