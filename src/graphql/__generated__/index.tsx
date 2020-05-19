import { GraphQLResolveInfo } from 'graphql';
import { PantryContext } from '../pantry.graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  pantry: Array<PantryItem>;
};

export type PantryItem = {
  __typename?: 'PantryItem';
  id: Scalars['ID'];
  name: Scalars['String'];
  icon_url: Scalars['String'];
  is_deleted: Scalars['Boolean'];
  expires_in: Scalars['String'];
  created_at_ts: Scalars['Float'];
  quantity_type: QuantityType;
  quantities: Array<Quantity>;
};

export type Quantity = {
  __typename?: 'Quantity';
  added_date_ts: Scalars['Float'];
  last_modified_ts: Scalars['Float'];
  is_deleted: Scalars['Boolean'];
  quantity: Scalars['Int'];
};

export enum QuantityType {
  Range = 'range',
  Unit = 'unit',
}

export type GetPantryQueryVariables = {};

export type GetPantryQueryResult = {
  __typename?: 'Query';
  pantry: Array<{
    __typename?: 'PantryItem';
    id: string;
    name: string;
    icon_url: string;
    is_deleted: boolean;
    expires_in: string;
    created_at_ts: number;
    quantity_type: QuantityType;
    quantities: Array<{
      __typename?: 'Quantity';
      added_date_ts: number;
      last_modified_ts: number;
      is_deleted: boolean;
      quantity: number;
    }>;
  }>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  PantryItem: ResolverTypeWrapper<PantryItem>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Quantity: ResolverTypeWrapper<Quantity>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  QuantityType: QuantityType;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  PantryItem: PantryItem;
  ID: Scalars['ID'];
  Float: Scalars['Float'];
  Quantity: Quantity;
  Int: Scalars['Int'];
  QuantityType: QuantityType;
}>;

export type QueryResolvers<
  ContextType = PantryContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  pantry?: Resolver<
    Array<ResolversTypes['PantryItem']>,
    ParentType,
    ContextType
  >;
}>;

export type PantryItemResolvers<
  ContextType = PantryContext,
  ParentType extends ResolversParentTypes['PantryItem'] = ResolversParentTypes['PantryItem']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expires_in?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at_ts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity_type?: Resolver<
    ResolversTypes['QuantityType'],
    ParentType,
    ContextType
  >;
  quantities?: Resolver<
    Array<ResolversTypes['Quantity']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QuantityResolvers<
  ContextType = PantryContext,
  ParentType extends ResolversParentTypes['Quantity'] = ResolversParentTypes['Quantity']
> = ResolversObject<{
  added_date_ts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  last_modified_ts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  is_deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = PantryContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  PantryItem?: PantryItemResolvers<ContextType>;
  Quantity?: QuantityResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = PantryContext> = Resolvers<ContextType>;
