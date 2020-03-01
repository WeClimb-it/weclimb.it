import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { environment } from 'src/environments/environment';
import { I18nService } from './services/i18n.service';

const cache = new InMemoryCache({
  // Why this? B/c in certain cases we need an expanded version of the GraphQL item (i.e. crag with sectors)
  // since the same item might be loaded somewhere else w/o expanded props (i.e. sectors) and thus stored in the cache,
  // this would override the already cached item.
  // In such a case we create an ad-hoc cache key prepending the "deep" label.
  // TODO: Move the cache-key policies in a separated file
  dataIdFromObject: (object: any) => {
    switch (object.__typename) {
      case 'Crag':
        if (object.sectors) {
          return `deep-${object._id}`;
        } else {
          return object._id;
        }
      default:
        return object._id;
    }
  },
});

const userLangMiddleware = new ApolloLink((operation, forward) => {
  if (typeof forward === 'undefined') {
    throw new Error('forward is undefined');
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-lang': I18nService.userLang,
    },
  }));

  return forward(operation);
});

export function createApollo(httpLink: HttpLink) {
  return {
    cache,
    ssrMode: true,
    link: ApolloLink.from([userLangMiddleware, httpLink.create({ uri: environment.graphql.url })]),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
