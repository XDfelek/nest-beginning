import { Module } from '@nestjs/common';

import { PrismaProviderService } from './services/prisma-provider/prisma-provider.service';

@Module({
  exports: [PrismaProviderService],
  providers: [PrismaProviderService],
})
export class PrismaModule {}
