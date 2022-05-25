import { browser } from '$app/env'
import { goto } from '$app/navigation'
import type {
	TransitionElements,
	Frame,
	FrameElement,
	FrameElementType,
	TransitionElement,
	FadedElement
} from '.'

export class TransitionEngine {
	/**
	 * The name of the attribute that will receive the IDs.
	 * @default 'sn-transition'
	 */
	public static transitionAttributeName = 'sn-transition'
	/**
	 * The length of transitioning the elements **in milliseconds**.
	 * @default 300
	 */
	public static transitionDuration = 300
	/**
	 * The length of fading out the current page and fading in the next page **in milliseconds**.
	 * @default 200
	 */
	public static fadeDuration = 200
	/**
	 * The maximum time to wait to load the next page **in milliseconds**.
	 * @default 3000
	 */
	public static loadTimeout = 3000
	private static _sourceFrame: Frame<'div'>
	private static _destinationFrame: Frame<'iframe'>
	private static _isDestinationLoaded = false
	private static _transitionElements: TransitionElements = {}

	static beforeNavigate = async (nav: { from: URL; to: URL; cancel: () => void }) => {
		if (
			!nav?.to ||
			nav.from.href === nav.to.href ||
			nav.from.origin !== nav.to.origin ||
			!browser ||
			this._isDestinationLoaded
		)
			return
		if (!this._isDestinationLoaded) nav.cancel()

		this._createDestinationFrame()
		const destinationLoaded = new Promise((resolve, reject) => {
			let timeout: NodeJS.Timeout
			if(this.loadTimeout) {
				timeout = setTimeout(() => {
					this._sourceFrame?.remove()
					this._destinationFrame?.remove()
					reject()
				}, this.loadTimeout)
			}
			this._destinationFrame.element.onload = () => {
				clearTimeout(timeout)
				this._isDestinationLoaded = true
				resolve('destination loaded')
			}
		})
		this._destinationFrame.element.src = nav.to.href
		try {
			await destinationLoaded
		} catch (error) { undefined }

		this._setTransitionElements()
		if (!Object.keys(this._transitionElements).length) {
			this._navigate(nav.to.href)
			return
		}

		const fadedElements = await this._applyTransitions()
		this._navigate(nav.to.href, fadedElements)
	}

	static afterNavigate = () => {
		this._transitionElements = {}
		this._destinationFrame?.remove()
		this._isDestinationLoaded = false
	}

	private static _navigate = (href: string, fadedElements?: FadedElement[]) => {
		goto(href).then(() => {
			this._sourceFrame?.remove()
			this._destinationFrame?.remove()
			if (!fadedElements) return

			fadedElements.forEach((elem) => {
				elem.element
					.animate([{ opacity: '0' }, { opacity: elem.opacity }], {
						duration: 0,
						fill: 'forwards'
					})
					.persist()
			})
		})
	}

	private static _setTransitionElementsPart = (
		elements: NodeListOf<Element>,
		part: 'from' | 'to'
	) => {
		elements.forEach((element) => {
			const transitionId = element.attributes.getNamedItem(this.transitionAttributeName)?.value
			if (!transitionId) {
				console.warn(
					`No ID value was found on element tagged by '${this.transitionAttributeName}' attribute.`
				)
				return
			}

			if (!this._transitionElements[transitionId]) {
				this._transitionElements[transitionId] = {}
			} else if (this._transitionElements[transitionId][part]) {
				console.warn(`ID (${transitionId}) is already set. Keeping the original element.`)
				return
			}

			this._transitionElements[transitionId][part] = element
		})
	}

	private static _createFrame = <T extends FrameElement>(tagName: T, id: string): Frame<T> => {
		const element = document.createElement(tagName)
		const remove = () => {
			document.getElementById(id)?.remove()
		}

		element.style.position = 'fixed'
		element.style.inset = '0'
		element.style.width = '100%'
		element.style.height = '100%'
		element.style.userSelect = 'none'
		element.style.overflow = 'hidden'
		element.setAttribute('id', id)

		return { element: element as FrameElementType<T>, remove }
	}

	private static _createSourceFrame = () => {
		const frame = this._createFrame('div', 'transition-source-frame')
		frame.element.style.zIndex = '9999'
		document.body.prepend(frame.element)
		this._sourceFrame = frame

		return frame
	}

	private static _createDestinationFrame = () => {
		const frame = this._createFrame('iframe', 'transition-destination-frame')
		frame.element.style.zIndex = '-9999'
		frame.element.style.opacity = '0'
		frame.element.style.border = '0'
		frame.element.title = 'Transition destination page'
		document.body.append(frame.element)
		this._destinationFrame = frame

		return frame
	}

