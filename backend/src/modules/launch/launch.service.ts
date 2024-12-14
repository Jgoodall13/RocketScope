import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelemetryGateway } from 'src/modules/telemetry/telemetry.gateway';

@Injectable()
export class LaunchService {
  constructor(
    private prisma: PrismaService,
    private gateway: TelemetryGateway,
  ) {}

  async createLaunch(data: { name: string; startTime: Date; status: string }) {
    return this.prisma.launch.create({ data });
  }

  async getAllLaunches() {
    return this.prisma.launch.findMany();
  }

  async getLaunchById(id: number) {
    if (!id) {
      throw new NotFoundException(`Launch ID must be provided.`);
    }
    const launch = await this.prisma.launch.findUnique({ where: { id } });
    if (!launch) {
      throw new NotFoundException(`Launch with ID ${id} not found.`);
    }
    return launch;
  }

  async updateLaunch(
    id: number,
    data: { status?: string; abortReason?: string },
  ) {
    const launch = await this.prisma.launch.update({
      where: { id },
      data,
    });
    this.gateway.sendLaunchUpdate(launch); // Emit event
    return launch;
  }

  async updateLaunchStatus(id: number, status: string, abortReason?: string) {
    if (!id) {
      throw new NotFoundException(`Launch ID must be provided.`);
    }
    const launch = await this.prisma.launch.findUnique({ where: { id } });

    if (!launch) {
      throw new NotFoundException(`Launch with ID ${id} not found.`);
    }

    const updatedLaunch = await this.prisma.launch.update({
      where: { id },
      data: {
        status,
        abortReason: abortReason || null,
      },
    });
    this.gateway.sendLaunchUpdate(updatedLaunch); // Emit event
    return updatedLaunch;
  }

  async getAbortedLaunches() {
    return this.prisma.launch.findMany({
      where: {
        status: 'Aborted',
      },
      select: {
        id: true,
        name: true,
        startTime: true,
        abortReason: true,
      },
    });
  }
}
