import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { StepDto, SequenciaDto } from './dto';
import { Config, EstadoAtual, ResultadoEtapa, ResultadoExecucao } from './interfaces';

@Injectable()
export class AppService {

  // ======================================
  // CONFIGURAÇÃO PERSONALIZÁVEL
  // ======================================
  private readonly CONFIG: Config = {
    andares: { 0: 0, 1: 100, 2: 496, 3: 838 },
    posicoes: { 0: 0, 1: 350, 2: 560, 3: 770, 4: 980, 5: 1190, 6: 1200 },
  };

  // ======================================
  // ESTADO ATUAL
  // ======================================
  private estadoAtual: EstadoAtual = { andar: 0, posicao: 0 };

  // ======================================
  // GERAR COMANDOS DOS MOTORES
  // ======================================
  private gerar(steps: number, codigo: number): string {
    return `${steps}X${codigo}`;
  }

  private calcularMovimento(andarDest: number, posDest: number): string {
    const andarAtual = this.estadoAtual.andar;
    const posAtual = this.estadoAtual.posicao;

    const xAtual = this.CONFIG.posicoes[posAtual];
    const xDest = this.CONFIG.posicoes[posDest];

    const yAtual = this.CONFIG.andares[andarAtual];
    const yDest = this.CONFIG.andares[andarDest];

    const dx = xDest - xAtual;
    const dy = yDest - yAtual;

    const comandos: string[] = [];

    if (dx > 0) {
      comandos.push(this.gerar(dx, 2));
    } else if (dx < 0) {
      comandos.push(this.gerar(Math.abs(dx), 1));
    }

    if (dy > 0) {
      comandos.push(this.gerar(dy, 4));
    } else if (dy < 0) {
      comandos.push(this.gerar(Math.abs(dy), 3));
    }

    if (comandos.length > 1) {
      return comandos.join('-');
    }

    return comandos.length > 0 ? comandos[0] : '';
  }

  // ======================================
  // ENDPOINT /executar
  // ======================================
  async executarSequencia(seq: SequenciaDto): Promise<ResultadoExecucao> {
    const resultados: ResultadoEtapa[] = [];

    for (let i = 0; i < seq.passos.length; i++) {
      const etapa = seq.passos[i];

      // Validar andar
      if (!(etapa.andar in this.CONFIG.andares)) {
        throw new HttpException(
          `Andar inválido na etapa ${i + 1}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validar posição
      if (!(etapa.posicao in this.CONFIG.posicoes)) {
        throw new HttpException(
          `Posição inválida na etapa ${i + 1}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const movimentoMotor = this.calcularMovimento(etapa.andar, etapa.posicao);

      const partes: string[] = [];

      if (movimentoMotor) {
        partes.push(movimentoMotor);
      }

      let acao: string | null = null;

      if (etapa.movimento) {
        const mov = etapa.movimento.toUpperCase();
        if (mov === 'P') {
          acao = 'PEGAR';
          partes.push('PEGAR');
        } else if (mov === 'L') {
          acao = 'LARGAR';
          partes.push('LARGAR');
        } else {
          throw new HttpException(
            `Movimento inválido na etapa ${i + 1}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Junta tudo numa linha só
      const comandoFinal = partes.join('/');

      // Log do comando gerado
      console.log(`[NestJS] Comando gerado → ${comandoFinal}`);

      // Atualiza estado
      this.estadoAtual.andar = etapa.andar;
      this.estadoAtual.posicao = etapa.posicao;

      resultados.push({
        etapa: i + 1,
        comando_enviado: comandoFinal,
      });
    }

    return {
      status: 'ok',
      execucao: resultados,
      estado_final: { ...this.estadoAtual },
    };
  }

  // ======================================
  // MÉTODOS AUXILIARES
  // ======================================
  getEstadoAtual(): EstadoAtual {
    return { ...this.estadoAtual };
  }

  getConfig(): Config {
    return { ...this.CONFIG };
  }
}