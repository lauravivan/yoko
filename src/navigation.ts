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
  navigateToOccurrences: (): RouteConfig => ({ pathname: '/occurrences' }),
} as const;
