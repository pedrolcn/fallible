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

  /**
   * Extracts the value from a result if it is Ok, otherwise makes function return early with Err value.
   * This method is meant to be called only from within a Fallible or FallibleAsync function.
   */
  public extract(): T {
    if (this._isOk)  {
      return this.value!;
    }

    throw {
      __isPropagatedError: true,
      internalErr: this.error
    };
  }
}
