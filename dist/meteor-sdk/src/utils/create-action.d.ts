/// <reference types="node" />
import type { Action } from "@near-wallet-selector/core";
export declare const parseArgs: (data: Object | string) => Object | Buffer;
export declare const createAction: (action: Action) => import("@near-js/transactions").Action;
