import type { WorkerFactory, WorkerManager } from './types';

/**
 * Creates a worker factory function for a given worker URL
 */
export function createWorkerFactory(workerUrl: string): WorkerFactory {
  return () => {
    try {
      return new Worker(new URL(workerUrl, import.meta.url), { type: 'module' });
    } catch (error) {
      console.error('Failed to create worker:', error);
      return null;
    }
  };
}

/**
 * Creates a worker manager that provides a consistent interface for managing Web Workers
 */
export function createWorkerManager<TMessage, TResponse>(
  workerFactory: WorkerFactory,
): WorkerManager<TMessage, TResponse> {
  let worker: Worker | null = null;

  // Initialize the worker
  const initializeWorker = (): void => {
    if (typeof window !== 'undefined' && window.Worker) {
      worker = workerFactory();
    }
  };

  // Initialize on creation
  initializeWorker();

  return {
    postMessage: (message: TMessage): void => {
      if (!worker) {
        console.warn('Worker not available, message not sent:', message);
        return;
      }
      worker.postMessage(message);
    },

    addEventListener: (
      type: 'message',
      listener: (event: MessageEvent<TResponse>) => void,
    ): void => {
      if (!worker) {
        console.warn('Worker not available, event listener not added');
        return;
      }
      worker.addEventListener(type, listener);
    },

    removeEventListener: (
      type: 'message',
      listener: (event: MessageEvent<TResponse>) => void,
    ): void => {
      if (!worker) return;
      worker.removeEventListener(type, listener);
    },

    terminate: (): void => {
      if (worker) {
        worker.terminate();
        worker = null;
      }
    },

    get isAvailable(): boolean {
      return worker !== null;
    },
  };
}

/**
 * Creates a worker manager directly from a worker URL
 */
export function createWorkerManagerFromUrl<TMessage, TResponse>(
  workerUrl: string,
): WorkerManager<TMessage, TResponse> {
  const factory = createWorkerFactory(workerUrl);
  return createWorkerManager<TMessage, TResponse>(factory);
}
