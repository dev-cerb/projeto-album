import prisma from "../database/prismaClient.js";

export async function listAlbums(req, res) {
  try {
    const userId = req.userId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [albums, total] = await Promise.all([
      prisma.album.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          fotos: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
            select: {
              arquivo: true,
            },
          },
        },
      }),
      prisma.album.count({
        where: { userId },
      }),
    ]);

    const formattedAlbums = albums.map((album) => ({
      id: album.id,
      titulo: album.titulo,
      descricao: album.descricao,
      coverImage: album.fotos[0]?.arquivo || null,
    }));

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: formattedAlbums,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar albúns." });
  }
}

export async function createAlbum(req, res) {
  try {
    const { titulo, descricao } = req.body;
    const userId = req.userId;

    if (!titulo) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    const album = await prisma.album.create({
      data: {
        titulo,
        descricao,
        userId,
      },
    });

    return res.status(201).json(album);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar álbum." });
  }
}

export async function updateAlbum(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const userId = req.userId;

    if (!titulo && !descricao) {
      return res
        .status(400)
        .json({ message: "Informe ao menos um campo para atualizar." });
    }

    const album = await prisma.album.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!album) {
      return res.status(404).json({ message: "Albúm não encontrado." });
    }

    const updatedAlbum = await prisma.album.update({
      where: { id: album.id },
      data: {
        titulo,
        descricao,
      },
    });

    return res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar álbum." });
  }
}

export async function deleteAlbum(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const album = await prisma.album.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!album) {
      return res.status(404).json({ message: "Albúm não encontrado." });
    }

    const fotosCount = await prisma.foto.count({
      where: {
        albumId: album.id,
      },
    });

    if (fotosCount > 0) {
      return res.status(400).json({
        message: "O álbum não pode ser excluído, pois ainda possui fotos.",
      });
    }

    await prisma.album.delete({
      where: {
        id: album.id,
      },
    });

    return res.status(200).json({ message: "Álbum deletado." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir álbum." });
  }
}
