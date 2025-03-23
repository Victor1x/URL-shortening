const baseApiURL = "https://cleanuri.com/api/v1/shorten";

const form = document.querySelector(".form__input__btn__container");

const url__longa = document.getElementById("input__url");
url__longa.focus();

const span__alert = document.querySelector(".span__alert");

async function encurtarURL(urlLonga) {
  try {
    const accessToken = "feb234349a6eadb452acc92c76c8ffaa611701cd";
    // Substitua pelo seu Access Token
    const apiURL = "https://api-ssl.bitly.com/v4/shorten";

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: urlLonga,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao encurtar a URL: ${response.status}`);
    }

    const data = await response.json();

    criando__link__curto(data);
    console.log("URL encurtada:", data.link);
    console.log("URL original:", data.long_url);
  } catch (error) {
    console.error("Erro:", error);
  }
}

// encurtarURL(url__longa);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!url__longa.value) {
    url__longa.classList.add("alert");
    span__alert.classList.add("alert");
    span__alert.textContent = "Please add a link";
    return;
  }

  encurtarURL(url__longa.value);
});

const criando__link__curto = (data) => {
  // Cria o <li>
  const li = document.createElement("li");
  li.className = "url__item";

  // Cria o <p> com a URL antiga
  const pOld = document.createElement("p");
  pOld.className = "old__url";
  pOld.textContent = data.long_url;

  // Cria a div que contém a nova URL e o botão
  const div = document.createElement("div");
  div.className = "div__new_url__btn";

  // Cria o <p> com a nova URL
  const pNew = document.createElement("p");
  pNew.className = "new_url";
  pNew.textContent = data.link;

  // Cria o botão
  const btn = document.createElement("button");
  btn.className = "btn__copy btn";
  btn.textContent = "Copied!";

  // Agrupa os elementos
  div.append(pNew, btn);
  li.append(pOld, div);

  // Adiciona na lista (assumindo que você tenha um <ul> com id "lista-urls")
  document.querySelector(".url__list").appendChild(li);
};

document.querySelector("#input__url").addEventListener("input", () => {
  span__alert.classList.remove("alert");
});
