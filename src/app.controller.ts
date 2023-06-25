import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// This is the app controller, the function of the controller is to handle requests and return responses, it is the middleman between the client and the server.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
