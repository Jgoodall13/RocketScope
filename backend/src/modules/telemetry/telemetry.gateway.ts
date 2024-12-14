import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true,
  },
})
export class TelemetryGateway {
  @WebSocketServer()
  server: Server;

  sendTelemetryUpdate(telemetryData: any) {
    console.log('Gateway: Sending telemetry update:', telemetryData);
    this.server.emit('telemetry-update', telemetryData);
  }

  sendLaunchUpdate(launchData: any) {
    console.log('Gateway: Sending launch update:', launchData);
    this.server.emit('launch-update', launchData);
  }
}
