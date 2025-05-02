import { Page, Request, Route } from '@playwright/test';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type HandlerParams = {
  req: Request;
  route: Route;
};

type Handler = (params: HandlerParams) => Promise<void>;

type RouteEntry = {
  method: Method;
  handler: Handler;
};

export class PlaywrightRouter {
  private routes: RouteEntry[] = [];

  constructor(
    private page: Page,
    private path: string
  ) {}

  addRoute(method: Method, handler: Handler) {
    this.routes.push({ method, handler });
    return this;
  }

  async build() {
    await this.page.route(
      this.path,
      async (route: Route) => {
        const request = route.request();
        const method = request.method();

        for (const r of this.routes) {
          if (r.method === method) {
            console.log({
              method,
              path: request.url(),
              routes: this.routes,
            });
            return r.handler({
              req: request,
              route,
            });
          }
        }

        return route.continue();
      }
    );
  }
}
