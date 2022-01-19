export type ReactComponentLike =
	| string
	| ((props: any, context?: any) => any)
	| (new (props: any, context?: any) => any);

export interface ReactElementLike {
	type: ReactComponentLike;
	props: any;
	key: string | number | null;
}

export interface ReactNodeArray extends Array<ReactNodeLike> { }

export type ReactNodeLike =
	| {}
	| ReactElementLike
	| ReactNodeArray
	| string
	| number
	| boolean
	| null
	| undefined;