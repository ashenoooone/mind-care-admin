import { test as base } from '@playwright/test';

export type Test = typeof base;
type Extend = Test['extend'];

export type Fixture = FuncFirstParameter<Extend>;
