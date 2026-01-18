import prisma from "../database/prismaClient.js";
import fs from 'fs'
import path from 'path'

export async function listFotos(req, res){
    try{
        const { albumId } = req.params
        const userId = req.userId

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 12

        const skip = ( page - 1) * limit
        
        const album = await prisma.album.findFirst({
            where: {
                id: Number(albumId),
                userId
            }
        })

        if (!album){
            return res.status(404).json({message: 'Álbum não encontrado.'})
        }

        const [fotos, total] = await Promise.all([
            prisma.foto.findMany({
                where: {
                    albumId: album.id
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.foto.count({
                where:{
                    albumId: album.id
                }
            })
        ])

        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: fotos
        })
        
    }catch(error){
        console.error(error)
        return res.status(500).json({message: 'Erro ao listar fotos.'})
    }
}

export async function uploadFotos(req, res){
    try{
        const { albumId } = req.params
        const userId = req.userId

        if (!req.files || req.files.length === 0 ){
            return res.status(400).json({ message: 'Nenhum arquivo enviado.' })
        }

        const album = await prisma.album.findFirst({
            where:{
                id: Number(albumId),
                userId
            }
        })

        if (!album){
            return res.status(404).json({ message: 'Álbum não encontrado.'})
        }

        const fotos = await Promise.all(
            req.files.map(file =>
                prisma.foto.create({
                    data: {
                        titulo: file.originalname,
                        descricao: '',
                        dataAquisicao: new Date(),
                        tamanho: file.size,
                        cor: null,
                        arquivo: file.filename,
                        mimeType: file.mimetype,
                        album: {
                            connect: {
                                id: album.id
                            }
                        }
                    }
                })
            )
        )

        return res.status(201).json(fotos)

    }catch(error){
        console.error(error)
        return res.status(500).json({message: 'Erro ao realizar upload de fotos.'})
    }
}

export async function deleteFoto(req, res){
    try{
        const { id } = req.params
        const userId = req.userId

        const foto = await prisma.foto.findFirst({
            where:{
                id: Number(id),
                album: {
                    userId: req.userId
                }
            }
        })

        if(!foto){
            return res.status(404).json({message: 'Foto não encontrada.'})
        }

        const filePath = path.resolve('uploads', foto.arquivo)

        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }

        await prisma.foto.delete({
            where:{
                id: foto.id
            }
        })

        return res.status(200).json({message: 'Foto deletada.'})
    }catch(error){
        console.error(error)
        return res.status(500).json({message: 'Erro ao deletar foto.'})
    }
}

export async function updateFoto(req, res){
    try{
        const { id } = req.params
        const userId = req.userId
        const { descricao, dataAquisicao, cor } = req.body

        if(!descricao && !dataAquisicao && !cor){
            return res.status(400).json({message: 'Informe ao menos um campo para atualizar.'})
        }

        const foto = await prisma.foto.findFirst({
            where: {
                id: Number(id),
                album: {
                    userId
                }
            }
        })

        if (!foto){
            return res.status(404).json({message: 'Foto não encontrada.'})
        }

        const updatedFoto = await prisma.foto.update({
            where:{
                id: foto.id
            },
            data: {
                descricao,
                dataAquisicao: dataAquisicao ? new Date(dataAquisicao) : undefined,
                cor
            }
        })

        return res.status(200).json(updatedFoto)
        
    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Erro ao atualizar foto.'})
    }
}