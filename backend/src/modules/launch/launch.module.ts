import { Module } from '@nestjs/common';
import { LaunchController } from './launch.controller';
import { LaunchService } from './launch.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule for PrismaService
  controllers: [LaunchController],
  providers: [LaunchService], // Add LaunchService here
  exports: [LaunchService], // Export LaunchService if needed elsewhere
})
export class LaunchModule {}
