import { Result } from './Result';

export type FallibleFn = (...args: any[]) => Result<any, any>;
export type AsyncFallibleFn = (...args: any[]) => Promise<Result<any, any>>;

export function Fallible(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<FallibleFn>) {
  const originalMethod = descriptor.value!;

  descriptor.value = function(this, ...args: any[]): Result<any, any> {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      return Result.err(error);
    }
  };

  return descriptor;
}

export function FallibleAsync(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<AsyncFallibleFn>) {
  const originalMethod = descriptor.value!;

  descriptor.value = async function(this, ...args: any[]): Promise<Result<any, any>> {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      return Result.err(error);
    }
  };

  return descriptor;
}