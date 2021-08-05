let getWeather = async function (city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13bc0708dbf016035c6f343a866e5a6d`
  );

  let data = response.json(); //extracts JSON body (what we want)

  return data;
};

// async function findActivity(location, activity){

// }

export { getWeather };
