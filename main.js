(() => {
  "use strict";
  let t = async function (t) {
      return (
        await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${t}&appid=13bc0708dbf016035c6f343a866e5a6d`
        )
      ).json();
    },
    e = (function () {
      let t;
      return (
        localStorage.cities
          ? (t = JSON.parse(localStorage.cities))
          : ((localStorage.cities = "[]"), (t = [])),
        {
          updateData: function (e) {
            t.push(e), (localStorage.cities = JSON.stringify(t));
          },
          checkForDups: function (e) {
            for (let n = 0; n < t.length; n++) if (e == t[n]) return !0;
            return !1;
          },
          rmvCity: function (e) {
            e = e.toLowerCase();
            for (let n = 0; n < t.length; n++) e == t[n] && t.splice(n, 1);
            localStorage.cities = JSON.stringify(t);
          },
          data: t,
        }
      );
    })(),
    n = (function () {
      let t = document.querySelector("body"),
        n = function (t) {
          let e = t.querySelector(".tempDiv"),
            n = e.textContent.split(" "),
            a = parseFloat(n[0]).toFixed(2),
            i = n[1];
          "Celsius" == i
            ? ((a = 1.8 * a + 32), (i = "Fahrenheit"))
            : ((a = (a - 32) / 1.8), (i = "Celsius")),
            (e.textContent = `${parseFloat(a).toFixed(2)} ${i}`);
        };
      return {
        displayData: function (a) {
          let i = document.createElement("div");
          i.classList.add("displayDiv");
          let o = document.createElement("div");
          o.classList.add("nameDiv"), (o.textContent = `${a.name}`);
          let r = document.createElement("div");
          r.classList.add("tempDiv"),
            (r.textContent = `${parseFloat(a.main.temp - 273.15).toFixed(
              2
            )} Celsius`);
          let c = document.createElement("div");
          c.classList.add("forecastDiv"), (c.textContent = a.weather[0].main);
          let d = document.createElement("img");
          d.classList.add("forecastIcon"),
            (d.src = `http://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png`),
            c.appendChild(d);
          let l = document.createElement("button");
          l.classList.add("convertBtn"),
            (l.textContent = "CONVERT"),
            l.addEventListener("click", function () {
              n(i);
            });
          let s = document.createElement("button");
          s.classList.add("rmvBtn"),
            (s.textContent = "X"),
            s.addEventListener("click", function () {
              i.parentNode.removeChild(i), e.rmvCity(a.name);
            }),
            i.appendChild(o),
            i.appendChild(c),
            i.appendChild(r),
            i.appendChild(l),
            i.appendChild(s),
            t.appendChild(i),
            "US" == a.sys.country && n(i);
        },
        displayError: function (t) {
          throw (
            ((document.querySelector("#errorDiv").textContent =
              'Location not found. Search must be in the form of "City", "City, State" or "City, Country".'),
            new Error(t))
          );
        },
      };
    })(),
    a = document.querySelector("#searchBar");
  document.addEventListener("keydown", function (i) {
    if ("Enter" == i.key && document.activeElement == a) {
      if (e.checkForDups(a.value)) return !1;
      t(`${a.value}`)
        .then(function (t) {
          n.displayData(t), e.updateData(`${a.value}`);
        })
        .catch(function (t) {
          throw (n.displayError(t), new Error(t));
        });
    }
  });
  for (let a = 0; a < e.data.length; a++)
    t(`${e.data[a]}`).then(function (t) {
      n.displayData(t);
    });
})();
