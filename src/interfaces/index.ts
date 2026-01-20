export interface Config {
  andares: Record<number, number>;
  posicoes: Record<number, number>;
}

export interface EstadoAtual {
  andar: number;
  posicao: number;
}

export interface ResultadoEtapa {
  etapa: number;
  comando_enviado: string;
}

export interface ResultadoExecucao {
  status: string;
  execucao: ResultadoEtapa[];
  estado_final: EstadoAtual;
}

export interface StatusResponse {
  estado_atual: EstadoAtual;
  config: Config;
  arduino_conectado: boolean;
}

export interface ReconectarResponse {
  sucesso: boolean;
  message: string;
}