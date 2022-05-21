export type TransitionElements = Record<string, TransitionElement>

export type FrameElement = 'div' | 'iframe'

export type FrameElementType<T extends FrameElement> =
  T extends 'div' ? HTMLDivElement : HTMLIFrameElement

export type Frame<T extends FrameElement> = {
  element: FrameElementType<T>,
  remove: () => void
}

export interface TransitionElement {
  from?: Element,
  to?: Element
}