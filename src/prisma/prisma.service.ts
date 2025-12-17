import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    // Usamos el Logger de NestJS para que los logs se vean bonitos en la consola de Render
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            // No necesitamos pasar 'adapter' para la conexión estándar a Postgres
            log: ['info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            // Verificación de conexión (SELECT 1 es válido en Postgres)
            await this.$queryRaw`SELECT 1`;
            this.logger.log('🚀 Conexión establecida exitosamente a PostgreSQL');
        } catch (error) {
            this.logger.error('❌ Error al conectar a PostgreSQL:', error);
            // Es mejor no relanzar el error si quieres que la app intente reconectar,
            // pero si es crítico para el arranque, está bien el throw.
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Desconectado de PostgreSQL');
    }
}