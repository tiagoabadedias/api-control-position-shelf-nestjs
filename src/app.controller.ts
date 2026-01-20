import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SequenciaDto } from './dto';
import { ResultadoExecucao, StatusResponse } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/executar')
  async executarSequencia(@Body() sequencia: SequenciaDto): Promise<ResultadoExecucao> {
    return this.appService.executarSequencia(sequencia);
  }

  @Get('/status')
  getStatus(): StatusResponse {
    return {
      estado_atual: this.appService.getEstadoAtual(),
      config: this.appService.getConfig(),
      arduino_conectado: false, // Sempre false já que removemos a comunicação serial
    };
  }
}