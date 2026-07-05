enum RestrictionsEnum {
  RequiresAuth = 'RequiresAuth',
}

interface RouteConfig {
  pathname: string;
  search?: string;
  hash?: string;
  meta?: { restrictions: Array<RestrictionsEnum> };
}

export default {
  navigateToEvents: (): RouteConfig => ({ pathname: '/events' }),
  navigateToActions: (): RouteConfig => ({ pathname: '/recurring-actions' }),
} as const;
