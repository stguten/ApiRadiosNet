import parsing from "../config/cheerio.config.js";

async function radioBuilder(data, id, status) {
  const $ = parsing(data);
  const radioInfo = {
    status: status,
    nome: $("#player-infos > div.info > h1").text(),
    segmentos: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(9)").text().replace(/(\t|\n|Segmentos:| )/gm, "").trim().split(","),
    regiao: "",
    cidade: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(10)").text().replace(/(Cidade:)/, "").trim(),
    estado: "",
    pais: "",
    url: `https://www.radios.com.br/play/playlist/${id}/listen-radio.m3u`,
  };

  if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().includes("Região:")) {
    Object.assign(radioInfo, {
        regiao: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().replace(/(Região:)/, "").trim(),
    });
  } else if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().includes("Estado:")) {
    Object.assign(radioInfo, {
      estado: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().replace(/(Estado:)/, "").trim(),
    });
  } else if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().includes("País:")) {
    Object.assign(radioInfo, {
      pais: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(11)").text().replace(/(País:)/, "").trim(),
    });
  }

  if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(12)").text().includes("Estado:")) {
    Object.assign(radioInfo, {
      estado: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(12)").text().replace(/(Estado:)/, "").trim(),
    });
  } else if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(12)").text().includes("País:")) {
    Object.assign(radioInfo, {
      pais: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(12)").text().replace(/(País:)/, "").trim(),
    });
  }

  if ($("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(13)").text().includes("País:")) {
    Object.assign(radioInfo, {
      pais: $("#content > div.panel-body > div > div:nth-child(1) > p:nth-child(13)").text().replace(/(País:)/, "").trim(),
    });
  }
  return radioInfo;
}

export default radioBuilder;
