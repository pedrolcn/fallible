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

  /**
   * Returns true if the Result variant is Ok
   */
  public get isOk(): boolean {
    return this._isOk;
  }

  /**
   * Returns true if the Result variant is Err
   */
  public get isErr(): boolean {
    return !this._isOk;
  }

  /**
   * Wraps a value in a result as the Ok variant.
   * @param value The value to be Ok wrapped.
   */
  public static ok<T>(value: T): Result<T, any> {
    return new Result<T, any>(ResultVariant.Ok, value)
  }

  /**
   * Wraps a value in a result as the Err variant.
   * @param value The value to be Err wrapped.
   */
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


  /**
   * Extracts the value from a result if it is Ok or throws if it is Err.
   */
  public unwrap(): T {
    if (this._isOk)  {
      return this.value!;
    }

    throw this.error
  }
}
