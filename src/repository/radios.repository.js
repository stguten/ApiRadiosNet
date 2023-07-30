import prisma from "../config/prisma.config.js";

async function pegarRadioComFitroRepository(parametros) {
  console.log(parametros);
  const { nome, cidade, estado, pais } = parametros;
  try {
    const radios = await prisma.radio.findMany({
      select: {
        nome: true,
        cidade: true,
        estado: true,
        regiao: true,
        pais: true,
        url: true,
        segmentos: true,
      },
      where: {
        nome: nome
          ? {
              contains: nome,
            }
          : undefined,
        cidade: cidade
          ? {
              contains: cidade,
            }
          : undefined,
        estado: estado
          ? {
              contains: estado,
            }
          : undefined,
        pais: pais
          ? {
              contains: pais,
            }
          : undefined,
      },
    });

    return radios;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function todasAsRadiosRepository() {
  try {
    const radios = await prisma.radio.findMany({
      select: {
        nome: true,
        url: true,
        cidade: true,
        estado: true,
        regiao: true,
        pais: true,
        segmentos: true,
      },
    });

    return radios;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function inserirRadioRepository(dados) {
  const { radio, segmentos, cidade, estado, regiao, pais, url, status } = dados;
  try {
    const existingRadio = await prisma.radio.findFirst({
      where: { url: url },
    });

    if (!existingRadio) {
      await prisma.radio.create({
        data: {
          nome: radio,
          cidade: cidade,
          estado: estado,
          regiao: regiao,
          pais: pais,
          url: url,
          segmentos: segmentos.toString(),
          status: status,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

async function criarStatus(id, descricao) {
  try {
    const existingStatus = await prisma.status.findUnique({
      where: { id: id },
    });

    if (!existingStatus) {
      await prisma.status.create({
        data: {
          id: id,
          descricao: descricao,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export { pegarRadioComFitroRepository, todasAsRadiosRepository, inserirRadioRepository, criarStatus };
