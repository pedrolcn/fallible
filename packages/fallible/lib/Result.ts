enum ResultVariant {
  Ok,
  Err
}


export class Result<T, E> {
  private _isOk: boolean;

  private value: T | undefined;

  private error: E | undefined;

  private constructor(variant: ResultVariant.Ok, value: T)
  private constructor(variant: ResultVariant.Err, value: E)
  private constructor(variant: ResultVariant, value: T | E) {
    if (variant === ResultVariant.Ok) {
      this._isOk = true;
      this.value = value as T;
    } else {
      this._isOk = false;
      this.error = value as E;
    }
  }

  public get isOk(): boolean {
    return this._isOk;
  }

  public get isErr(): boolean {
    return !this._isOk;
  }

  public static ok<T>(value: T): Result<T, any> {
    return new Result<T, any>(ResultVariant.Ok, value)
  }

  public static err<E>(value: E): Result<any, E> {
    return new Result<any, E>(ResultVariant.Err, value);
  }

  public propagate(): T {
    if (this._isOk)  {
      return this.value!;
    }

    throw this.error
  }
}
