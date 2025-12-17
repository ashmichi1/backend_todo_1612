import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        console.log('DATABASE_URL:', process.env.DATABASE_URL);
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
        super({ adapter , log: ['info', 'warn', 'error'] });
    }


    async onModuleInit() {
        try{
            await this.$connect();
            await this.$queryRaw`SELECT 1`;
            console.log('Conexion establecida a mariadb');
        }catch(error){
            console.error('Error al conectar a mariadb:', error);
            throw error;
        }
    }


    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Desconectado de mariadb');
    }

    


}
