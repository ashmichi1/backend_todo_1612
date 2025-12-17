// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        // ¡IMPORTANTE! NO pases { adapter: ... } aquí.
        // Solo configuración de logs si quieres.
        super({
            log: ['info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Conectado a DB');
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}