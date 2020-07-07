import { HttpClient } from './http-client';
import { Result, FallibleAsync } from 'fallible';
import { AxiosError } from 'axios';

export class WebService {
  private readonly client: HttpClient;

  constructor() {
    this.client = new HttpClient({ baseURL: "localhost:3000" });
  }

  @FallibleAsync
  public async fetchHtmlLength(): Promise<Result<number, AxiosError>> {
    const homePageResult = await this.client.get<string>('/');
    const html = homePageResult.extract();

    return Result.ok(html.length);
  }
}


(async function() {
  const service = new WebService();
  const googleHomeHtmlLength = (await service.fetchHtmlLength()).unwrap();
  console.log(googleHomeHtmlLength);
})().catch((err: AxiosError) =>console.error(err.toJSON()))