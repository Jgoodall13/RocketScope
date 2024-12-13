import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TelemetryService {
  constructor(private prisma: PrismaService) {}

  async createTelemetry(data: {
    altitude: number;
    velocity: number;
    fuelLevel: number;
    launchId: number;
  }) {
    // Check if the launchId exists
    const launch = await this.prisma.launch.findUnique({
      where: { id: data.launchId },
    });

    if (!launch) {
      throw new NotFoundException(`Launch with ID ${data.launchId} not found.`);
    }

    // Proceed to create telemetry
    return this.prisma.telemetryData.create({
      data,
    });
  }

  async getTelemetryByLaunch(launchId: number) {
    return this.prisma.telemetryData.findMany({
      where: { launchId },
    });
  }
}
