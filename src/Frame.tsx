import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameContextProvider } from './Context';
import { ReactNodeLike } from './types';

export type FrameProps = Omit<React.ComponentProps<'iframe'>, 'ref'> & {
	head?: ReactNodeLike;
	html?: string;
	mountTarget?: string;
}

export const Frame = React.forwardRef<HTMLIFrameElement, FrameProps>(({
	html = `<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>`,
	mountTarget,
	head,
	children,
	...props
}, ref) => {
	const isMountedRef = useRef(false);
	const nodeRef = useRef<HTMLIFrameElement>(null!);

	const refHandler = (node: HTMLIFrameElement) => {
		nodeRef.current = node;

		if (typeof ref === 'function') {
			ref(node);
		} else if (ref) {
			ref.current = node;
		}
	}

	const [forceCount, setForceCount] = useState(0);
	const forceUpdate = () => setForceCount(forceCount + 1);

	const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);

	const renderFrameContents = () => {
		if (!isMountedRef.current) return null;

		const doc = getDoc();
		if (!doc) return null;

		const win = doc.defaultView || undefined;

		const target = mountTarget ? doc.querySelector(mountTarget) : doc.body.children[0];
		if (!target) return null;

		return [
			createPortal(head, doc.head),
			createPortal(
				<FrameContextProvider value={{ document: doc, window: win }}>
					<div className="frame-content">{children}</div>
				</FrameContextProvider>,
				target,
			),
		];
	}

	const getDoc = () => nodeRef.current ? nodeRef.current.contentDocument : null;

	const loadHandler = () => setIsIFrameLoaded(true);

	useEffect(() => {
		isMountedRef.current = true;

		const doc = getDoc();
		if (doc && doc.readyState === 'complete') {
			forceUpdate();
		} else {
			nodeRef.current.addEventListener('load', loadHandler);
		}

		return () => {
			isMountedRef.current = false;

			nodeRef.current.removeEventListener('load', loadHandler);
		}
	}, []);

	return <iframe {...props} srcDoc={html} ref={refHandler} onLoad={loadHandler}>
		{isIFrameLoaded && renderFrameContents()}
	</iframe>;
});
