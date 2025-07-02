// Base worker message interface
export interface BaseWorkerMessage {
  type: string;
  id?: string;
}

// Worker manager types

export interface WorkerManager<TMessage = unknown, TResponse = unknown> {
  postMessage: (message: TMessage) => void;
  addEventListener: (type: 'message', listener: (event: MessageEvent<TResponse>) => void) => void;
  removeEventListener: (
    type: 'message',
    listener: (event: MessageEvent<TResponse>) => void,
  ) => void;
  terminate: () => void;
  isAvailable: boolean;
}

// Worker factory function type
export type WorkerFactory = () => Worker | null;
