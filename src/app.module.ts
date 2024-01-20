import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controller/controller.module';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
