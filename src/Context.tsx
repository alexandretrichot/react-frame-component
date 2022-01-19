import React from 'react';

let doc: typeof document | undefined;
let win: typeof window | undefined;

if (typeof document !== 'undefined') doc = document;
if (typeof window !== 'undefined') win = window;

export const FrameContext = React.createContext({ document: doc, window: win });

export const useFrame = () => React.useContext(FrameContext);

export const FrameContextProvider = FrameContext.Provider;
export const FrameContextConsumer = FrameContext.Consumer;