	private static _cloneElement = (source: HTMLElement) => {
		const clone = source.cloneNode() as HTMLElement
		clone.remove()
		const { top, right, bottom, left } = source.getBoundingClientRect()

		const scrollX = source.ownerDocument.defaultView?.scrollX || 0
		const scrollY = source.ownerDocument.defaultView?.scrollY || 0
		const style = source.ownerDocument.defaultView?.getComputedStyle(source)
		const padding = {
			top: +(style?.paddingTop.slice(0, -2) || 0),
			right: +(style?.paddingRight.slice(0, -2) || 0),
			bottom: +(style?.paddingBottom.slice(0, -2) || 0),
			left: +(style?.paddingLeft.slice(0, -2) || 0)
		}
		const margin = {
			top: +(style?.marginTop.slice(0, -2) || 0),
			right: +(style?.marginRight.slice(0, -2) || 0),
			bottom: +(style?.marginBottom.slice(0, -2) || 0),
			left: +(style?.marginLeft.slice(0, -2) || 0)
		}
		clone.style.position = 'absolute'
		clone.style.top = top + scrollX - padding.top - margin.top + 'px'
		clone.style.right =
			right + scrollY - padding.right - padding.left - margin.right - margin.left + 'px'
		clone.style.bottom =
			bottom + scrollX - padding.top - padding.bottom - margin.top - margin.bottom + 'px'
		clone.style.left = left + scrollY - padding.left - margin.left + 'px'
		clone.style.width = +(style?.width.slice(0, -2) || 0) + 'px'
		clone.style.height = +(style?.height.slice(0, -2) || 0) + 'px'

		return clone
	}

	private static _prepareSourceElements = () => {
		this._createSourceFrame()
		for (const id in this._transitionElements) {
			const source = this._transitionElements[id]?.from
			if (!source) continue

			const clone = this._cloneElement(source as HTMLElement)
			this._sourceFrame.element.append(clone)
			try {
				;(<HTMLElement>source).style.opacity = '0'
			} catch (err) {
				undefined
			}
			this._transitionElements[id].from = clone
		}
	}

	private static _setTransitionElements = () => {
		const sourceElements = document.body.querySelectorAll(`[${this.transitionAttributeName}]`)
		if (!sourceElements.length) return
		const destinationElements =
			this._destinationFrame.element.contentWindow?.document?.body.querySelectorAll(
				`[${this.transitionAttributeName}]`
			)
		if (!destinationElements?.length) {
			this._destinationFrame?.remove()
			return
		}

		this._setTransitionElementsPart(sourceElements, 'from')
		this._setTransitionElementsPart(destinationElements, 'to')

		// removing elements that only have one part of the transition
		// (either only 'from' or 'to')
		for (const id in this._transitionElements) {
			const element = this._transitionElements[id]
			if (!element.from || !element.to) {
				delete this._transitionElements[id]
			}
		}

		this._prepareSourceElements()
	}

	private static _applyTransitions = async () => {
		const faded = this._fadeOutSource()
		const finished: boolean[] = []
		for (const id in this._transitionElements) {
			const keyframes = this._getElementKeyframes(this._transitionElements[id])
			if (!keyframes) continue
			const options: KeyframeEffectOptions = {
				duration: this.transitionDuration,
				fill: 'forwards',
				easing: 'ease-out'
			}
			const animation = this._transitionElements[id].from?.animate(keyframes, options)
			if (!animation) continue

			animation.onfinish = async () => {
				finished.push(true)
				if (finished.length === Object.keys(this._transitionElements).length) {
					await this._fadeInDestination()
				}
			}
		}
		await new Promise((resolve) => {
			setTimeout(resolve, this.transitionDuration + this.fadeDuration)
		})
		return faded
	}

	private static _getElementKeyframes = (transitionElement: TransitionElement) => {
		const { from, to } = transitionElement
		const rectFrom = from?.getBoundingClientRect()
		const rectTo = to?.getBoundingClientRect()
		if (!rectFrom || !rectTo) return

		const keyframes = [
			{
				'transform-origin': 'center',
				padding: '0',
				top: rectFrom.top + 'px',
				right: rectFrom.right + 'px',
				bottom: rectFrom.bottom + 'px',
				left: rectFrom.left + 'px',
				width: rectFrom.width + 'px',
				height: rectFrom.height + 'px'
			},
			{
				padding: '0',
				top: rectTo.top + 'px',
				right: rectTo.right + 'px',
				bottom: rectTo.bottom + 'px',
				left: rectTo.left + 'px',
				width: rectTo.width + 'px',
				height: rectTo.height + 'px'
			}
		]

		return keyframes
	}

	private static _fadeOutSource = () => {
		const elementOpacities: FadedElement[] = []

		for (let i = 0; i < document.body.children.length; i++) {
			const element = document.body.children.item(i) as HTMLElement
			if (
				!element?.style ||
				element.id === 'transition-source-frame' ||
				element.id === 'transition-destination-frame'
			)
				continue

			elementOpacities.push({
				element,
				opacity: window.getComputedStyle(element).opacity
			})
			element
				.animate([{ opacity: element.style.opacity }, { opacity: '0' }], {
					duration:
						this.fadeDuration > this.transitionDuration
							? this.transitionDuration
							: this.fadeDuration,
					fill: 'forwards'
				})
				.commitStyles()
		}
		return elementOpacities
	}

	private static _fadeInDestination = async () => {
		this._destinationFrame.element
			.animate(
				[
					{ opacity: '0', zIndex: '9999' },
					{ opacity: '1', zIndex: '9999' }
				],
				{ duration: this.fadeDuration, fill: 'forwards' }
			)
			.commitStyles()

		await new Promise((resolve) => {
			setTimeout(resolve, this.fadeDuration)
		})
	}
}
