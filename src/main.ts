import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProductController } from './infrastructure/controllers/product.controller';
import { PrismaProductRepository } from './infrastructure/prisma/product.repository.impl';
import { ProductService } from './application/services/product.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: 'ProductRepository', useClass: PrismaProductRepository },
    { provide: PrismaProductRepository, useExisting: 'ProductRepository' },
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('Server running on http://localhost:3000/api');
}
bootstrap();
